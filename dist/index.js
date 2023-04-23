"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
const port = 9000;
/**
 * Отправить сообщение в сокет от http
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});
server.listen(port, () => {
    console.log(`HTTP, WS порт: ${port}`);
});
