import { IsArray, IsDateString, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDiarioRespostaDto } from './create-diario-resposta.dto';

export class CreateDiarioDto {
  @IsUUID()
  aluno_id: string;

  @IsUUID()
  modelo_id: string;

  @IsDateString()
  data: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiarioRespostaDto)
  respostas?: CreateDiarioRespostaDto[];
}