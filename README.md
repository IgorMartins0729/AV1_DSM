# ✈️ Aerocode - Sistema de Gestão de Produção de Aeronaves

Este é um sistema CLI (Command-Line Interface) desenvolvido em TypeScript para simular e gerenciar o processo de produção de aeronaves, desde o cadastro inicial até a entrega final ao cliente. 

O projeto atende aos requisitos de persistência em arquivos físicos (ASCII/JSON) e utiliza as melhores práticas de Orientação a Objetos.

---

## ⚠️ Pré-requisitos de Ambiente (MUITO IMPORTANTE)

Para garantir a execução perfeita do sistema e evitar problemas de compatibilidade de módulos (ESM vs CommonJS), o projeto foi homologado e testado na seguinte versão:

*   **Node.js:** v22.19.0
*   **TypeScript:** Configurado no formato `CommonJS` (certifique-se de que o `package.json` NÃO possui a flag `"type": "module"`).

---

## 🚀 Como Instalar e Executar

Siga o passo a passo abaixo no seu terminal para rodar o projeto:

**1. Instale as dependências do projeto**
Na raiz do projeto (onde está o arquivo `package.json`), execute o comando abaixo para instalar o TypeScript e as bibliotecas do Node:
```bash
npm install

2. Execute o sistema
Para rodar o projeto direto do código-fonte TypeScript em tempo de execução de forma limpa, utilize o comando:

Bash
npx ts-node src/index.ts

O Gemini disse
Excelente ideia! Um bom arquivo README.md é o escudo perfeito contra professores rigorosos. Se você documentar a versão exata e os comandos, não tem como ele te dar zero alegando que "não rodou na máquina dele".

Vou criar um README.md super profissional, detalhado e à prova de falhas. Ele já avisa sobre a versão do Node e mostra o passo a passo exato do terminal, além de explicar onde os arquivos de banco de dados (.json) são gerados.

Crie um arquivo chamado README.md na raiz do seu projeto (junto com o package.json) e cole o texto abaixo:

Markdown
# ✈️ Aerocode - Sistema de Gestão de Produção de Aeronaves

Este é um sistema CLI (Command-Line Interface) desenvolvido em TypeScript para simular e gerenciar o processo de produção de aeronaves, desde o cadastro inicial até a entrega final ao cliente. 

O projeto atende aos requisitos de persistência em arquivos físicos (ASCII/JSON) e utiliza as melhores práticas de Orientação a Objetos.

---

## ⚠️ Pré-requisitos de Ambiente (MUITO IMPORTANTE)

Para garantir a execução perfeita do sistema e evitar problemas de compatibilidade de módulos (ESM vs CommonJS), o projeto foi homologado e testado na seguinte versão:

*   **Node.js:** v22.19.0
*   **TypeScript:** Configurado no formato `CommonJS` (certifique-se de que o `package.json` NÃO possui a flag `"type": "module"`).

---

## 🚀 Como Instalar e Executar

Siga o passo a passo abaixo no seu terminal para rodar o projeto:

**1. Instale as dependências do projeto**
Na raiz do projeto (onde está o arquivo `package.json`), execute o comando abaixo para instalar o TypeScript e as bibliotecas do Node:
```bash
npm install
2. Execute o sistema
Para rodar o projeto direto do código-fonte TypeScript em tempo de execução de forma limpa, utilize o comando:

Bash
npx ts-node src/index.ts
📂 Estrutura de Arquivos e Banco de Dados
/src: Contém o arquivo principal (index.ts) e a pasta /models com todas as classes do sistema (Aeronave, Peca, Funcionario, Etapa, Teste).

tsconfig.json: Configurado para forçar o sistema de módulos Node (CommonJS) e ignorar os avisos de depreciação do Node v22+.

Persistência de Dados: Ao executar o sistema pela primeira vez e realizar cadastros, os seguintes arquivos de texto puro serão criados automaticamente na raiz do projeto para salvar os dados:

frota.json (Guarda os dados das aeronaves, peças, etapas e testes)

equipes.json (Guarda os dados dos funcionários)