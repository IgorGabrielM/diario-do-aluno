import { Controller, Get } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Get('executar')
  executar() {
    return this.agendamentoService.enviarDiariosAgendados();
  }
}