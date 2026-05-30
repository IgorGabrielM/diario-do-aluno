import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateTurmaDto {
  @IsUUID()
  escola_id: string;

  @IsString()
  nome: string;

  @IsOptional()
  @IsUUID()
  professora_id?: string;
}
