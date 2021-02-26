const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const requestSchema = new Schema({
   book: {
     type: Object, 
     required: true
   },
   bookId: {
     type: Schema.Types.ObjectId,
     required: true,
     ref: 'Book'
   },
   userId: {
     type: Schema.Types.ObjectId,
     required: true,
     ref: 'User'
   },
   startDate: {
     type: Date,
     required: true
   },
   dueDate: {
     type: Date,
     required: true
   },
   returned: Boolean,
   isPending: {
     type: Boolean,
     required: true
   }
});

module.exports = mongoose.model('Request', requestSchema);