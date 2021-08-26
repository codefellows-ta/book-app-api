const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String, required: true, },
  description: { type: String, require: true },
  status: { type: String, default: 'general' },
  email: {type: String, required: true },
});

schema.post('save', function(next){
  console.log(`added new book ${this}`);
});

const Book = mongoose.model('Book', schema);
module.exports = Book;