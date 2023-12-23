import express from 'express';
import router from './routes';
import './cron';
import environment from './configuration/environment';

const app = express();
const PORT = environment.PORT;

app.use(express.json());
app.listen(PORT, () => {
  console.log('Servidor de desarrollo disponible en:\n');
  console.log(`> Local: http://localhost:${PORT}/`);
});
app.use('/v1', router);
