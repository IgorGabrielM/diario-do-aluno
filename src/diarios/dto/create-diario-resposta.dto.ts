import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDiarioRespostaDto {
  @ApiProperty({ example: 'uuid-do-item' })
  @IsUUID()
  item_id: string;

  @ApiPropertyOptional({ example: 'O aluno foi participativo hoje.' })
  @IsOptional()
  @IsString()
  valor?: string;

  @ApiPropertyOptional({ example: 'https://exemplo.com/foto.jpg' })
  @IsOptional()
  @IsString()
  imagem_url?: string;
}