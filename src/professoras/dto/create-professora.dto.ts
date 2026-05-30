import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';

export class CreateProfessoraDto {
  @IsUUID()
  escola_id: string;

  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
