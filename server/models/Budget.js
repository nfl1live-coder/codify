const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
}, { _id: false });

const budgetSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true, index: true },
  income: { type: Number, default: 0 },
  expenses: { type: [expenseSchema], default: [] },
  savingsGoal: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
