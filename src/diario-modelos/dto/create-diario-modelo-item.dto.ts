import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum TipoItemDiario {
  TEXTO = 'texto',
  VERDADEIRO_FALSO = 'verdadeiro_falso',
  ESCALA = 'escala',
  IMAGEM = 'imagem',
}

export class CreateDiarioModeloItemDto {
  @IsString()
  titulo: string;

  @IsEnum(TipoItemDiario)
  tipo: TipoItemDiario;

  @IsNumber()
  ordem: number;

  @IsOptional()
  @IsBoolean()
  obrigatorio?: boolean;
}
