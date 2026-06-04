import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { DiariosModule } from '../diarios/diarios.module';

@Module({
  imports: [SupabaseModule, DiariosModule],
  controllers: [AlunosController],
  providers: [AlunosService],
  exports: [AlunosService],
})
export class AlunosModule {}