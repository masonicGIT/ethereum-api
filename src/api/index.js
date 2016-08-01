import { Router } from 'express';
import balance from './balance';

export default ({ config }) => {
  let api = Router();

  api.use('/balance', balance({ config })); 
  
  api.get('/', (req, res) => {
    res.json({ message: 'Welcome to the ethereum classic API' });
  });

  return api;
}