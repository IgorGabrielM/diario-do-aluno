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
import { ProfessorasService } from './professoras.service';
import { CreateProfessoraDto } from './dto/create-professora.dto';
import { UpdateProfessoraDto } from './dto/update-professora.dto';

@UseGuards(JwtAuthGuard)
@Controller('professoras')
export class ProfessorasController {
  constructor(private readonly professorasService: ProfessorasService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('escola_id') escolaId: string,
  ) {
    return this.professorasService.findAll(user.id, escolaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.professorasService.findOne(id, user.id);
  }

  @Post()
  create(
    @Body() dto: CreateProfessoraDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.professorasService.create(dto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProfessoraDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.professorasService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.professorasService.remove(id, user.id);
  }
}