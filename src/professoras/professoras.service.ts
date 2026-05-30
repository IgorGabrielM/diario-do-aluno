import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProfessoraDto } from './dto/create-professora.dto';
import { UpdateProfessoraDto } from './dto/update-professora.dto';

@Injectable()
export class ProfessorasService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, escolaId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('professoras')
      .select('*')
      .eq('user_id', userId)
      .eq('escola_id', escolaId)
      .order('nome');

    if (error) throw error;
    return data;
  }

  async findOne(id: string, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('professoras')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw new NotFoundException('Professora não encontrada');
    return data;
  }

  async create(dto: CreateProfessoraDto, userId: string) {
    const { cpf, ...dadosProfessora } = dto;

    const { data: authUser, error: authError } = await this.supabase
      .getAdminClient()
      .auth.admin.createUser({
        email: dto.email,
        password: cpf,
        email_confirm: true,
        app_metadata: { role: 'professora' },
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
      .from('professoras')
      .insert({ ...dadosProfessora, cpf, auth_user_id: authUser.user.id, user_id: userId })
      .select()
      .single();

    if (error) {
      await this.supabase.getAdminClient().auth.admin.deleteUser(authUser.user.id);
      throw error;
    }

    return data;
  }

  async update(id: string, dto: UpdateProfessoraDto, userId: string) {
    await this.findOne(id, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('professoras')
      .update(dto)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string, userId: string) {
    const professora = await this.findOne(id, userId);

    const { error } = await this.supabase
      .getClient()
      .from('professoras')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    if (professora.auth_user_id) {
      await this.supabase.getAdminClient().auth.admin.deleteUser(professora.auth_user_id);
    }
  }
}
