import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { SupabaseService } from '../supabase/supabase.service';

export type UserRole = 'admin' | 'diretora' | 'professora';

export interface JwtPayload {
  sub: string;
  email?: string;
  app_metadata?: { role?: UserRole };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private supabase: SupabaseService,
  ) {
    const supabaseUrl = config.getOrThrow('SUPABASE_URL');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`,
      }),
      algorithms: ['ES256'],
    });
  }

  async validate(payload: JwtPayload) {
    const role = payload.app_metadata?.role;

    if (role === 'professora') {
      const { data } = await this.supabase
        .getAdminClient()
        .from('professoras')
        .select('user_id, escola_id')
        .eq('auth_user_id', payload.sub)
        .single();

      if (!data) throw new UnauthorizedException('Perfil de professora não encontrado');

      return { id: payload.sub, email: payload.email, role, userId: data.user_id, escolaId: data.escola_id };
    }

    if (role === 'diretora') {
      const { data } = await this.supabase
        .getAdminClient()
        .from('coordenadoras')
        .select('user_id, escola_id')
        .eq('auth_user_id', payload.sub)
        .single();

      if (!data) throw new UnauthorizedException('Perfil de coordenadora não encontrado');

      return { id: payload.sub, email: payload.email, role, userId: data.user_id, escolaId: data.escola_id };
    }

    return { id: payload.sub, email: payload.email, role, userId: payload.sub, escolaId: undefined };
  }
}
