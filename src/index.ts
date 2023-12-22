import express, { Request, Response } from "express";
import router from "./routes";

const PORT = 8080;
const app = express();

app.use(express.json());
app.listen(PORT, () => {
    console.log('Servidor de desarrollo disponible en:\n')
    console.log(`> Local: http://localhost:${PORT}/`)
});
app.get('/ping', (_req: Request, res: Response) => { res.send('pong'); });
app.use('/v1', router);
