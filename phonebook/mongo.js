const mongoose = require('mongoose');

// Get arguments from the command line
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!password) {
  console.log('❌ Please provide the password: node mongo.js <password>');
  process.exit(1);
}

// ✅ Use a proper database name (phonebook)
const url = `mongodb+srv://ALI:${password}@cluster0.gvbcx.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

// ✅ Connect to MongoDB with error handling
mongoose
  .connect(url)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ✅ Define Mongoose Schema & Model with validation
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (num) {
        return /^\d{2,3}-\d+$/.test(num);
      },
      message: '❌ Invalid phone number format! Use XX-XXXXXXX or XXX-XXXXXXXX',
    },
  },
});

const Person = mongoose.model('Person', personSchema);

// ✅ If name & number are provided, add a new person
if (name && number) {
  const person = new Person({ name, number });

  person
    .save()
    .then(() => {
      console.log(`✅ Added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('❌ Error adding person:', err.message);
      mongoose.connection.close();
    });
} else {
  // ✅ If only password is provided, list all contacts
  Person.find({})
    .then((persons) => {
      console.log('📞 Phonebook:');
      persons.forEach((person) => console.log(`${person.name} ${person.number}`));
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('❌ Error fetching persons:', err.message);
      mongoose.connection.close();
    });
}
