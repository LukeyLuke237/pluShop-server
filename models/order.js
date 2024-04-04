import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;