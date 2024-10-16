const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Хранилище для контактов
let contacts = []; // Массив для хранения контактов

// Импортируйте маршруты
const contactRoutes = require('./routes/contacts')(contacts); // Передаем массив в маршруты

// Используйте маршруты с префиксом /api/contacts
app.use('/api/contacts', contactRoutes);

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Запустите сервер
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
