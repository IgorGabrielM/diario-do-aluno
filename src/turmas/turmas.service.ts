import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Injectable()
export class TurmasService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, escolaId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('turmas')
      .select('*, professoras(id, nome, telefone, email)')
      .eq('user_id', userId)
      .eq('escola_id', escolaId)
      .order('nome');

    if (error) throw error;
    return data;
  }

  async findOne(id: string, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('turmas')
      .select('*, professoras(id, nome, telefone, email)')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw new NotFoundException('Turma não encontrada');
    return data;
  }

  async create(dto: CreateTurmaDto, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('turmas')
      .insert({ ...dto, user_id: userId })
      .select('*, professoras(id, nome, telefone, email)')
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, dto: UpdateTurmaDto, userId: string) {
    await this.findOne(id, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('turmas')
      .update(dto)
      .eq('id', id)
      .eq('user_id', userId)
      .select('*, professoras(id, nome, telefone, email)')
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    const { error } = await this.supabase
      .getClient()
      .from('turmas')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }
}
