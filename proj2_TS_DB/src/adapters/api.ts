import express from 'express';
import { conectarBanco } from '../infra/banco';
import { RepositorioCompromisso } from '../infra/repositorio';
import { ServicoAgendamento } from '../core/servico';
import { converterParaDataISO } from '../utilitarios';

const app = express();
// Isso permite que a API entenda dados enviados em formato JSON
app.use(express.json());

async function iniciarServidor() {
    // Configuração (Igual ao CLI: Banco -> Repo -> Serviço)
    const db = await conectarBanco();
    const repositorio = new RepositorioCompromisso(db);
    const servico = new ServicoAgendamento(repositorio);

    // Listar Compromissos 
    app.get('/compromissos', async (req, res) => {
        const lista = await servico.listarTodos();
        res.json(lista); 
    });

    // O usuário envia um JSON com { data, hora_inicio, hora_fim, descricao }
    app.post('/compromissos', async (req, res) => {
        try {
            // Pega os dados que vieram no corpo da requisição
            const { data, hora_inicio, hora_fim, descricao } = req.body;

            // Validação básica se esqueceu algum campo
            if (!data || !hora_inicio || !hora_fim || !descricao) {
                res.status(400).json({ erro: "Faltam campos obrigatórios." });
                return;
            }
            const inicioISO = converterParaDataISO(data, hora_inicio);
            const fimISO = converterParaDataISO(data, hora_fim);
            await servico.agendar(inicioISO, fimISO, descricao);
            res.status(201).json({ mensagem: "Compromisso agendado com sucesso!" });

        } catch (erro: any) {
        
            res.status(400).json({ erro: erro.message });
        }
    });


    app.listen(3000, () => {
        console.log("Servidor API rodando em http://localhost:3000");
    });
}

iniciarServidor();