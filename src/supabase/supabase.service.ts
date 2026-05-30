import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import ws from 'ws';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;
  private adminClient: SupabaseClient;

  constructor(private config: ConfigService) {
    const url = this.config.getOrThrow('SUPABASE_URL');
    const wsTransport = { realtime: { transport: ws as any } }; // eslint-disable-line @typescript-eslint/no-explicit-any

    this.client = createClient(url, this.config.getOrThrow('SUPABASE_KEY'), wsTransport);

    this.adminClient = createClient(
      url,
      this.config.getOrThrow('SUPABASE_SERVICE_ROLE_KEY'),
      { ...wsTransport, auth: { autoRefreshToken: false, persistSession: false } },
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  getAdminClient(): SupabaseClient {
    return this.adminClient;
  }
}