import { Module } from '@nestjs/common';
import { EscolasController } from './escolas.controller';
import { EscolasService } from './escolas.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [EscolasController],
  providers: [EscolasService],
  exports: [EscolasService],
})
export class EscolasModule {}