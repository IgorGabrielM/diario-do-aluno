import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDiarioRespostaDto } from './create-diario-resposta.dto';

export class UpdateDiarioDto {
  @ApiPropertyOptional({ type: [CreateDiarioRespostaDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiarioRespostaDto)
  respostas?: CreateDiarioRespostaDto[];
}
