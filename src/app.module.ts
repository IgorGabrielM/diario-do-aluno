import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    AuthModule,
    EscolasModule,
    WhatsappModule,
    ProfessorasModule,
    CoordenadorasModule,
    TurmasModule,
    AlunosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
