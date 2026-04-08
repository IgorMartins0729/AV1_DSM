import { ResultadoTeste, TipoTeste } from "./Enums"

export class Teste {
    tipo: TipoTeste;
    resultado: ResultadoTeste;

    constructor(tipo: TipoTeste, resultado: ResultadoTeste){
        this.tipo = tipo;
        this.resultado = resultado;
    }

    salvar(): void { console.log("Aviso: Persistência gerenciada pelo index.ts"); }
    carregar(): void { console.log("Aviso: Carregamento gerenciado pelo index.ts"); }
}