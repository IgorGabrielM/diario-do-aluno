import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEscolaDto {
  @ApiPropertyOptional({ example: 'Escola Municipal Exemplo' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ example: '12.345.678/0001-90' })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiPropertyOptional({ example: 'https://exemplo.com/logo.png', description: 'URL da logo da escola' })
  @IsOptional()
  @IsString()
  logo?: string;
}
