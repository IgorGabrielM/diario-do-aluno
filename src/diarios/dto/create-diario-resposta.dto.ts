import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDiarioRespostaDto {
  @IsUUID()
  item_id: string;

  @IsOptional()
  @IsString()
  valor?: string;

  @IsOptional()
  @IsString()
  imagem_url?: string;
}