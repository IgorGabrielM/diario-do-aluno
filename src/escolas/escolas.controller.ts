import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { EscolasService } from './escolas.service';
import { CreateEscolaDto } from './dto/create-escola.dto';
import { UpdateEscolaDto } from './dto/update-escola.dto';

@UseGuards(JwtAuthGuard)
@Controller('escolas')
export class EscolasController {
  constructor(private readonly escolasService: EscolasService) {}

  @Get()
  findAll(@CurrentUser() user: CurrentUserData) {
    return this.escolasService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.escolasService.findOne(id, user.id);
  }

  @Post()
  create(@Body() dto: CreateEscolaDto, @CurrentUser() user: CurrentUserData) {
    return this.escolasService.create(dto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEscolaDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    return this.escolasService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: CurrentUserData) {
    return this.escolasService.remove(id, user.id);
  }
}