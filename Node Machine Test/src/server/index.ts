import express, { Request, Response } from 'express';
import routes from '../routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/health-check', (req: Request, res: Response) => {
    res.send('A healthy result.');
});


app.use('/', routes);

export const startServer = (port: number, hostname: string) => {
    app.listen(port, hostname, () => {
        console.log(`Server is running on http://${hostname}:${port}`);
    });
};

export default app;
