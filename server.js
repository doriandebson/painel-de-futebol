const express = require('express');
const cors = require('cors');
const path = require('path'); // 👈 CERTIFIQUE-SE DE TER ESSA LINHA AQUI!
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👈 CORREÇÃO CRUCIAL PARA QUALQUER SERVIDOR WEB (LINUX/RENDER):
app.use(express.static(path.join(__dirname, 'public')));

const HEADERS = { 'X-Auth-Token': process.env.API_KEY };

// ... mantenha o restante das suas rotas (/api/matches, /api/standings, /api/scorers) exatamente como estão embaixo
// 1. Rota para Jogos (Partidas Recentes e Próximas)
app.get('/api/matches', async (req, res) => {
    try {
        const league = req.query.league || 'SA'; // Padrão Serie A da Itália se não informado
        const url = `https://api.football-data.org/v4/competitions/${league}/matches`;
        
        const response = await fetch(url, { headers: HEADERS });
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
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
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});