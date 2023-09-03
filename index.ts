import http, { IncomingHttpHeaders } from 'http';
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import fs from 'fs';
import dotenv from 'dotenv';
import OneCerService from './src/integrations/1cer';

dotenv.config();

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1024mb',
}));

app.use(bodyParser.json({
    limit: '1024mb',
}));

const server = http.createServer(app);
const port = process.env.PORT || 9000;

app.post('/delete', (req, res) => {
    (new OneCerService(req.query.api.toString(), req.headers)).deleteFile(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.get('/get', (req, res) => {
    const body = {
        id: req.query.id,
        idOwner: req.query.idOwner,
    };

    const headers = {
        authorization: `Token ${req.query.token}`,
    } as IncomingHttpHeaders;

    (new OneCerService(req.query.api.toString(), headers)).getFile(body)
        .then((response) => {
            if (typeof response.filePath === 'string') {
                res.sendFile(response.filePath);
            } else {
                res.status(404);
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

app.post('/upload', upload.array('files'), (req, res) => {
    if (Array.isArray(req.files)) {
        req.files.forEach((file) => {
            if (file) {
                const fileName = `[${file.filename}]-${file.originalname}`;

                (new OneCerService(req.query.api.toString(), req.headers)).uploadFile({ fileName, idOwner: req.body.idOwner })
                    .then((response) => {
                        if (typeof response.name === 'string') {
                            fs.linkSync(file.path, response.name);
                        }
                        fs.unlink(file.path, () => {});
                    })
                    .catch(() => {
                        fs.unlink(file.path, () => {});
                    });
            }
        });
    }
    res.send(req.files);
});

app.post('/saveText', (req, res) => {
    (new OneCerService(req.query.api.toString(), req.headers)).uploadFile({ fileName: req.body.fileName, idOwner: req.body.idOwner })
        .then((response) => {
            res.send(response);
            if (typeof response.name === 'string') {
                fs.writeFileSync(response.name, req.body.text);
            }
        });
});

server.listen(port, () => {
    console.log(`Сервис запущен, порт - ${port}`);
});
