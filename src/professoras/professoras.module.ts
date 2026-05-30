import { Module } from '@nestjs/common';
import { ProfessorasController } from './professoras.controller';
import { ProfessorasService } from './professoras.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ProfessorasController],
  providers: [ProfessorasService],
  exports: [ProfessorasService],
})
export class ProfessorasModule {}