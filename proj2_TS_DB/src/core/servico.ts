import { RepositorioCompromisso } from "../infra/repositorio";

export class ServicoAgendamento {
    
    constructor(private repo: RepositorioCompromisso) {}

    async agendar(inicioISO: string, fimISO: string, descricao: string) {
        if (inicioISO >= fimISO) {
            throw new Error("Erro: A data de fim deve ser depois da data de início.");
        }

        // Pergunta ao repositório se já tem alguém nesse horário
        const temConflito = await this.repo.verificarConflito(inicioISO, fimISO);
        
        if (temConflito) {
            throw new Error("Erro: Horário indisponível! Já existe um compromisso nesse período.");
        }

        // Se passou por todas as regras, salva
        await this.repo.salvar({
            data_inicio: inicioISO,
            data_fim: fimISO,
            descricao: descricao
        });
        
        console.log("Sucesso: Compromisso agendado!");
    }

    // Apenas repassa o pedido de listar para o repositório
    async listarTodos() {
        return await this.repo.listar();
    }

    async cancelarCompromisso(id: number) {       
        await this.repo.remover(id);
        console.log(`Compromisso ${id} removido com sucesso.`);
    }
}