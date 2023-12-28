import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan'; // Import morgan for logging
import blockchainRoutes from './routes/blockchainRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(morgan('combined')); 


app.use((req, res, next) => {
  const originalSend = res.send.bind(res); 
  res.send = function (data) {
    console.log("Response: ", data); 
    return originalSend(data); 
  };
  next();
});


app.use('/api', blockchainRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
