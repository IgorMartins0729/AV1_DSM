import { ResultadoTeste, TipoTeste } from "./Enums"

export class Teste {
    tipo: TipoTeste;
    resultado: ResultadoTeste;

    constructor(tipo: TipoTeste, resultado: ResultadoTeste){
        this.tipo = tipo;
        this.resultado = resultado;
    }
}