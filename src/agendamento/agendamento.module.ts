import { Module } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [SupabaseModule, WhatsappModule],
  providers: [AgendamentoService],
})
export class AgendamentoModule {}