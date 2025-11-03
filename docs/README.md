# SabIA API - Documentação

API para busca e consumo de conteúdos do blog Apprendendo para integração com chatbot educacional.

## 🚀 Endpoints Disponíveis

### 1. Listar Todos os Conteúdos

```
GET /conteudos
```

Retorna todos os posts do blog.

**Resposta:**

```json
[
  {
    "id": 0,
    "titulo": "Como usar React Hooks",
    "link": "https://apprendendo.blog/post-1",
    "resumo": "Aprenda a usar hooks no React...",
    "data": "2024-01-15",
    "conteudo": "<html>...</html>",
    "categorias": ["React", "JavaScript"],
    "autor": "Autor"
  }
]
```

---

### 2. Buscar Conteúdo por ID

```
GET /conteudos/:id
```

Retorna um post específico.

**Exemplo:**

```
GET /conteudos/5
```

---

### 3. Buscar por Palavra-chave

```
GET /buscar?q=termo
```

Busca posts que contenham o termo no título, resumo ou conteúdo.

**Exemplo:**

```
GET /buscar?q=javascript
```

**Resposta:**

```json
{
  "query": "javascript",
  "total": 5,
  "resultados": [...]
}
```

---

### 4. Buscar com Relevância (Recomendado para Chatbot)

```
GET /buscar-relevante?q=termo
```

Busca posts e os ordena por relevância. Ideal para chatbots!

**Como funciona:**

- Título: peso 10
- Resumo: peso 5
- Conteúdo: peso 1

**Exemplo:**

```
GET /buscar-relevante?q=react hooks useState
```

**Resposta:**

```json
{
  "query": "react hooks useState",
  "total": 3,
  "resultados": [
    {
      "id": 1,
      "titulo": "React Hooks - useState",
      "relevancia": 25,
      ...
    }
  ]
}
```

---

### 5. Listar Categorias

```
GET /categorias
```

Lista todas as categorias disponíveis.

**Resposta:**

```json
{
  "total": 15,
  "categorias": ["React", "JavaScript", "Node.js", ...]
}
```

---

### 6. Buscar por Categoria

```
GET /categorias/:categoria
```

Retorna posts de uma categoria específica.

**Exemplo:**

```
GET /categorias/React
```

---

### 7. Estatísticas

```
GET /estatisticas
```

Retorna informações gerais sobre o blog.

**Resposta:**

```json
{
  "total_posts": 50,
  "total_categorias": 15,
  "post_mais_recente": "2024-11-01",
  "post_mais_antigo": "2023-01-15"
}
```

---

## 📦 Deploy no Firebase

### 1. Instalar dependências

```bash
cd sabia-api
npm install
```

### 2. Deploy

```bash
firebase deploy --only functions
```

### 3. URL da API

Após o deploy, você receberá uma URL como:

```
https://us-central1-seu-projeto.cloudfunctions.net/api
```

---

## 🤖 Integração com Chatbot

### Instalação

Copie o arquivo `sabiaService.js` para seu projeto SabIA.

### Uso Básico

```javascript
import SabiaService from './sabiaService';

const sabia = new SabiaService('https://sua-url.cloudfunctions.net/api');

// Processar pergunta do usuário
async function responderUsuario(pergunta) {
  const resultado = await sabia.processarPergunta(pergunta);
  const resposta = sabia.formatarResposta(resultado);
  return resposta;
}

// Exemplo
const resposta = await responderUsuario("Como usar useState no React?");
console.log(resposta);
```

### Fluxo do Chatbot

```
Usuário: "Como usar useState no React?"
    ↓
SabiaService extrai palavras-chave: "useState React"
    ↓
Busca conteúdos relevantes na API
    ↓
Retorna top 3 posts mais relevantes
    ↓
Formata resposta com título, data, resumo e link
    ↓
Exibe no chat
```

---

## 🎯 Exemplos de Perguntas que o Chatbot Pode Responder

- "Me explique sobre React Hooks"
- "Como usar useState?"
- "Quero aprender JavaScript"
- "Tem conteúdo sobre Node.js?"
- "Mostre posts sobre TypeScript"

---

## 🔧 Melhorias Futuras

- [ ] Adicionar suporte a busca por data
- [ ] Implementar cache com Redis
- [ ] Adicionar rate limiting
- [ ] Integrar com IA para respostas mais contextuais
- [ ] Adicionar busca vetorial (embeddings)
- [ ] Sistema de feedback dos usuários

---

## 📝 Notas Importantes

1. **Cache**: A API tem cache de 1 hora para otimizar performance
2. **CORS**: Configurado para aceitar requisições de qualquer origem
3. **RSS Feed**: A API lê do feed do WordPress automaticamente
4. **Limit de Resultados**: Busca relevante retorna no máximo 10 posts

---

## 🐛 Troubleshooting

### Erro 502 - Bad Gateway

Verifique se o feed do blog está acessível:

```bash
curl https://apprendendo.blog/feed
```

### API não encontra conteúdos

Verifique se a URL do feed está correta no `index.js`

### CORS Error

Certifique-se de que o middleware CORS está ativo na API

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub:

- API: <https://github.com/clcmo/sabia-api>
- Chatbot: <https://github.com/clcmo/sabia>

---

## 📄 Licença

MIT