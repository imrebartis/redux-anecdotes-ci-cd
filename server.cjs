const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('dist'));

let isHealthy = true;

const DB_FILE = "./db.json";

const readData = () => {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.get("/anecdotes", (req, res) => {
  const data = readData();
  res.json(data.anecdotes);
});

app.post("/anecdotes", (req, res) => {
  const data = readData();
  const newAnecdote = { ...req.body, id: req.body.id || uuidv4() };
  data.anecdotes.push(newAnecdote);
  writeData(data);
  res.status(201).json(newAnecdote);
});

app.put("/anecdotes/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.anecdotes.findIndex((anecdote) => anecdote.id === id);

  if (index !== -1) {
    const updatedAnecdote = { ...data.anecdotes[index], ...req.body, id };
    data.anecdotes[index] = updatedAnecdote;
    writeData(data);
    res.json(updatedAnecdote);
  } else {
    res.status(404).json({ message: "Anecdote not found" });
  }
});

app.get("/anecdotes/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const anecdote = data.anecdotes.find((anecdote) => anecdote.id === id);

  if (anecdote) {
    res.json(anecdote);
  } else {
    res.status(404).json({ message: "Anecdote not found" });
  }
});

app.get('/version', (req, res) => {
  res.send('1.0.4');
})

app.post('/toggle-health', (req, res) => {
  isHealthy = !isHealthy;
  res.json({ status: isHealthy ? 'healthy' : 'unhealthy' });
});

app.get('/health', (req, res) => {
  if (!isHealthy) {
    res.status(500).send('Service unavailable');
    return;
  }
  res.send('ok')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
