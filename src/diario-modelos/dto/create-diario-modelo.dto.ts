import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDiarioModeloItemDto } from './create-diario-modelo-item.dto';

export class CreateDiarioModeloDto {
  @IsUUID()
  turma_id: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiarioModeloItemDto)
  itens?: CreateDiarioModeloItemDto[];
}
