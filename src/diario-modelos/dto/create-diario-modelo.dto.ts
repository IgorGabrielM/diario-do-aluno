import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDiarioModeloItemDto } from './create-diario-modelo-item.dto';

export class CreateDiarioModeloDto {
  @ApiPropertyOptional({ example: 'Diário Padrão' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @ApiPropertyOptional({ type: [CreateDiarioModeloItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiarioModeloItemDto)
  itens?: CreateDiarioModeloItemDto[];
}