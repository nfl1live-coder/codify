require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Budget = require('./models/Budget');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Get budget by sessionId
app.get('/api/budget/:sessionId', async (req, res) => {
  try {
    const budget = await Budget.findOne({ sessionId: req.params.sessionId });
    if (!budget) {
      return res.json({ income: 0, expenses: [], savingsGoal: 0, currency: 'USD' });
    }
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save/update full budget state
app.post('/api/budget/:sessionId', async (req, res) => {
  try {
    const { income, expenses, savingsGoal, currency } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { income, expenses, savingsGoal, currency },
      { upsert: true, new: true, runValidators: true }
    );
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
