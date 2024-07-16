// C:\Users\OtmanHSSINOUI\unicoco\server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const workerRoutes = require('./routes/workers');
// Assurez-vous de créer les fichiers correspondants pour ces routes
const productRoutes = require('./routes/products');
const siteRoutes = require('./routes/sites');
const transactionRoutes = require('./routes/transactions');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.use('/workers', workerRoutes);
app.use('/products', productRoutes);
app.use('/sites', siteRoutes);
app.use('/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
