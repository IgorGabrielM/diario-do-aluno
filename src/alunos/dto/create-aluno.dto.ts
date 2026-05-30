import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateAlunoDto {
  @IsUUID()
  escola_id: string;

  @IsString()
  nome: string;

  @IsUUID()
  turma_id: string;

  @IsString()
  telefone_responsavel1: string;

  @IsOptional()
  @IsString()
  telefone_responsavel2?: string;

  @IsOptional()
  @IsString()
  telefone_responsavel3?: string;

  @IsOptional()
  @IsString()
  telefone_responsavel4?: string;
}