import express from 'express';
import bodyParser from 'body-parser';
import securityRoutes from './routes/security.routes';
import sequelize from './config/database';
import cors from 'cors';

const app = express();


const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', securityRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
});

