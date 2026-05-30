import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoItemDiario } from './create-diario-modelo-item.dto';

export class UpdateDiarioModeloItemDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsEnum(TipoItemDiario)
  tipo?: TipoItemDiario;

  @IsOptional()
  @IsNumber()
  ordem?: number;

  @IsOptional()
  @IsBoolean()
  obrigatorio?: boolean;
}