import axios from 'axios';
import { IncomingHttpHeaders } from 'http';
import { IOneCerUploadResponse } from '../types/1cer';

class OneCerService {
    public uploadFiles = async (headers: IncomingHttpHeaders, body: Record<string, any>, fileName: string): Promise<{filePath?: string}> => {
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
