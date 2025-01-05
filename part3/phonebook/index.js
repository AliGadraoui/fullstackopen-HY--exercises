const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const password = 'Casablanca03';
const url = `mongodb+srv://ALI:${password}@cluster0.gvbcx.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (num) {
        return /^\d{2,3}-\d+$/.test(num);
      },
      message: 'Invalid phone number format',
    },
  },
});

const Person = mongoose.model('Person', personSchema);

// Get all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

// Get a single person by ID
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((err) => next(err));
});

// Add a new person
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const person = new Person({ name, number });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err));
});

// Delete a person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) res.status(204).end();
      else res.status(404).json({ error: 'Person not found' });
    })
    .catch((err) => next(err));
});

// Update a person's number
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err));
});

// Info page
app.get('/info', async (req, res) => {
  const count = await Person.countDocuments({});
  res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
});

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
