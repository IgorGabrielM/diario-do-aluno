import { IsString, IsOptional } from 'class-validator';

export class UpdateEscolaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;
}
