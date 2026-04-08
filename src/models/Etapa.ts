import { StatusEtapa } from "./Enums";
import { Funcionario } from "./Funcionario";

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

    iniciar(){
        if (this.status === StatusEtapa.PENDENTE){
            this.status = StatusEtapa.ANDAMENTO;
            console.log(`A etapa '${this.nome}' foi iniciada.`);
        } else {
            console.log(`A etapa não pode ser iniciada - Status atual: ${this.status}.`);
        }
    }
    
    finalizar(){
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA;
            console.log(`A etapa '${this.nome}' foi concluída.`);
        } else {
            console.log(`A etapa precisa estar em andamento para ser concluída.`);
        }
    }

    associarFuncionario(funcionario: Funcionario) {
        const jaExiste = this.funcionarios.find((f) => f.id === funcionario.id);
        
        if (jaExiste) {
            console.log(`O funcionário ${funcionario.nome} já está nesta etapa!`);
        } else {
            this.funcionarios.push(funcionario);
            console.log(`Funcionário ${funcionario.nome} alocado na etapa '${this.nome}'.`);
        }
    }

    listarFuncionarios() {
        console.log(`\n Equipe da Etapa: ${this.nome}`);
        if (this.funcionarios.length === 0) {
            console.log("Nenhum funcionário alocado ainda.");
        } else {
            this.funcionarios.forEach((f) => console.log(`- ${f.nome} (Cargo: ${f.nivelPermissao})`));
        }
    }
}