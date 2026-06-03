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
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@ApiTags('Turmas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar turmas da escola' })
  @ApiQuery({ name: 'escola_id', required: false })
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('escola_id') escolaId?: string,
  ) {
    const isAdmin = user.role === 'admin';
    return this.turmasService.findAll(user.userId, user.escolaId ?? escolaId!, isAdmin);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar turma por ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.turmasService.findOne(id, user.userId, user.role === 'admin');
  }

  @Post()
  @ApiOperation({ summary: 'Criar turma' })
  create(@Body() dto: CreateTurmaDto, @CurrentUser() user: CurrentUserData) {
    return this.turmasService.create(dto, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar turma' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTurmaDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.turmasService.update(id, dto, user.userId, user.role === 'admin');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover turma' })
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.turmasService.remove(id, user.userId, user.role === 'admin');
  }

  @Post(':id/professoras/:professoraId')
  @ApiOperation({ summary: 'Vincular professora à turma' })
  addProfessora(
    @Param('id') id: string,
    @Param('professoraId') professoraId: string,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.turmasService.addProfessora(id, professoraId, user.userId, user.role === 'admin');
  }

  @Delete(':id/professoras/:professoraId')
  @ApiOperation({ summary: 'Desvincular professora da turma' })
  removeProfessora(
    @Param('id') id: string,
    @Param('professoraId') professoraId: string,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.turmasService.removeProfessora(id, professoraId, user.userId, user.role === 'admin');
  }
}