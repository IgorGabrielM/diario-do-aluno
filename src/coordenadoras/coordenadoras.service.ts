import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCoordenadoraDto } from './dto/create-coordenadora.dto';
import { UpdateCoordenadoraDto } from './dto/update-coordenadora.dto';

@Injectable()
export class CoordenadorasService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, escolaId?: string, isAdmin = false) {
    let query = this.supabase
      .getClient()
      .from('coordenadoras')
      .select('*, escolas(id, nome)')
      .order('nome');

    if (!isAdmin) query = query.eq('user_id', userId);

    if (escolaId) {
      query = query.eq('escola_id', escolaId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async findOne(id: string, userId: string, isAdmin = false) {
    let query = this.supabase
      .getClient()
      .from('coordenadoras')
      .select('*, escolas(id, nome)')
      .eq('id', id);

    if (!isAdmin) query = query.eq('user_id', userId);

    const { data, error } = await query.single();
    if (error) throw new NotFoundException('Coordenadora não encontrada');
    return data;
  }

  async create(dto: CreateCoordenadoraDto, userId: string) {
    const { cpf, ...dadosCoordenadora } = dto;

    const { data: authUser, error: authError } = await this.supabase
      .getAdminClient()
      .auth.admin.createUser({
        email: dto.email,
        password: cpf,
        email_confirm: true,
        app_metadata: { role: 'diretora' },
        user_metadata: { nome: dto.nome },
      });

    if (authError) {
      if (authError.message.includes('already been registered')) {
        throw new BadRequestException('Já existe um usuário com este e-mail');
      }
      throw new InternalServerErrorException(authError.message);
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('coordenadoras')
      .insert({ ...dadosCoordenadora, cpf, auth_user_id: authUser.user.id, user_id: userId })
      .select('*, escolas(id, nome)')
      .single();

    if (error) {
      await this.supabase.getAdminClient().auth.admin.deleteUser(authUser.user.id);
      throw error;
    }

    return data;
  }

  async update(id: string, dto: UpdateCoordenadoraDto, userId: string, isAdmin = false) {
    await this.findOne(id, userId, isAdmin);

    let query = this.supabase.getClient().from('coordenadoras').update(dto).eq('id', id);
    if (!isAdmin) query = query.eq('user_id', userId);

    const { data, error } = await query.select('*, escolas(id, nome)').single();
    if (error) throw error;
    return data;
  }

  async remove(id: string, userId: string, isAdmin = false) {
    const coordenadora = await this.findOne(id, userId, isAdmin);

    let query = this.supabase.getClient().from('coordenadoras').delete().eq('id', id);
    if (!isAdmin) query = query.eq('user_id', userId);

    const { error } = await query;
    if (error) throw error;

    if (coordenadora.auth_user_id) {
      await this.supabase.getAdminClient().auth.admin.deleteUser(coordenadora.auth_user_id);
    }
  }
}
