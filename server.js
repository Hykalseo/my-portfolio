const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your-secret-key';
const DATA_FILE = 'data.json';

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve index.html as default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize data file
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    users: [{
      username: 'admin',
      password: bcrypt.hashSync('password', 10)
    }],
    portfolio: []
  }));
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const user = data.users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Portfolio endpoints
app.get('/api/portfolio', authenticateToken, (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data.portfolio);
});

app.post('/api/portfolio', authenticateToken, (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.portfolio.push(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  res.json({ success: true });
});

// Serve admin pages
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', req.params[0]));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});