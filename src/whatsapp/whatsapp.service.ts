import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async sendMessage(phone: string, message: string) {
    const instanceId = this.config.getOrThrow('ZAPI_INSTANCE_ID');
    const token = this.config.getOrThrow('ZAPI_TOKEN');
    const clientToken = this.config.getOrThrow('ZAPI_CLIENT_TOKEN');

    const url = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`;

    const { data } = await firstValueFrom(
      this.http.post(
        url,
        { phone, message },
        { headers: { 'Client-Token': clientToken } },
      ),
    );

    return data;
  }
}
