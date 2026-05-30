import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TipoItemDiario {
  TEXTO = 'texto',
  VERDADEIRO_FALSO = 'verdadeiro_falso',
  ESCALA = 'escala',
  IMAGEM = 'imagem',
}

export class CreateDiarioModeloItemDto {
  @ApiProperty({ example: 'Como foi o comportamento hoje?' })
  @IsString()
  titulo: string;

  @ApiProperty({ enum: TipoItemDiario, example: TipoItemDiario.TEXTO })
  @IsEnum(TipoItemDiario)
  tipo: TipoItemDiario;

  @ApiProperty({ example: 1 })
  @IsNumber()
  ordem: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  obrigatorio?: boolean;
}