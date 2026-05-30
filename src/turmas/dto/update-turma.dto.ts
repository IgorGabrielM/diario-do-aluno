import { IsOptional, IsString, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTurmaDto {
  @ApiPropertyOptional({ example: 'Turma B - Tarde' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ example: '14:00', description: 'Horário de envio do diário (HH:MM)' })
  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'horarioEnvio deve estar no formato HH:MM' })
  horarioEnvio?: string;
}