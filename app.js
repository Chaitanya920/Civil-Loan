require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const cors = require('cors');

const srvRoutes = require('./routes/serviceRoutes');
const reqRoutes = require('./routes/requestRoutes');
const memRoutes = require('./routes/memberRoutes');

const errHandler = require('./middleware/errorHandler');

const app = express();

app.use(bp.json());
app.use(cors());

app.use(srvRoutes);
app.use(reqRoutes);
app.use(memRoutes);
app.use(errHandler);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
