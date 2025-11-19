# Design Pattern: Builder (Construtor) em TypeScript

Este projeto implementa o Padrão de Projeto **Builder** (Construtor) utilizando TypeScript. O código demonstra como criar objetos complexos (`Personagem`) de forma limpa, organizada e com alta flexibilidade.

---

##  I. O Padrão Builder na Arquitetura

O Builder é um padrão de criação que tem como principal objetivo **separar a construção de um objeto de sua representação**. Ele resolve o problema de criar objetos com muitos parâmetros opcionais, como a classe `Personagem`.

* **Problema Resolvido:** Evita a necessidade de criar construtores gigantes e confusos (o *Telescoping Constructor*).
* **Implementação:** A classe **`ConstrutorDePersonagemJogo`** atua como o **Builder**, isolando a lógica de montagem. O cliente não precisa saber como os atributos são definidos, apenas chama os métodos encadeados (ex: `.definirClasse().definirArma()`).

---

##  II. Benefícios do Builder

Os seguintes benefícios do Padrão Builder (escritos com minhas palavras) são aplicados a este projeto:

1.  **Melhora a Legibilidade e Clareza:** A construção do objeto é feita por métodos nomeados, como `.definirClasse()`, tornando o código muito mais fácil de ler e entender do que uma lista longa de argumentos em um construtor.
2.  **Maior Flexibilidade (Criação Customizada):** Permite construir objetos passo a passo, aceitando apenas as configurações que são necessárias e deixando o restante com valores padrão.
3.  **Encapsulamento da Construção (SRP):** A lógica complexa de como um `Personagem` é montado (e validado) fica totalmente isolada na classe **`ConstrutorDePersonagemJogo`**, mantendo a classe `Personagem` limpa e focada em suas responsabilidades principais.
4.  **Criação de Presets (Diretor):** A classe `Diretor` utiliza o Builder para criar "receitas" prontas, como o **`Chefão`**, permitindo a reutilização de sequências de construção complexas.

---

##  III. Instalação e Execução

Para configurar e rodar este projeto, siga os seguintes passos:

**1. Pré-requisitos e Dependências**

Certifique-se de que o **Node.js** e o **Git** estão instalados. Instale o TypeScript e o executor `ts-node` globalmente:

```bash
npm install -g typescript ts-node