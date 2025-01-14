const mongoose = require('mongoose');

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

module.exports = mongoose.model('Person', personSchema);
