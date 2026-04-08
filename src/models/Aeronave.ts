import { TipoAeronave } from "./Enums";
import { Etapa } from "./Etapa";
import { Peca } from "./Peca";
import { Teste } from "./Teste";

export class Aeronave {
    codigo: string;
    modelo: string;
    tipo: TipoAeronave;
    capacidade: number;
    alcance: number;
    pecas: Array<Peca> = [];
    etapas: Array<Etapa> = [];
    testes: Array<Teste> = [];

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number){
    this.codigo = codigo; 
    this.modelo = modelo;
    this.tipo = tipo;
    this.capacidade = capacidade; 
    this.alcance = alcance; 
    }    

    detalhes(): void {
        console.log(`Aeronave ${this.modelo} (Código: ${this.codigo}) - Tipo: ${this.tipo} | Capacidade: ${this.capacidade} | Alcance: ${this.alcance}km`);
    }

    salvar(): void { console.log("Persistência gerenciada pelo index.ts"); }
    carregar(): void { console.log("Carregamento gerenciado pelo index.ts"); }
}