import { conectarBanco } from '../infra/banco';
import { RepositorioCompromisso } from '../infra/repositorio';
import { ServicoAgendamento } from '../core/servico';
// Importando do arquivo novo em pt
import { converterParaDataISO } from '../utilitarios'; 

async function principal() {
    try {
        const db = await conectarBanco();
        const repositorio = new RepositorioCompromisso(db);
        const servico = new ServicoAgendamento(repositorio);

        const argumentos = process.argv.slice(2);
        const comando = argumentos[0];

        if (comando === 'listar_compromissos') {
            console.log("Buscando compromissos...");
            const lista = await servico.listarTodos();
            console.table(lista);
        } 
        
        else if (comando === 'adicionar_compromisso') {
            const data = argumentos[1];
            const inicio = argumentos[2];
            const fim = argumentos[3];
            const descricao = argumentos[4];

            if (!data || !inicio || !fim || !descricao) {
                console.log("Erro: Faltam informações.");
                console.log("Uso correto: adicionar_compromisso <data> <inicio> <fim> <descricao>");
                return;
            }

            const inicioISO = converterParaDataISO(data, inicio);
            const fimISO = converterParaDataISO(data, fim);

            console.log("Agendando...");
            await servico.agendar(inicioISO, fimISO, descricao);
        }
        else if (comando === 'remover_compromisso') {
            const id = argumentos[1];

            if (!id) {
                console.log("Erro: Informe o ID para remover.");
                console.log("Uso: remover_compromisso <ID>");
                return;
            }

            // O '+' converte o texto para número
            await servico.cancelarCompromisso(+id);
        } 
        
        else {
            console.log("Comando desconhecido.");
            console.log("Comandos disponíveis:");
            console.log("  - listar_compromissos");
            console.log("  - adicionar_compromisso");
            console.log("  - remover_compromisso");
        }

    } catch (erro: any) {
        console.error("Ocorreu um erro:", erro.message);
    }
}

principal();