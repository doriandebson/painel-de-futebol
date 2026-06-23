const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do painel (front-end)
app.use(express.static(path.join(__dirname, 'public')));

const HEADERS = { 'X-Auth-Token': process.env.API_KEY };

// 1. Rota para Jogos (Partidas Recentes e Próximas)
app.get('/api/matches', async (req, res) => {
    try {
        const league = req.query.league || 'SA';
        const url = `https://api.football-data.org/v4/competitions/${league}/matches`;
        
        const response = await fetch(url, { headers: HEADERS });
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Erro em /api/matches [${req.query.league}]:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

// 2. Rota para a Tabela de Classificação (Standings)
app.get('/api/standings', async (req, res) => {
    try {
        const league = req.query.league || 'SA';
        const url = `https://api.football-data.org/v4/competitions/${league}/standings`;
        
        const response = await fetch(url, { headers: HEADERS });
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Erro em /api/standings [${req.query.league}]:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

// 3. Rota para Artilharia (Scorers)
app.get('/api/scorers', async (req, res) => {
    try {
        const league = req.query.league || 'SA';
        const url = `https://api.football-data.org/v4/competitions/${league}/scorers`;
        
        const response = await fetch(url, { headers: HEADERS });
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Erro em /api/scorers [${req.query.league}]:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

// 4. Nova rota para buscar fases específicas (Mata-Mata)
app.get('/api/stage', async (req, res) => {
    try {
        const league = req.query.league || 'WC';
        const stage = req.query.stage || 'FINAL';
        const url = `https://api.football-data.org/v4/competitions/${league}/matches?stage=${stage}`;
        
        const response = await fetch(url, { headers: HEADERS });
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Erro em /api/stage [${req.query.league} - ${req.query.stage}]:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

// Inicialização estável do servidor
app.listen(PORT, () => {
    console.log(`[OK] Servidor rodando com sucesso na porta ${PORT}`);
});