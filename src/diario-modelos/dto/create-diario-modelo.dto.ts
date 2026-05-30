import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDiarioModeloItemDto } from './create-diario-modelo-item.dto';

export class CreateDiarioModeloDto {
  @ApiProperty({ example: 'uuid-da-turma' })
  @IsUUID()
  turma_id: string;

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