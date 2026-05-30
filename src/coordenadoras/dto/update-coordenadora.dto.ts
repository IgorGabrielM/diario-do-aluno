import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCoordenadoraDto {
  @ApiPropertyOptional({ example: 'uuid-da-escola' })
  @IsOptional()
  @IsUUID()
  escola_id?: string;

  @ApiPropertyOptional({ example: 'Ana Souza' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ example: '11999999999' })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({ example: 'ana@escola.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
