import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { EscolasModule } from './escolas/escolas.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { TurmasModule } from './turmas/turmas.module';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessorasModule } from './professoras/professoras.module';
import { CoordenadorasModule } from './coordenadoras/coordenadoras.module';
import { DiarioModelosModule } from './diario-modelos/diario-modelos.module';
import { DiariosModule } from './diarios/diarios.module';
import { AgendamentoModule } from './agendamento/agendamento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    SupabaseModule,
    AuthModule,
    EscolasModule,
    WhatsappModule,
    ProfessorasModule,
    CoordenadorasModule,
    TurmasModule,
    AlunosModule,
    DiarioModelosModule,
    DiariosModule,
    AgendamentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
