import http from 'http';
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import mime from 'mime-types';
import fs from 'fs';
import dotenv from 'dotenv';
import OneCerService from './src/integrations/1cer';

dotenv.config();

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

const server = http.createServer(app);
const port = process.env.PORT || 9000;

app.post('/delete', (req, res) => {
    (new OneCerService()).deleteFile(req.headers, req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.post('/get', (req, res) => {
    (new OneCerService()).getFile(req.headers, req.body)
        .then((response) => {
            if (typeof response.filePath === 'string') {
                res.sendFile(response.filePath);
            }
            res.status(404);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.post('/upload', upload.array('files'), (req, res) => {
    if (Array.isArray(req.files)) {
        req.files.forEach((file) => {
            if (file) {
                const mimetype = mime.extension(file.mimetype);
                const fileName = `${file.filename}.${mimetype}`;

                (new OneCerService()).uploadFile(req.headers, req.body, fileName)
                    .then(({ filePath }) => {
                        if (typeof filePath === 'string') {
                            fs.linkSync(file.path, filePath);
                        }
                        fs.unlink(file.path, () => {});
                    })
                    .catch(() => {
                        fs.unlink(file.path, () => {});
                    });
            }
        });
    }
    res.send(`Files uploaded - ${JSON.stringify(req.files)}`);
});

server.listen(port, () => {
    console.log(`Сервис запущен, порт - ${port}`);
});
