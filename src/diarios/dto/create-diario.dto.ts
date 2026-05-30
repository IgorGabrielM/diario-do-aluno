import { IsArray, IsDateString, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDiarioRespostaDto } from './create-diario-resposta.dto';

export class CreateDiarioDto {
  @ApiProperty({ example: 'uuid-do-aluno' })
  @IsUUID()
  aluno_id: string;

  @ApiProperty({ example: 'uuid-do-modelo' })
  @IsUUID()
  modelo_id: string;

  @ApiProperty({ example: '2026-05-30' })
  @IsDateString()
  data: string;

  @ApiPropertyOptional({ type: [CreateDiarioRespostaDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiarioRespostaDto)
  respostas?: CreateDiarioRespostaDto[];
}