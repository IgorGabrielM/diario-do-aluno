import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';

@Injectable()
export class DiariosService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, alunoId?: string, data?: string, isAdmin = false) {
    let query = this.supabase
      .getClient()
      .from('diarios')
      .select('*, alunos(id, nome), diario_modelos(id, nome), diario_respostas(id, item_id, valor, imagem_url)')
      .order('data', { ascending: false });

    if (!isAdmin) query = query.eq('user_id', userId);
    if (alunoId) query = query.eq('aluno_id', alunoId);
    if (data) query = query.eq('data', data);

    const { data: result, error } = await query;
    if (error) throw error;
    return result;
  }

  async findOne(id: string, userId: string, isAdmin = false) {
    let query = this.supabase
      .getClient()
      .from('diarios')
      .select('*, alunos(id, nome), diario_modelos(id, nome, diario_modelo_itens(id, titulo, tipo, ordem, obrigatorio)), diario_respostas(id, item_id, valor, imagem_url)')
      .eq('id', id);

    if (!isAdmin) query = query.eq('user_id', userId);

    const { data, error } = await query.single();

    if (error) throw new NotFoundException('Diário não encontrado');
    return data;
  }

  async create(dto: CreateDiarioDto, userId: string) {
    const { respostas, ...diarioData } = dto;

    const { data: diario, error: diarioError } = await this.supabase
      .getClient()
      .from('diarios')
      .insert({ ...diarioData, user_id: userId })
      .select()
      .single();

    if (diarioError) throw diarioError;

    if (respostas?.length) {
      const { error: respostasError } = await this.supabase
        .getClient()
        .from('diario_respostas')
        .insert(respostas.map((r) => ({ ...r, diario_id: diario.id })));

      if (respostasError) throw respostasError;
    }

    return this.findOne(diario.id, userId);
  }

  async update(id: string, dto: UpdateDiarioDto, userId: string, isAdmin = false) {
    await this.findOne(id, userId, isAdmin);

    if (dto.respostas?.length) {
      const { error } = await this.supabase
        .getClient()
        .from('diario_respostas')
        .upsert(
          dto.respostas.map((r) => ({ ...r, diario_id: id })),
          { onConflict: 'diario_id,item_id' },
        );

      if (error) throw error;
    }

    return this.findOne(id, userId, isAdmin);
  }

  async enviar(id: string, userId: string, isAdmin = false) {
    await this.findOne(id, userId, isAdmin);

    let query = this.supabase
      .getClient()
      .from('diarios')
      .update({ enviado_em: new Date().toISOString() })
      .eq('id', id);

    if (!isAdmin) query = query.eq('user_id', userId);

    const { data, error } = await query.select().single();
    if (error) throw error;
    return data;
  }

  async remove(id: string, userId: string, isAdmin = false) {
    await this.findOne(id, userId, isAdmin);

    let query = this.supabase.getClient().from('diarios').delete().eq('id', id);
    if (!isAdmin) query = query.eq('user_id', userId);

    const { error } = await query;
    if (error) throw error;
  }
}