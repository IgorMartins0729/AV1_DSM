import { StatusEtapa } from "./Enums.js";
import { Funcionario } from "./Funcionario.js";

export class Etapa {
    nome: string;
    prazo: string;
    status: StatusEtapa;
    funcionarios: Array<Funcionario> = [];

    constructor(nome: string, prazo: string, status: StatusEtapa){
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
    }
}