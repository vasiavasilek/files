"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const mime_types_1 = __importDefault(require("mime-types"));
const fs_1 = __importDefault(require("fs"));
const upload = (0, multer_1.default)({ dest: './uploads/' });
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
const port = 9000;
app.post('/upload', upload.array('files'), (req, res) => {
    if (Array.isArray(req.files)) {
        req.files.forEach((file) => {
            if (file) {
                const mimetype = mime_types_1.default.extension(file.mimetype);
                fs_1.default.renameSync(file.path, `${file.path}.${mimetype}`);
            }
        });
    }
    res.send(`Files uploaded - ${JSON.stringify(req.files)}`);
});
server.listen(port, () => {
    console.log(`Сервис запущен, порт - ${port}`);
});
