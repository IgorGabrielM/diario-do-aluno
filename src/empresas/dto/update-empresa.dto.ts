import { IsString, IsOptional } from 'class-validator';

export class UpdateEmpresaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;
}