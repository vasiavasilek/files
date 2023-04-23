import http from 'http';
import express, { Request } from 'express';

const app = express();

// app.use(bodyParser.urlencoded({
//     extended: true,
// }));
// app.use(bodyParser.json());

const server = http.createServer(app);
const port = 9000;

/**
 * Отправить сообщение в сокет от http
 */
app.get('/', (req: Request, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Сервис запущен, порт - ${port}`);
});
