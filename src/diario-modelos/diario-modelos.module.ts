import { Module } from '@nestjs/common';
import { DiarioModelosController } from './diario-modelos.controller';
import { DiarioModelosService } from './diario-modelos.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [DiarioModelosController],
  providers: [DiarioModelosService],
  exports: [DiarioModelosService],
})
export class DiarioModelosModule {}