import * as fs from 'fs';
import { Aeronave } from './Aeronave';

export class Relatorio {
    
    gerarRelatorioAeronave(aeronave: Aeronave): string {
        let conteudo = `   Produção (Certificado)    \n`;
        conteudo += `Data de Emissão: ${new Date().toLocaleString()}\n\n`;
        
        conteudo += `Dados da aeronvae:\n`;
        conteudo += `Código: ${aeronave.codigo}\n`;
        conteudo += `Modelo: ${aeronave.modelo}\n`;
        conteudo += `Tipo: ${aeronave.tipo}\n`;
        conteudo += `Capacidade: ${aeronave.capacidade} passageiros\n`;
        conteudo += `Alcance: ${aeronave.alcance} km\n\n`;
        
        conteudo += `Peças utilizadas\n`;
        if (aeronave.pecas && aeronave.pecas.length > 0) {
            aeronave.pecas.forEach(p => conteudo += `- Peça Nome: ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}\n`);
        } else { 
            conteudo += `Nenhuma peça registrada.\n`; 
        }

        conteudo += `\nEtapas de produção\n`;
        if (aeronave.etapas && aeronave.etapas.length > 0) {
            aeronave.etapas.forEach(e => conteudo += `- Etapa: ${e.nome} | Status: ${e.status} | Prazo: ${e.prazo}\n`);
        } else { 
            conteudo += `Nenhuma etapa registrada.\n`; 
        }

        conteudo += `\n Testes:\n`;
        if (aeronave.testes && aeronave.testes.length > 0) {
            aeronave.testes.forEach(t => conteudo += `- Tipo: ${t.tipo} | Resultado: ${t.resultado}\n`);
        } else { 
            conteudo += `Nenhum teste registrado.\n`; 
        }

        return conteudo;
    }

    salvarRelatorio(aeronave: Aeronave) {
        const conteudo = this.gerarRelatorioAeronave(aeronave);
        const nomeArquivo = `Relatorio_Aeronave_${aeronave.codigo}.txt`;
        
        fs.writeFileSync(nomeArquivo, conteudo, 'utf-8');
        console.log(`\n Sucesso, Relatório físico gerado e salvo como: ${nomeArquivo}`);
    }
}