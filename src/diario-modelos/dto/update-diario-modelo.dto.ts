import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDiarioModeloDto {
  @ApiPropertyOptional({ example: 'Diário Padrão' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}