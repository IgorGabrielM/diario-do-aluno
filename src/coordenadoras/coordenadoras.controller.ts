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
import { CoordenadorasService } from './coordenadoras.service';
import { CreateCoordenadoraDto } from './dto/create-coordenadora.dto';
import { UpdateCoordenadoraDto } from './dto/update-coordenadora.dto';

@UseGuards(JwtAuthGuard)
@Controller('coordenadoras')
export class CoordenadorasController {
  constructor(private readonly coordenadorasService: CoordenadorasService) {}

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserData,
    @Query('escola_id') escolaId?: string,
  ) {
    return this.coordenadorasService.findAll(user.id, escolaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.coordenadorasService.findOne(id, user.id);
  }

  @Post()
  create(
    @Body() dto: CreateCoordenadoraDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.coordenadorasService.create(dto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCoordenadoraDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.coordenadorasService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.coordenadorasService.remove(id, user.id);
  }
}