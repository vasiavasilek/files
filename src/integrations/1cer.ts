import axios from 'axios';
import { IncomingHttpHeaders } from 'http';
import { IOneCerUploadResponse } from '../types/1cer';

class OneCerService {
    public deleteFile = async (headers: IncomingHttpHeaders, data: Record<string, any>) => {
        try {
            const response = await axios<IOneCerUploadResponse>({
                url: 'https://dev2.1cer.ru/api/files/data/delete',
                method: 'POST',
                data,
                headers: {
                    Authorization: headers.authorization,
                },
            });
            return response.data;
        } catch (err) {
            return {};
        }
    };

    public getFile = async (headers: IncomingHttpHeaders, data: Record<string, any>) => {
        try {
            const response = await axios<IOneCerUploadResponse>({
                url: 'https://dev2.1cer.ru/api/files/data/get',
                method: 'POST',
                data,
                headers: {
                    Authorization: headers.authorization,
                },
            });
            return response.data;
        } catch (err) {
            return {};
        }
    };

    public uploadFile = async (headers: IncomingHttpHeaders, body: Record<string, any>, fileName: string): Promise<{filePath?: string}> => {
        try {
            const response = await axios<IOneCerUploadResponse>({
                url: 'https://dev2.1cer.ru/api/files/data/add',
                method: 'POST',
                data: {
                    ...body,
                    fileName,
                },
                headers: {
                    Authorization: headers.authorization,
                },
            });
            return {
                filePath: `F:/dev/1cer-project/temp/${fileName}` || response.data.name,
            };
        } catch (err) {
            return {};
        }
    };
}

export default OneCerService;
