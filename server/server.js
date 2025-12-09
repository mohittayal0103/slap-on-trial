
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Initialize App
const app = express();
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Simple Local DB (JSON file)
const DB_FILE = join(__dirname, 'data/db.json');

// Ensure DB exists
if (!fs.existsSync(dirname(DB_FILE))) {
  fs.mkdirSync(dirname(DB_FILE), { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
  const initialData = {
    products: [],
    orders: [],
    master_data: {
      console_types: [], // e.g. "CDJ", "Mixer"
      brands: [], // e.g. "Pioneer", "Denon"
      models: [] // e.g. "CDJ-3000", "DJM-900NXS2"
    },
    admins: [{ username: "admin", password: "password123" }] // Default admin
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

// Helper to read/write DB
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// Serve static files from client build
app.use(express.static(join(__dirname, '../client/dist')));

// Serve upload assets
app.use(express.static(join(__dirname, '../public'))); 

// --- API ROUTES ---

// 1. Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const admin = db.admins.find(a => a.username === username && a.password === password);
  
  if (admin) {
    res.json({ success: true, token: "dummy-token-123" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// 2. Products (CRUD)
app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products);
});

app.post('/api/products', (req, res) => {
  const db = readDB();
  const newProduct = { id: Date.now().toString(), ...req.body, inStock: true };
  db.products.push(newProduct);
  writeDB(db);
  res.json(newProduct);
});

// 3. Master Data
app.get('/api/master-data', (req, res) => {
  const db = readDB();
  res.json(db.master_data);
});

app.post('/api/master-data/update', (req, res) => {
   // Generic endpoint to update master data lists (for admin usage)
   const { type, item } = req.body; // type: 'console_types' | 'brands' | 'models'
   const db = readDB();
   if (db.master_data[type]) {
       db.master_data[type].push(item);
       writeDB(db);
       res.json({ success: true, data: db.master_data[type] });
   } else {
       res.status(400).json({ error: "Invalid type" });
   }
});

// 4. Orders
app.post('/api/orders', (req, res) => {
  const db = readDB();
  const newOrder = { 
    id: Date.now().toString(), 
    ...req.body, 
    status: 'Placed', 
    date: new Date().toISOString(),
    trackingLink: ''
  };
  db.orders.push(newOrder);
  writeDB(db);
  res.json({ success: true, orderId: newOrder.id });
});

app.get('/api/orders', (req, res) => {
  const db = readDB();
  // In a real app, verify admin token here
  res.json(db.orders);
});

app.post('/api/orders/update-status', (req, res) => {
  const { orderId, status, trackingLink } = req.body;
  const db = readDB();
  const orderIndex = db.orders.findIndex(o => o.id === orderId);
  
  if (orderIndex > -1) {
    db.orders[orderIndex].status = status;
    if (trackingLink) db.orders[orderIndex].trackingLink = trackingLink;
    writeDB(db);
    res.json({ success: true, order: db.orders[orderIndex] });
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

// Catch-all route to serve React App for non-API requests
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
