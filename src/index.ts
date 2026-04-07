import * as readline from 'readline';
import * as fs from 'fs';

import { Aeronave } from './models/Aeronave';
import { Funcionario } from './models/Funcionario';
import { Peca } from './models/Peca';
import { Etapa } from './models/Etapa'; 
import { Teste } from './models/Teste';

const leitor = readline.createInterface({ input: process.stdin, output: process.stdout });
let frota: Array<Aeronave> = [];
let equipes: Array<Funcionario> = [];
let usuarioLogado: Funcionario | null = null;

function fazerLogin(){
    if (equipes.length === 0) {
        console.log("Nenhum funcionário cadastrado.");
        return cadastrarFuncionario();
    }

    leitor.question("Usuário: ", (usuario_digitado) => {
        leitor.question("Senha: ", (senha_digitada) => {
            
            const funcionarioEncontrado = equipes.find((f) => f.usuario === usuario_digitado && f.senha === senha_digitada);

            if (funcionarioEncontrado) {
                usuarioLogado = funcionarioEncontrado;
                console.log(`\n Acesso Autorizado.`);
                exibirMenu(); 
            } else {
                console.log("\n Usuário ou senha incorretos.");
                fazerLogin();
            }
        });
    });
}

function exibirMenu(){
    console.log("\n-- Aerocode --");
    console.log("1. Cadastrar Aeronave");
    console.log("2. Cadastrar Funcionário");
    console.log("3. Listar Cadastros");
    console.log("4. Adicionar Peça a uma Aeronave");
    console.log("5. Adicionar Etapa de Produção");
    console.log("6. Adicionar Teste a uma Aeronave");
    console.log("7. Sair");

    leitor.question("Escolha uma opção:  ", (opcaoEscolhida) => {
        if (opcaoEscolhida == "1") {
            console.log("\nVocê escolheu cadastrar Aeronave:");
            cadastrarAeronave();
        }
        else if(opcaoEscolhida == "2"){
            console.log("\nVocê escolheu cadastrar Funcionário:");
            cadastrarFuncionario();
        }
        else if(opcaoEscolhida == "3"){
            console.log("\n-As FROTAS cadastradas são:");
            console.log(JSON.stringify(frota, null, 2)); 
            console.log("\n-As EQUIPES cadastradas são:");
            console.log(JSON.stringify(equipes, null, 2));
            console.log("----------------------------------\n");
            console.log("----------------------------------\n");
            exibirMenu();
        }
        else if(opcaoEscolhida == "4"){
            console.log("\nVocê escolheu adicionar uma Peça:");
            adicionarPeca();
        }
        else if(opcaoEscolhida == "5"){
            console.log("\nVocê escolheu adicionar uma Etapa de Produção:");
            adicionarEtapa();
        }
        else if(opcaoEscolhida == "6"){
            console.log("\nVocê escolheu adicionar um Teste:");
            adicionarTeste();
        }
        else if(opcaoEscolhida == "7"){
            console.log("Finalizando..");
            return leitor.close();
        }
        else {
            console.log("Essa opção não existe.");
            return exibirMenu();
        }
    });
}

function cadastrarAeronave(){
    leitor.question("Qual o código? ", (codigo_usuario) => {
        const aviaoExiste = frota.find((aviao) => aviao.codigo === codigo_usuario);

        if (aviaoExiste) {
            console.log("já existe uma aeronave cadastrada.")
            return exibirMenu();
        }

        leitor.question("Qual o modelo? ", (modelo_usuario) => {
            leitor.question("Qual o tipo de Aeronave? ", (tipo_aeronave_usuario) => {
                leitor.question("Qual a capacidade? ", (capacidade_usuario) => {
                    leitor.question("Qual o alcance? ", (alcance_usuario) => {
                        const novaAeronave = new Aeronave(codigo_usuario, modelo_usuario, tipo_aeronave_usuario as any, Number(capacidade_usuario), Number(alcance_usuario));
                        frota.push(novaAeronave);
                        console.log("Aeronave cadastrada com sucesso");
                        salvarDados();
                        exibirMenu();
                    });
                });
            }); 
        });
    });
}

