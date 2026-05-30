import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, escolaId: string, turmaId?: string) {
    let query = this.supabase
      .getClient()
      .from('alunos')
      .select('*, turmas(id, nome)')
      .eq('user_id', userId)
      .eq('escola_id', escolaId)
      .order('nome');

    if (turmaId) {
      query = query.eq('turma_id', turmaId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async findOne(id: string, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('alunos')
      .select('*, turmas(id, nome)')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw new NotFoundException('Aluno não encontrado');
    return data;
  }

  async create(dto: CreateAlunoDto, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('alunos')
      .insert({ ...dto, user_id: userId })
      .select('*, turmas(id, nome)')
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, dto: UpdateAlunoDto, userId: string) {
    await this.findOne(id, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('alunos')
      .update(dto)
      .eq('id', id)
      .eq('user_id', userId)
      .select('*, turmas(id, nome)')
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    const { error } = await this.supabase
      .getClient()
      .from('alunos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }
}