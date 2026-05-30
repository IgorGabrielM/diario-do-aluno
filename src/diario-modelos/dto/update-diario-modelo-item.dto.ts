import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoItemDiario } from './create-diario-modelo-item.dto';

export class UpdateDiarioModeloItemDto {
  @ApiPropertyOptional({ example: 'Como foi o comportamento hoje?' })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({ enum: TipoItemDiario })
  @IsOptional()
  @IsEnum(TipoItemDiario)
  tipo?: TipoItemDiario;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  ordem?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  obrigatorio?: boolean;
}