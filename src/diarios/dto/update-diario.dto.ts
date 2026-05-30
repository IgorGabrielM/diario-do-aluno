import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDiarioRespostaDto } from './create-diario-resposta.dto';

export class UpdateDiarioDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiarioRespostaDto)
  respostas?: CreateDiarioRespostaDto[];
}