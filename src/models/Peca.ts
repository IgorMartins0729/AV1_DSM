import { StatusPeca, TipoPeca } from "./Enums";

export class Peca {
    nome: string;
    tipo: TipoPeca;
    fornecedor: string;
    status: StatusPeca;

    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca){

    this.nome = nome;
    this.tipo = tipo;
    this.fornecedor = fornecedor;
    this.status = status;
    }

    atualizarStatus(novoStatus: any){
        this.status = novoStatus;
        console.log(`Status da peça alterado para: ${this.status}`);
    }

    salvar(): void { console.log("Aviso: Persistência gerenciada pelo index.ts"); }
    carregar(): void { console.log("Aviso: Carregamento gerenciado pelo index.ts"); }
}