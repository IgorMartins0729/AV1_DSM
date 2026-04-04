import { TipoAeronave } from "./Enums.js";
import { Etapa } from "./Etapa.js";
import { Peca } from "./Peca.js";
import { Teste } from "./Teste.js";

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
}