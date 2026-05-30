import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

const TURMA_SELECT =
  '*, turma_professoras(professoras(id, nome, telefone, email))';

@Injectable()
export class TurmasService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, escolaId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('turmas')
      .select(TURMA_SELECT)
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
      .select(TURMA_SELECT)
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw new NotFoundException('Turma não encontrada');
    return data;
  }

  async create(dto: CreateTurmaDto, userId: string) {
    const { professora_ids, ...turmaData } = dto;

    const { data: turma, error } = await this.supabase
      .getClient()
      .from('turmas')
      .insert({ ...turmaData, user_id: userId })
      .select('id')
      .single();

    if (error) throw error;

    if (professora_ids?.length) {
      const vinculos = professora_ids.map((professora_id) => ({
        turma_id: turma.id,
        professora_id,
        user_id: userId,
      }));

      const { error: junctionError } = await this.supabase
        .getClient()
        .from('turma_professoras')
        .insert(vinculos);

      if (junctionError) throw junctionError;
    }

    return this.findOne(turma.id, userId);
  }

  async update(id: string, dto: UpdateTurmaDto, userId: string) {
    await this.findOne(id, userId);

    const { data, error } = await this.supabase
      .getClient()
      .from('turmas')
      .update(dto)
      .eq('id', id)
      .eq('user_id', userId)
      .select(TURMA_SELECT)
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

  async addProfessora(turmaId: string, professoraId: string, userId: string) {
    await this.findOne(turmaId, userId);

    const { error } = await this.supabase
      .getClient()
      .from('turma_professoras')
      .insert({ turma_id: turmaId, professora_id: professoraId, user_id: userId });

    if (error) {
      if (error.code === '23505') throw new ConflictException('Professora já vinculada a esta turma');
      throw error;
    }

    return this.findOne(turmaId, userId);
  }

  async removeProfessora(turmaId: string, professoraId: string, userId: string) {
    await this.findOne(turmaId, userId);

    const { error } = await this.supabase
      .getClient()
      .from('turma_professoras')
      .delete()
      .eq('turma_id', turmaId)
      .eq('professora_id', professoraId)
      .eq('user_id', userId);

    if (error) throw error;

    return this.findOne(turmaId, userId);
  }
}
