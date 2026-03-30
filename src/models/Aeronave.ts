import Enums = require("./Enums");

export class Aeronave {
    codigo: string;
    modelo: string;
    tipo: Enums.TipoAeronave;
    capacidade: number;
    alcance: number;
    peca: Array<Peca> = []

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number){
    this.codigo = codigo 
    this.modelo = modelo 
    this.tipo = tipo
    this.capacidade = capacidade 
    this.alcance = alcance 
    }    
}