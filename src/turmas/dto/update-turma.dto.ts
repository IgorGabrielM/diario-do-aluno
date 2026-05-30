import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTurmaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsUUID()
  professora_id?: string;
}