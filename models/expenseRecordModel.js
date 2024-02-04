import mongoose from "mongoose";

const subExpenseSchema = new mongoose.Schema({
  person: {
          type: mongoose.ObjectId,
          ref: 'Person',
          required: true,
          default: null
        },
  title: { type: String, required: true },
  description: {type: String},
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

const userExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.ObjectId, ref:'user', required: true },
  expenses: [subExpenseSchema],
});

const userExpenseModel = mongoose.model('UserExpense', userExpenseSchema);

export default userExpenseModel;