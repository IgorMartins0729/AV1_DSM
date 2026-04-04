import * as readline from 'readline';
import { Aeronave } from './models/Aeronave.js';
import { Funcionario } from './models/Funcionario.js';
import * as fs from 'fs';

const leitor = readline.createInterface({ input: process.stdin, output: process.stdout });
let frota: Array<Aeronave> = []
let equipes: Array<Funcionario> = []

function exibirMenu(){
    console.log("--Aerocode--");
    console.log("1. Cadastar Aeronave:");
    console.log("2. Cadastrar Funcionário:");
    console.log("3. Sair");

    leitor.question("Escolha uma opção:  ", (opcaoEscolhida) => {
            if (opcaoEscolhida == "1") {
                console.log("Você escolheu cadastrar nave:")
                cadastrarAeronave();
            }
            else if(opcaoEscolhida == "2"){
                console.log("Você escolheu cadastrar Funcionário:")
                cadastrarFuncionario();
            }
            else if(opcaoEscolhida == "3"){
                return leitor.close()
            }
            else {
                return exibirMenu();
            }
});
  
}

function cadastrarAeronave(){
    leitor.question("Qual o código?", (codigo_usuario) => {
        leitor.question("Qual o modelo?", (modelo_usuario) => {
            leitor.question("Qual o tipo de Aeronave?", (tipo_aeronave_usuario) => {
                leitor.question("Qual a capacidade?", (capacidade_usuario) => {
                    leitor.question("Qual o alcance?", (alcance_usuario) => {
                        const novaAeronave = new Aeronave(codigo_usuario, modelo_usuario, tipo_aeronave_usuario as any, Number(capacidade_usuario), Number(alcance_usuario));
                        frota.push(novaAeronave)
                        console.log("Aeronave foi cadastrada com sucesso");
                        salvarDados();
                        exibirMenu();
                    })
                })
            }) 
        })
    })
}

function cadastrarFuncionario(){
    leitor.question("Qual o ID?", (id_usuario) => {
        leitor.question("Qual nome?", (nome_usuario) => {
            leitor.question("Qual o telefone", (telefone_usuario) => {
                leitor.question("Qual o endereço?", (endereco_usuario) => {
                    leitor.question("Qual o usuário?", (usuario_digitado) => {
                        leitor.question("Qual a senha?", (senha_usuario) => {
                            leitor.question("Qual a nivel de Permissão?", (permissao_usuario) => {
                                const novoFuncionario = new Funcionario(id_usuario,nome_usuario,telefone_usuario,endereco_usuario,usuario_digitado,senha_usuario,permissao_usuario as any)
                                console.log("Novo funcionário foi cadastrado com sucesso");
                                equipes.push(novoFuncionario);
                                salvarDados();
                                exibirMenu();
                            })
                        })
                    })
                })
            })
        })
    })
}

function carregarDados(){
    if (fs.existsSync('frota.json')){
        
    }
}

function salvarDados(){
    const dadosFrota = JSON.stringify(frota, null, 2)
    fs.writeFileSync('frota.json',dadosFrota);
    const dadosEquipes = JSON.stringify(equipes, null, 2)
    fs.writeFileSync('equipes.json', dadosEquipes);
}



exibirMenu();
