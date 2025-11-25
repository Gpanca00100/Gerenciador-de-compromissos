import { Database } from 'sqlite';
import { Compromisso } from '../core/modelo';

export class RepositorioCompromisso {
    // Recebe o banco já conectado
    constructor(private db: Database) {}

    // Salvar no banco
    async salvar(compromisso: Compromisso): Promise<void> {
        const sql = `
            INSERT INTO compromissos (data_inicio, data_fim, descricao)
            VALUES (?, ?, ?)
        `;
        // Os '?' são substituídos pelas variáveis na ordem
        await this.db.run(sql, [compromisso.data_inicio, compromisso.data_fim, compromisso.descricao]);
    }

    // Listar todos
    async listar(): Promise<Compromisso[]> {
        const sql = 'SELECT * FROM compromissos';
        return await this.db.all(sql);
    }

    // Verifica se já tem compromisso no horário
    async verificarConflito(inicio: string, fim: string): Promise<boolean> {
        
        const sql = `
            SELECT * FROM compromissos 
            WHERE data_inicio < ? AND data_fim > ?
        `;
        
        // db.get retorna a primeira linha que achar ou undefined se não achar nada
        const resultado = await this.db.get(sql, [fim, inicio]);
        
        // Se resultado não for undefined, existe conflito (retorna true)
        return resultado !== undefined;
    }
    async remover(id: number): Promise<void> {
        const sql = 'DELETE FROM compromissos WHERE id = ?';
        await this.db.run(sql, [id]);
    }
}