import * as readline from 'readline';
import * as fs from 'fs';

import { Aeronave } from './models/Aeronave';
import { Funcionario } from './models/Funcionario';
import { Peca } from './models/Peca';
import { Etapa } from './models/Etapa'; 
import { Teste } from './models/Teste';
import { Relatorio } from './models/Relatorio';

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
            const funcionarioEncontrado = equipes.find((f) => f.autenticar(usuario_digitado, senha_digitada));

            if (funcionarioEncontrado) {
                usuarioLogado = funcionarioEncontrado;
                console.log(`\nAcesso Autorizado.`);
                exibirMenu(); 
            } else {
                console.log("\nUsuário ou senha incorretos.");
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
    console.log("7. Atualizar Status de uma Peça");
    console.log("8. Gerenciar Etapas de Produção");
    console.log("9. Gerar Relatório Final");
    console.log("10. Sair");

    leitor.question("Escolha uma opção:  ", (opcaoEscolhida) => {
        if (opcaoEscolhida == "1" || opcaoEscolhida == "2") {
            if (usuarioLogado?.nivelPermissao !== "ADMINISTRADOR" as any) {
                console.log("\nAcesso negado. Apenas administradores podem realizar cadastros.");
                return exibirMenu();
            }
            if(opcaoEscolhida == "1") {
                console.log("\nVocê escolheu cadastrar Aeronave:");
                cadastrarAeronave();
            }
            if(opcaoEscolhida == "2") {
                console.log("\nVocê escolheu cadastrar Funcionário:");
                cadastrarFuncionario();
            }
        }
        else if(opcaoEscolhida == "3"){
            console.log("\n-As FROTAS cadastradas são:");
            console.log(JSON.stringify(frota, null, 2)); 
            console.log("\n-As EQUIPES cadastradas são:");
            console.log(JSON.stringify(equipes, null, 2));
            console.log("----------------------------------\n");
            exibirMenu();
        }
        else if(opcaoEscolhida == "4" || opcaoEscolhida == "5" || opcaoEscolhida == "6"){
            if (usuarioLogado?.nivelPermissao === "OPERADOR" as any && opcaoEscolhida !== "4") {
                 console.log("\nAcesso negado. Operadores só possuem permissão para adicionar peças.");
                 return exibirMenu();
            }
            if(opcaoEscolhida == "4"){
                console.log("\nVocê escolheu adicionar uma Peça:");
                adicionarPeca();
            }
            if(opcaoEscolhida == "5"){
                console.log("\nVocê escolheu adicionar uma Etapa de Produção:");
                adicionarEtapa();
            }
            if(opcaoEscolhida == "6"){
                console.log("\nVocê escolheu adicionar um Teste:");
                adicionarTeste();
            }
        }
        else if(opcaoEscolhida == "7"){
            atualizarPeca();
        }
        else if(opcaoEscolhida == "8"){
            if (usuarioLogado?.nivelPermissao === "OPERADOR" as any) {
                console.log("\nAcesso negado. Apenas engenheiros ou administradores gerenciam etapas.");
                return exibirMenu();
            }
            gerenciarEtapa();
        }
        else if(opcaoEscolhida == "9"){
            leitor.question("Qual o código da aeronave para gerar o relatório final? ", (codigo) => {
                const aviao = frota.find((a) => a.codigo === codigo);
                if (aviao) {
                    leitor.question("Qual o nome do cliente que comprou a aeronave? ", (nomeCliente) => {
                        leitor.question("Qual a data prevista para entrega? ", (dataEntrega) => {
                            const relatorio = new Relatorio();
                            relatorio.salvarRelatorio(aviao, nomeCliente, dataEntrega);
                            exibirMenu();
                        });
                    });
                } else {
                    console.log("Avião não encontrado");
                    exibirMenu();
                }
            });
        }
        else if(opcaoEscolhida == "10"){
            console.log("Finalizando.");
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
            console.log("já existe uma aeronave cadastrada com esse código.")
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
                                equipes.push(novoFuncionario);
                                console.log("Novo funcionário cadastrado com sucesso!");
                                salvarDados();
                                if(!usuarioLogado) { fazerLogin(); } else { exibirMenu(); }
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
            leitor.question("Qual o nome da Peça? ", (nome_digitado) =>{
                leitor.question("Qual o tipo da Peça? ", (tipo_peca_digitada) => {
                    leitor.question("Qual o fornecedor da peça? ", (fornecedor_digitado) => {
                        leitor.question("Qual o status da peça? ", (status_peca_digitado) => {
                            const novaPeca = new Peca(nome_digitado, tipo_peca_digitada as any, fornecedor_digitado, status_peca_digitado as any);
                            
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

function atualizarPeca(){
    leitor.question("Código da aeronave para atualizar peça: ", (codigo) => {
        const aviao = frota.find((a) => a.codigo === codigo);
        if (aviao && aviao.pecas && aviao.pecas.length > 0) {
            console.log("Peças Disponíveis:");
            aviao.pecas.forEach((p, i) => console.log(`${i}. ${p.nome} - Status: ${p.status}`));
            leitor.question("Digite o número da peça para atualizar: ", (indiceStr) => {
                const index = Number(indiceStr);
                if(aviao.pecas[index]) {
                    leitor.question("Novo status da peça: ", (novoStatus) => {
                        aviao.pecas[index].atualizarStatus(novoStatus as any);
                        salvarDados();
                        exibirMenu();
                    });
                } else {
                    console.log("Índice de peça não encontrado.");
                    exibirMenu();
                }
            });
        } else {
            console.log("Nenhuma peça encontrada nessa aeronave.");
            exibirMenu();
        }
    });
}

function gerenciarEtapa(){
    leitor.question("Código da aeronave para gerenciar etapa: ", (codigo) => {
        const aviao = frota.find((a) => a.codigo === codigo);
        if (aviao && aviao.etapas && aviao.etapas.length > 0) {
            console.log("Etapas Disponíveis:");
            aviao.etapas.forEach((e, i) => console.log(`${i}. ${e.nome} - Status: ${e.status}`));
            leitor.question("Digite o número da etapa: ", (indiceStr) => {
                const index = Number(indiceStr);
                const etapa = aviao.etapas[index];
                if(etapa) {
                    console.log("\nO que deseja fazer?");
                    console.log("1. Iniciar Etapa");
                    console.log("2. Concluir Etapa");
                    console.log("3. Alocar Funcionário");
                    leitor.question("Escolha a ação: ", (acao) => {
                        if(acao === "1") {
                            etapa.iniciar();
                        } else if (acao === "2") {
                            if(index > 0 && aviao.etapas[index - 1].status !== ("CONCLUIDA" as any)) {
                                console.log(`Erro: Você não pode concluir esta etapa. A etapa anterior '${aviao.etapas[index - 1].nome}' ainda não foi finalizada.`);
                            } else {
                                etapa.finalizar();
                            }
                        } else if (acao === "3") {
                            leitor.question("Qual o ID do funcionário? ", (idFunc) => {
                                const func = equipes.find(f => f.id === idFunc);
                                if(func) {
                                    etapa.associarFuncionario(func);
                                } else {
                                    console.log("Funcionário não encontrado no sistema.");
                                }
                                salvarDados();
                                return exibirMenu();
                            });
                            return; 
                        }
                        salvarDados();
                        exibirMenu();
                    });
                } else {
                    console.log("Etapa não encontrada.");
                    exibirMenu();
                }
            });
        } else {
            console.log("Nenhuma etapa encontrada nessa aeronave.");
            exibirMenu();
        }
    });
}

function carregarDados(){
    if (fs.existsSync('frota.json')){
        const textoFrota = fs.readFileSync('frota.json','utf-8');
        const frotaRaw = JSON.parse(textoFrota);
        frota = frotaRaw.map((a: any) => {
            const aviao = new Aeronave(a.codigo, a.modelo, a.tipo, a.capacidade, a.alcance);
            aviao.pecas = a.pecas ? a.pecas.map((p:any) => new Peca(p.nome, p.tipo, p.fornecedor, p.status)) : [];
            aviao.etapas = a.etapas ? a.etapas.map((e:any) => {
                const etapa = new Etapa(e.nome, e.prazo, e.status);
                etapa.funcionarios = e.funcionarios || [];
                return etapa;
            }) : [];
            aviao.testes = a.testes ? a.testes.map((t:any) => new Teste(t.tipo, t.resultado)) : [];
            return aviao;
        });
    }
    if (fs.existsSync('equipes.json')){
        const textoEquipes = fs.readFileSync('equipes.json', 'utf-8');
        const equipesRaw = JSON.parse(textoEquipes);
        equipes = equipesRaw.map((f:any) => new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao));
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