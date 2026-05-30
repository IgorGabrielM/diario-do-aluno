import { Module } from '@nestjs/common';
import { CoordenadorasController } from './coordenadoras.controller';
import { CoordenadorasService } from './coordenadoras.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [CoordenadorasController],
  providers: [CoordenadorasService],
  exports: [CoordenadorasService],
})
export class CoordenadorasModule {}