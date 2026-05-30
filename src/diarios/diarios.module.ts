import { Module } from '@nestjs/common';
import { DiariosController } from './diarios.controller';
import { DiariosService } from './diarios.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [DiariosController],
  providers: [DiariosService],
  exports: [DiariosService],
})
export class DiariosModule {}