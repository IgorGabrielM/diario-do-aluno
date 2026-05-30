import { IsString, IsOptional, IsEmail, IsUUID, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCoordenadoraDto {
  @ApiProperty({ example: 'uuid-da-escola' })
  @IsUUID()
  escola_id: string;

  @ApiProperty({ example: 'Ana Souza' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'ana@escola.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678900', description: 'CPF sem formatação (será a senha padrão)' })
  @IsString()
  @Matches(/^\d{11}$/, { message: 'cpf deve conter exatamente 11 dígitos numéricos' })
  cpf: string;

  @ApiPropertyOptional({ example: '11999999999' })
  @IsOptional()
  @IsString()
  telefone?: string;
}
