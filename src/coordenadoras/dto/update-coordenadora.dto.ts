import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';

export class UpdateCoordenadoraDto {
  @IsOptional()
  @IsUUID()
  escola_id?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}