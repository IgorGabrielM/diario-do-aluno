import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateAlunoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsUUID()
  turma_id?: string;

  @IsOptional()
  @IsString()
  telefone_responsavel1?: string;

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