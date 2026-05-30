import { IsString, IsOptional } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  cnpj?: string;
}