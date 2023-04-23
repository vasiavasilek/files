import http from 'http';
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import mime from 'mime-types';
import fs from 'fs';

const upload = multer({ dest: './uploads/' });

const app = express();

export const runService = () => {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());

    const server = http.createServer(app);
    const port = 9000;

    app.post('/upload', upload.array('files'), (req, res) => {
        if (Array.isArray(req.files)) {
            req.files.forEach((file) => {
                if (file) {
                    const mimetype = mime.extension(file.mimetype);
                    fs.renameSync(file.path, `${file.path}.${mimetype}`);
                }
            });
        }
        res.send(`Files uploaded - ${JSON.stringify(req.files)}`);
    });

    server.listen(port, () => {
        console.log(`Сервис запущен, порт - ${port}`);
    });
};
