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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@UseGuards(JwtAuthGuard)
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('escola_id') escolaId: string,
    @Query('turma_id') turmaId?: string,
  ) {
    return this.alunosService.findAll(user.id, escolaId, turmaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.alunosService.findOne(id, user.id);
  }

  @Post()
  create(@Body() dto: CreateAlunoDto, @CurrentUser() user: CurrentUserData) {
    return this.alunosService.create(dto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAlunoDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.alunosService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.alunosService.remove(id, user.id);
  }
}