import { NivelPermissao } from "./Enums";

export class Funcionario {
    id: string;
    nome: string;
    telefone: string;
    endereco: string;
    usuario: string;
    senha: string;
    nivelPermissao: NivelPermissao;

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao; 
    }

    autenticar(usuario_digitado: string, senha_digitada: string): boolean {
        if (this.usuario === usuario_digitado && this.senha === senha_digitada) {
            return true;
        } else {
            return false;
        }
    }

    salvar(): void {
        console.log("")
    }

    carregar(): void {
        console.log(".");
    }
}