import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateEscolaDto } from './dto/create-escola.dto';
import { UpdateEscolaDto } from './dto/update-escola.dto';

@Injectable()
export class EscolasService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('escolas')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findOne(id: string, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('escolas')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw new NotFoundException('Escola não encontrada');
    return data;
  }

  async create(dto: CreateEscolaDto, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('escolas')
      .insert({ ...dto, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, dto: UpdateEscolaDto, userId: string) {
    await this.findOne(id, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('escolas')
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
      .from('escolas')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }
}