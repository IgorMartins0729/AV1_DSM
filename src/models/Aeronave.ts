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

    detalhes() {
        console.log(`Aeronave ${this.modelo} (Código: ${this.codigo}) - Capacidade: ${this.capacidade}`);
    }
}