require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const app = require('./src/app');

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}, frontend URL: ${process.env.FRONTEND_URL}`);
});
