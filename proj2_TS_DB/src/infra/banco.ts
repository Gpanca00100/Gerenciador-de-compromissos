import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Função para abrir a conexão com o banco
export async function conectarBanco(): Promise<Database> {
    
    // Abre (ou cria) o arquivo 'banco.sqlite' na raiz do projeto
    const db = await open({
        filename: './banco.sqlite',
        driver: sqlite3.Database
    });

    const sqlCriacao = `
        CREATE TABLE IF NOT EXISTS compromissos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data_inicio TEXT NOT NULL,
            data_fim TEXT NOT NULL,
            descricao TEXT NOT NULL
        )
    `;

    await db.exec(sqlCriacao);

    return db;
}