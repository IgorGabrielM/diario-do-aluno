import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCoordenadoraDto } from './dto/create-coordenadora.dto';
import { UpdateCoordenadoraDto } from './dto/update-coordenadora.dto';

@Injectable()
export class CoordenadorasService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, escolaId?: string) {
    let query = this.supabase
      .getClient()
      .from('coordenadoras')
      .select('*, escolas(id, nome)')
      .eq('user_id', userId)
      .order('nome');

    if (escolaId) {
      query = query.eq('escola_id', escolaId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async findOne(id: string, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('coordenadoras')
      .select('*, escolas(id, nome)')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw new NotFoundException('Coordenadora não encontrada');
    return data;
  }

  async create(dto: CreateCoordenadoraDto, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('coordenadoras')
      .insert({ ...dto, user_id: userId })
      .select('*, escolas(id, nome)')
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, dto: UpdateCoordenadoraDto, userId: string) {
    await this.findOne(id, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('coordenadoras')
      .update(dto)
      .eq('id', id)
      .eq('user_id', userId)
      .select('*, escolas(id, nome)')
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    const { error } = await this.supabase
      .getClient()
      .from('coordenadoras')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }
}