function cadastrarFuncionario(){
    leitor.question("Qual o ID? ", (id_usuario) => {
        leitor.question("Qual nome? ", (nome_usuario) => {
            leitor.question("Qual o telefone? ", (telefone_usuario) => {
                leitor.question("Qual o endereço? ", (endereco_usuario) => {
                    leitor.question("Qual o usuário? ", (usuario_digitado) => {
                        leitor.question("Qual a senha? ", (senha_usuario) => {
                            leitor.question("Qual o nivel de Permissão? ", (permissao_usuario) => {
                                const novoFuncionario = new Funcionario(id_usuario, nome_usuario, telefone_usuario, endereco_usuario, usuario_digitado, senha_usuario, permissao_usuario as any);
                                console.log("Novo funcionário cadastrado com sucesso!");
                                equipes.push(novoFuncionario);
                                salvarDados();
                                exibirMenu();
                            });
                        });
                    });
                });
            });
        });
    });
}

function adicionarPeca(){
    leitor.question("Qual o código da aeronave que vai receber a peça? ", (codigo_digitado) => {
        const procurandoCodigo = frota.find((aviao) => aviao.codigo === codigo_digitado);
        
        if (procurandoCodigo) {
            leitor.question("Qual o ID da Peça? ", (id_digitado) =>{
                leitor.question("Qual o tipo da Peça? ", (tipo_peca_digitada) => {
                    leitor.question("Qual o fornecedor da peça? ", (fornecedor_digitado) => {
                        leitor.question("Qual o status da peça? ", (status_peca_digitado) => {
                            const novaPeca = new Peca(id_digitado, tipo_peca_digitada as any, fornecedor_digitado, status_peca_digitado as any);
                            
                            if (!procurandoCodigo.pecas) procurandoCodigo.pecas = [];
                            
                            procurandoCodigo.pecas.push(novaPeca);
                            console.log("Peça adicionada com sucesso");
                            salvarDados();
                            exibirMenu();
                        });
                    });
                });
            });
        }
        else {
            console.log("Avião não encontrado");
            exibirMenu();
        }
    });
}

function adicionarEtapa(){
    leitor.question("Qual o código da aeronave que receberá a etapa de produção? ", (codigo_digitado) => {
        const procurandoCodigo = frota.find((aviao) => aviao.codigo === codigo_digitado);
        
        if (procurandoCodigo) {
            leitor.question("Qual o nome da Etapa? ", (nome_digitado) =>{
                leitor.question("Qual o prazo da Etapa? ", (prazo_digitado) => {
                    leitor.question("Qual o status da Etapa? ", (status_digitado) => {
                        
                        const novaEtapa = new Etapa(nome_digitado, prazo_digitado, status_digitado as any);
                        
                        if (!procurandoCodigo.etapas) procurandoCodigo.etapas = [];
                        
                        procurandoCodigo.etapas.push(novaEtapa);
                        console.log("Etapa de produção adicionada com sucesso");
                        salvarDados();
                        exibirMenu();
                    });
                });
            });
        }
        else {
            console.log("Avião não encontrado");
            exibirMenu();
        }
    });
}

function adicionarTeste(){
    leitor.question("Qual o código da aeronave que receberá o teste? ", (codigo_digitado) => {
        const procurandoCodigo = frota.find((aviao) => aviao.codigo === codigo_digitado);
        
        if (procurandoCodigo) {
            leitor.question("Qual o tipo do Teste? ", (tipo_digitado) =>{
                leitor.question("Qual o resultado do Teste? ", (resultado_digitado) => {
                    
                    const novoTeste = new Teste(tipo_digitado as any, resultado_digitado as any);
                    
                    if (!procurandoCodigo.testes) procurandoCodigo.testes = [];
                    
                    procurandoCodigo.testes.push(novoTeste);
                    console.log("Teste adicionado com sucesso");
                    salvarDados();
                    exibirMenu();
                });
            });
        }
        else {
            console.log("Avião não encontrado");
            exibirMenu();
        }
    });
}

function carregarDados(){
    if (fs.existsSync('frota.json')){
        const textoFrota = fs.readFileSync('frota.json','utf-8');
        frota = JSON.parse(textoFrota);
    }
    if (fs.existsSync('equipes.json')){
        const textoEquipes = fs.readFileSync('equipes.json', 'utf-8');
        equipes = JSON.parse(textoEquipes);
    }
}

function salvarDados(){
    const dadosFrota = JSON.stringify(frota, null, 2);
    fs.writeFileSync('frota.json', dadosFrota);
    const dadosEquipes = JSON.stringify(equipes, null, 2);
    fs.writeFileSync('equipes.json', dadosEquipes);
}

// Embraer
carregarDados();
fazerLogin();