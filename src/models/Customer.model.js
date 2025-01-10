const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    s_no: {
      type: Number,
      required: true,
      unique: true
    },
    name_of_customer: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile_number: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'modified_at'
    }
  });
  

  customerSchema.index({ email: 1, mobile_number: 1 });

  customerSchema.index({ name_of_customer: 'text', email: 'text' });
  

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
