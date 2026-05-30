import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateDiarioModeloDto } from './dto/create-diario-modelo.dto';
import { UpdateDiarioModeloDto } from './dto/update-diario-modelo.dto';
import { CreateDiarioModeloItemDto } from './dto/create-diario-modelo-item.dto';
import { UpdateDiarioModeloItemDto } from './dto/update-diario-modelo-item.dto';

@Injectable()
export class DiarioModelosService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, turmaId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelos')
      .select('*, diario_modelo_itens(id, titulo, tipo, ordem, obrigatorio)')
      .eq('user_id', userId)
      .eq('turma_id', turmaId)
      .order('nome');

    if (error) throw error;
    return data;
  }

  async findOne(id: string, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelos')
      .select('*, diario_modelo_itens(id, titulo, tipo, ordem, obrigatorio)')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw new NotFoundException('Modelo de diário não encontrado');
    return data;
  }

  async create(dto: CreateDiarioModeloDto, userId: string) {
    const { itens, ...modeloData } = dto;

    const { data: modelo, error: modeloError } = await this.supabase
      .getClient()
      .from('diario_modelos')
      .insert({ ...modeloData, nome: modeloData.nome ?? 'Diário Padrão', user_id: userId })
      .select()
      .single();

    if (modeloError) throw modeloError;

    if (itens?.length) {
      const { error: itensError } = await this.supabase
        .getClient()
        .from('diario_modelo_itens')
        .insert(itens.map((item) => ({ ...item, modelo_id: modelo.id })));

      if (itensError) throw itensError;
    }

    return this.findOne(modelo.id, userId);
  }

  async update(id: string, dto: UpdateDiarioModeloDto, userId: string) {
    await this.findOne(id, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelos')
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
      .from('diario_modelos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }

  async addItem(modeloId: string, dto: CreateDiarioModeloItemDto, userId: string) {
    await this.findOne(modeloId, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelo_itens')
      .insert({ ...dto, modelo_id: modeloId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateItem(modeloId: string, itemId: string, dto: UpdateDiarioModeloItemDto, userId: string) {
    await this.findOne(modeloId, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelo_itens')
      .update(dto)
      .eq('id', itemId)
      .eq('modelo_id', modeloId)
      .select()
      .single();

    if (error) throw new NotFoundException('Item não encontrado');
    return data;
  }

  async removeItem(modeloId: string, itemId: string, userId: string) {
    await this.findOne(modeloId, userId);

    const { error } = await this.supabase
      .getClient()
      .from('diario_modelo_itens')
      .delete()
      .eq('id', itemId)
      .eq('modelo_id', modeloId);

    if (error) throw error;
  }
}
