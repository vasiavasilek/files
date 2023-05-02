import axios from 'axios';
import { IncomingHttpHeaders } from 'http';
import { IOneCerDeleteResponse, IOneCerGetResponse, IOneCerUploadResponse } from '../types/1cer';

class OneCerService {
    public deleteFile = async (headers: IncomingHttpHeaders, data: Record<string, any>): Promise<IOneCerDeleteResponse> => {
        try {
            const response = await axios<IOneCerDeleteResponse>({
                url: 'https://dev2.1cer.ru/api/files/data/delete',
                method: 'POST',
                data,
                headers: {
                    Authorization: headers.authorization,
                },
            });
            return response.data;
        } catch (err) {
            return {
                error: true,
            };
        }
    };

    public getFile = async (headers: IncomingHttpHeaders, data: Record<string, any>): Promise<{filePath?: string}> => {
        try {
            const response = await axios<IOneCerGetResponse>({
                url: 'https://dev2.1cer.ru/api/files/data/get',
                method: 'POST',
                data,
                headers: {
                    Authorization: headers.authorization,
                },
            });
            return {
                filePath: response.data.name,
            };
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
