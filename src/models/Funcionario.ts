import { NivelPermissao } from "./Enums.js";

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
}