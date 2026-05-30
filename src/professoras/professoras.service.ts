import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { data, error } = await this.supabase
      .getClient()
      .from('professoras')
      .insert({ ...dto, user_id: userId })
      .select()
      .single();

    if (error) throw error;
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
    await this.findOne(id, userId);

    const { error } = await this.supabase
      .getClient()
      .from('professoras')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }
}