import { IsString, IsOptional, IsUUID, Matches, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTurmaDto {
  @ApiProperty({ example: 'uuid-da-escola' })
  @IsUUID()
  escola_id: string;

  @ApiProperty({ example: 'Turma A - Manhã' })
  @IsString()
  nome: string;

  @ApiPropertyOptional({ example: ['uuid-professora-1', 'uuid-professora-2'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  professora_ids?: string[];

  @ApiPropertyOptional({ example: '08:00', description: 'Horário de envio do diário (HH:MM)' })
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'horarioEnvio deve estar no formato HH:MM' })
  horarioEnvio?: string;
}