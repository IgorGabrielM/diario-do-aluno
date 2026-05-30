import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDiarioModeloDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}