import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAlunoDto {
  @ApiPropertyOptional({ example: 'João da Silva' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ example: 'uuid-da-turma' })
  @IsOptional()
  @IsUUID()
  turma_id?: string;

  @ApiPropertyOptional({ example: '11999999999' })
  @IsOptional()
  @IsString()
  telefone_responsavel1?: string;

  @ApiPropertyOptional({ example: '11988888888' })
  @IsOptional()
  @IsString()
  telefone_responsavel2?: string;

  @ApiPropertyOptional({ example: '11977777777' })
  @IsOptional()
  @IsString()
  telefone_responsavel3?: string;

  @ApiPropertyOptional({ example: '11966666666' })
  @IsOptional()
  @IsString()
  telefone_responsavel4?: string;
}