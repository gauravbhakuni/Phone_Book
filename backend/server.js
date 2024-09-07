const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/addressbook')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const AddressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
});

const Address = mongoose.model('Address', AddressSchema);

// CRUD Routes

// Create
app.post('/api/address', async (req, res) => {
  const address = new Address(req.body);
  await address.save();
  res.status(201).send(address);
});

// Read
app.get('/api/address', async (req, res) => {
  const addresses = await Address.find();
  res.send(addresses);
});

// Update
app.put('/api/address/:id', async (req, res) => {
  const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(address);
});

// Delete
app.delete('/api/address/:id', async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
