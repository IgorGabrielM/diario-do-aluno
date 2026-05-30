import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';

type TipoItem = 'texto' | 'verdadeiro_falso' | 'escala' | 'imagem';

interface ItemResposta {
  valor: string | null;
  imagem_url: string | null;
  diario_modelo_itens: { titulo: string; tipo: TipoItem } | null;
}

interface Aluno {
  id: string;
  nome: string;
  telefone_responsavel1: string;
  telefone_responsavel2: string | null;
  telefone_responsavel3: string | null;
  telefone_responsavel4: string | null;
}

interface Turma {
  id: string;
  nome: string;
  alunos: Aluno[];
}

@Injectable()
export class AgendamentoService {
  private readonly logger = new Logger(AgendamentoService.name);

  constructor(
    private supabase: SupabaseService,
    private whatsapp: WhatsappService,
  ) {}

  async enviarDiariosAgendados() {
    const horarioAtual = new Date().toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const today = new Date().toLocaleDateString('sv-SE', {
      timeZone: 'America/Sao_Paulo',
    });

    const { data: turmas, error } = await this.supabase
      .getClient()
      .from('turmas')
      .select('id, nome, alunos(id, nome, telefone_responsavel1, telefone_responsavel2, telefone_responsavel3, telefone_responsavel4)')
      .eq('horarioEnvio', horarioAtual);

    if (error) {
      this.logger.error('Erro ao buscar turmas para envio', error);
      return;
    }

    if (!turmas?.length) return;

    this.logger.log(`Processando ${turmas.length} turma(s) para envio às ${horarioAtual}`);

    for (const turma of turmas as Turma[]) {
      if (!turma.alunos?.length) continue;

      for (const aluno of turma.alunos) {
        await this.processarEnvioAluno(aluno, today);
      }
    }
  }

  private async processarEnvioAluno(aluno: Aluno, today: string) {
    const { data: diario, error } = await this.supabase
      .getClient()
      .from('diarios')
      .select(`
        id,
        data,
        diario_respostas (
          valor,
          imagem_url,
          diario_modelo_itens!item_id (
            titulo,
            tipo
          )
        )
      `)
      .eq('aluno_id', aluno.id)
      .eq('data', today)
      .is('enviado_em', null)
      .maybeSingle();

    if (error) {
      this.logger.error(`Erro ao buscar diário do aluno ${aluno.nome}`, error);
      return;
    }

    if (!diario) return;

    const mensagem = this.formatarMensagem(aluno.nome, today, diario.diario_respostas as unknown as ItemResposta[]);

    const telefones = [
      aluno.telefone_responsavel1,
      aluno.telefone_responsavel2,
      aluno.telefone_responsavel3,
      aluno.telefone_responsavel4,
    ].filter(Boolean) as string[];

    for (const telefone of telefones) {
      try {
        await this.whatsapp.sendMessage(telefone, mensagem);
      } catch (err) {
        this.logger.error(`Falha ao enviar WhatsApp para ${telefone} (aluno: ${aluno.nome})`, err);
      }
    }

    await this.supabase
      .getClient()
      .from('diarios')
      .update({ enviado_em: new Date().toISOString() })
      .eq('id', diario.id);

    this.logger.log(`Diário de ${aluno.nome} enviado para ${telefones.length} responsável(is)`);
  }

  private formatarMensagem(nomeAluno: string, data: string, respostas: ItemResposta[]): string {
    const dataFormatada = new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const linhas = [`Diário Escolar - ${dataFormatada}`, `Aluno: ${nomeAluno}`, ''];

    for (const resposta of respostas ?? []) {
      const item = resposta.diario_modelo_itens;
      if (!item) continue;

      const valorFormatado = this.formatarValor(item.tipo, resposta.valor, resposta.imagem_url);
      linhas.push(`${item.titulo}: ${valorFormatado}`);
    }

    return linhas.join('\n');
  }

  private formatarValor(tipo: TipoItem, valor: string | null, imagemUrl: string | null): string {
    switch (tipo) {
      case 'verdadeiro_falso':
        return valor === 'true' ? 'Sim' : 'Não';
      case 'escala': {
        const mapa: Record<string, string> = { pouco: 'Pouco', medio: 'Médio', muito: 'Muito' };
        return mapa[valor ?? ''] ?? valor ?? '-';
      }
      case 'imagem':
        return imagemUrl ? `Ver foto: ${imagemUrl}` : '-';
      default:
        return valor ?? '-';
    }
  }
}
