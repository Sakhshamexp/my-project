const express = require('express');
const mongoose = require('mongoose');
const Account = require('../models/Account'); 
const router = express.Router();

// --- Database Connection Logic (Exported, not executed immediately) ---

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/experiment18");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// --- API Endpoints ---

// POST /create-users: Initialize Sakhsham (1100) and Parv (501)
router.post('/create-users', async (req, res) => {
  try {
    await Account.deleteMany({}); 
    
    // Updated names and balances
    const sakhsham = { name: 'Sakhsham', balance: 1100 };
    const parv = { name: 'Parv', balance: 501 };

    const users = await Account.insertMany([sakhsham, parv]);

    res.status(201).json({
      message: 'Users created',
      users: users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating users' });
  }
});

// POST /transfer: Transfer money with balance validation
router.post('/transfer', async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;
  const transferAmount = Number(amount);

  if (transferAmount <= 0 || isNaN(transferAmount)) {
    return res.status(400).json({ message: 'Invalid transfer amount' });
  }

  try {
    // 1. Retrieve Accounts (Use findOne to lock if necessary, but here we just read)
    const sender = await Account.findById(fromUserId);
    const receiver = await Account.findById(toUserId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'One or both accounts not found' });
    }

    // 2. Balance Validation
    if (sender.balance < transferAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // 3. Perform Sequential Updates
    sender.balance -= transferAmount;
    await sender.save();

    receiver.balance += transferAmount;
    await receiver.save();

    // 4. Success Response
    res.status(200).json({
      message: `Transferred $${transferAmount} from ${sender.name} to ${receiver.name}.`,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during transfer' });
  }
});

module.exports = { router, connectDB };