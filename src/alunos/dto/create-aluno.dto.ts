import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlunoDto {
  @ApiProperty({ example: 'uuid-da-escola' })
  @IsUUID()
  escola_id: string;

  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'uuid-da-turma' })
  @IsUUID()
  turma_id: string;

  @ApiProperty({ example: '11999999999' })
  @IsString()
  telefone_responsavel1: string;

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