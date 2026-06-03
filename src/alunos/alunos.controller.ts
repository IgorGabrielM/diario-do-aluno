import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@ApiTags('Alunos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar alunos da escola (filtro opcional por turma)' })
  @ApiQuery({ name: 'escola_id', required: false })
  @ApiQuery({ name: 'turma_id', required: false })
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('escola_id') escolaId?: string,
    @Query('turma_id') turmaId?: string,
  ) {
    const isAdmin = user.role === 'admin';
    return this.alunosService.findAll(user.userId, user.escolaId ?? escolaId!, turmaId, isAdmin);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar aluno por ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.alunosService.findOne(id, user.userId, user.role === 'admin');
  }

  @Post()
  @ApiOperation({ summary: 'Criar aluno' })
  create(@Body() dto: CreateAlunoDto, @CurrentUser() user: CurrentUserData) {
    return this.alunosService.create(dto, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar aluno' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAlunoDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.alunosService.update(id, dto, user.userId, user.role === 'admin');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover aluno' })
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.alunosService.remove(id, user.userId, user.role === 'admin');
  }
}