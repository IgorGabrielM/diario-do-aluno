import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateProfessoraDto {
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