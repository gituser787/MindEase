
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Replace with your actual MongoDB URI in .env
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindease';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas & Models
const MoodSchema = new mongoose.Schema({
  date: { type: String, required: true },
  mood: { type: String, required: true },
  note: String,
  icon: String,
  tags: [String],
  userEmail: String // Simple relation for demo
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  bio: String
});

const Mood = mongoose.model('Mood', MoodSchema);
const User = mongoose.model('User', UserSchema);

// Routes

// 1. Auth / User initialization
app.post('/api/auth/login', async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, bio: "Finding peace one day at a time." });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Update User Profile
app.put('/api/user', async (req, res) => {
  try {
    const { email, name, bio, avatar } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { name, bio, avatar },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get Moods
app.get('/api/moods', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Create Mood
app.post('/api/moods', async (req, res) => {
  try {
    const newMood = new Mood(req.body);
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
