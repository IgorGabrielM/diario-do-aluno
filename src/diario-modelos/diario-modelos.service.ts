import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateDiarioModeloDto } from './dto/create-diario-modelo.dto';
import { UpdateDiarioModeloDto } from './dto/update-diario-modelo.dto';
import { CreateDiarioModeloItemDto } from './dto/create-diario-modelo-item.dto';
import { UpdateDiarioModeloItemDto } from './dto/update-diario-modelo-item.dto';

@Injectable()
export class DiarioModelosService {
  constructor(private supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelos')
      .select('*, diario_modelo_itens(id, titulo, tipo, ordem, obrigatorio)')
      .order('nome');

    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelos')
      .select('*, diario_modelo_itens(id, titulo, tipo, ordem, obrigatorio)')
      .eq('id', id)
      .single();

    if (error) throw new NotFoundException('Modelo de diário não encontrado');
    return data;
  }

  async create(dto: CreateDiarioModeloDto) {
    const { itens, ...modeloData } = dto;

    const { data: modelo, error: modeloError } = await this.supabase
      .getClient()
      .from('diario_modelos')
      .insert({ ...modeloData, nome: modeloData.nome ?? 'Diário Padrão' })
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

    return this.findOne(modelo.id);
  }

  async update(id: string, dto: UpdateDiarioModeloDto) {
    await this.findOne(id);

    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelos')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    await this.findOne(id);

    const { error } = await this.supabase
      .getClient()
      .from('diario_modelos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async addItem(modeloId: string, dto: CreateDiarioModeloItemDto) {
    await this.findOne(modeloId);

    const { data, error } = await this.supabase
      .getClient()
      .from('diario_modelo_itens')
      .insert({ ...dto, modelo_id: modeloId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateItem(modeloId: string, itemId: string, dto: UpdateDiarioModeloItemDto) {
    await this.findOne(modeloId);

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

  async removeItem(modeloId: string, itemId: string) {
    await this.findOne(modeloId);

    const { error } = await this.supabase
      .getClient()
      .from('diario_modelo_itens')
      .delete()
      .eq('id', itemId)
      .eq('modelo_id', modeloId);

    if (error) throw error;
  }
}
