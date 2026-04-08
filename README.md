# Aerocode - Sistema de Gestão de Produção de Aeronaves

Sistema de linha de comando (CLI) desenvolvido em TypeScript para simular e gerenciar o processo de produção de aeronaves, do cadastro inicial até a entrega ao cliente. O projeto usa persistência em arquivos JSON e segue boas práticas de Orientação a Objetos.

---

## O que o sistema faz

- **Login com autenticação** — ao iniciar, o sistema pede usuário e senha. Se não houver nenhum funcionário cadastrado, redireciona automaticamente para o cadastro do primeiro usuário
- **Cadastro de aeronaves** — registra código, modelo, tipo (comercial ou militar), capacidade e alcance
- **Cadastro de funcionários** — registra ID, nome, telefone, endereço, usuário, senha e nível de permissão (administrador, engenheiro ou operador)
- **Adição de peças** — vincula peças a uma aeronave específica, com tipo (nacional ou importada), fornecedor e status (em produção, em transporte ou pronta)
- **Etapas de produção** — registra etapas com nome, prazo e status (pendente, em andamento ou concluída), com suporte para associar funcionários a cada etapa
- **Testes** — adiciona testes à aeronave com tipo (elétrico, hidráulico ou aerodinâmico) e resultado (aprovado ou reprovado)
- **Relatório final** — gera um arquivo `.txt` com o certificado completo da aeronave, incluindo dados gerais, peças, etapas e testes
- **Persistência automática** — todos os dados são salvos em `frota.json` e `equipes.json` a cada operação, e recarregados automaticamente na próxima execução

---

## Pré-requisitos

O projeto foi desenvolvido e testado com as seguintes versões. Usar versões diferentes, especialmente do Node.js abaixo da 22, pode causar erros de compatibilidade de módulos (ESM vs CommonJS) ou de funcionalidades do ES2022.

- **Node.js:** v22.13.0 ou superior
- **npm:** v10 ou superior (já vem junto com o Node.js v22)

Para verificar suas versões antes de rodar:

```bash
node -v
npm -v
```

Se precisar gerenciar múltiplas versões do Node, recomenda-se usar o [nvm](https://github.com/nvm-sh/nvm) (Linux/macOS) ou o [nvm-windows](https://github.com/coreybutler/nvm-windows).

---

## Avisos importantes antes de rodar

**Não adicione `"type": "module"` no `package.json`.**
O projeto usa CommonJS. Adicionar essa flag quebra a resolução de módulos e o sistema não vai iniciar.

**Não altere o `tsconfig.json` sem necessidade.**
As configurações de `"module": "CommonJS"` e `"moduleResolution": "node10"` são necessárias para o `ts-node` funcionar corretamente com o Node v22.

**O `ts-node` já está nas dependências.**
Não é necessário instalá-lo globalmente. O `npm install` resolve tudo.

---

## Instalação e execução

**1. Clone o repositório**

```bash
git clone <url-do-repositorio>
cd <nome-da-sua-pasta>
```

**2. Instale as dependências**

```bash
npm install
```

Isso instala o `typescript`, o `ts-node` e os tipos do Node automaticamente.

**3. Execute o sistema**

```bash
npx ts-node src/index.ts
```

---

## Estrutura do projeto

```
aerocode/
├── src/
│   ├── index.ts               # Ponto de entrada — menu, login e fluxo principal
│   └── models/
│       ├── Aeronave.ts        # Classe principal da aeronave
│       ├── Peca.ts            # Classe de peças vinculadas à aeronave
│       ├── Etapa.ts           # Classe de etapas de produção
│       ├── Funcionario.ts     # Classe de funcionários com autenticação
│       ├── Teste.ts           # Classe de testes realizados
│       ├── Relatorio.ts       # Geração e salvamento do relatório em .txt
│       └── Enums.ts           # Todos os enums do sistema
├── frota.json                 # Gerado automaticamente — dados das aeronaves
├── equipes.json               # Gerado automaticamente — dados dos funcionários
├── tsconfig.json
└── package.json
```

---

## Persistência de dados

Na primeira execução, após realizar cadastros, o sistema cria automaticamente dois arquivos na raiz do projeto:

- `frota.json` — armazena aeronaves com suas peças, etapas e testes
- `equipes.json` — armazena os funcionários cadastrados

Esses arquivos são lidos automaticamente toda vez que o sistema é iniciado, garantindo que os dados não se percam entre sessões.

---

## Relatório gerado

Ao escolher a opção 7 no menu e informar o código de uma aeronave, o sistema gera um arquivo de texto na raiz do projeto com o nome:

```
Relatorio_Aeronave_<codigo>.txt
```

O arquivo contém data de emissão, dados completos da aeronave, lista de peças, etapas de produção e resultados dos testes.
