import { IsString, IsOptional, IsUUID, Matches } from 'class-validator';

export class CreateTurmaDto {
  @IsUUID()
  escola_id: string;

  @IsString()
  nome: string;

  @IsOptional()
  @IsUUID()
  professora_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'horarioEnvio deve estar no formato HH:MM' })
  horarioEnvio?: string;
}
