import { IsString, IsOptional } from 'class-validator';

export class CreateEscolaDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  cnpj?: string;
}
