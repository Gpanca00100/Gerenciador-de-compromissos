## Dupla:

* **Gabriel Zadini Dourado Cunha** - RGA: 202426610030
* **Arthur** - RGA:xxxxx 
# Gerenciador de Compromissos (Trabalho 2)

Este projeto é um sistema de agendamento de tarefas e compromissos que impede choques de horário (sobreposição). O sistema foi desenvolvido em **TypeScript** utilizando **SQLite** para persistência de dados, seguindo uma arquitetura em camadas (Core, Infra, Adapters).

## Funcionalidades

- **Listar Compromissos:** Exibe todos os compromissos agendados.
- **Adicionar Compromisso:** Permite agendar novos compromissos (Data, Início, Fim, Descrição).
- **Validação de Conflito:** Regra de negócio que impede agendar dois compromissos no mesmo intervalo de horário.
- **API REST:** Interface para consumo via HTTP.
- **CLI:** Interface via linha de comando.

## Como fazer a instalação?

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1. Clone o repositório:
```bash
git clone https://github.com/Gpanca00100/Gerenciador-de-compromissos.git 
cd Gerenciador-de-compromissos