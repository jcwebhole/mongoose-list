const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/stuff');
const { connection: db } = mongoose; 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to stuff database')
});


const stuffSchema = new Schema({
  name: String,
  created_at: { type: Date, default: Date.now }
});

const Stuff = mongoose.model('Stuff', stuffSchema);
module.exports = Stuff;



