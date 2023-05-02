import axios, { AxiosRequestConfig } from 'axios';
import { IncomingHttpHeaders } from 'http';
import { IOneCerDeleteResponse, IOneCerGetResponse, IOneCerUploadResponse } from '../types/1cer';

class OneCerService {
    /**
     * Шаблон запроса
     * @param headers - заголовки запроса
     * @param config - параметры запроса
     */
    private request = <T>(headers: IncomingHttpHeaders, config?: AxiosRequestConfig) => axios<T>({
        baseURL: headers.host,
        headers: {
            Authorization: headers.authorization,
        },
        ...config,
    });

    /**
     * Запрос на удаление файла
     * @param headers - заголовки запроса
     * @param data - параметры запроса
     */
    public deleteFile = async (headers: IncomingHttpHeaders, data: Record<string, any>): Promise<IOneCerDeleteResponse> => {
        try {
            const response = await this.request<IOneCerDeleteResponse>(headers, {
                url: '/api/files/data/delete',
                method: 'POST',
                data,
            });
            return response.data;
        } catch (err) {
            return {
                error: true,
            };
        }
    };

    /**
     * Запрос на получение файла
     * @param headers - заголовки запроса
     * @param data - параметры запроса
     */
    public getFile = async (headers: IncomingHttpHeaders, data: Record<string, any>): Promise<{filePath?: string}> => {
        try {
            const response = await this.request<IOneCerGetResponse>(headers, {
                url: '/api/files/data/get',
                method: 'POST',
                data,
            });
            return {
                filePath: response.data.name,
            };
        } catch (err) {
            return {};
        }
    };

    /**
     * Загрузка файла
     * @param headers - заголовки запроса
     * @param body - параметры запроса
     * @param fileName - оригинальное имя файла
     */
    public uploadFile = async (headers: IncomingHttpHeaders, body: Record<string, any>, fileName: string): Promise<{filePath?: string}> => {
        try {
            const response = await this.request<IOneCerUploadResponse>(headers, {
                url: '/api/files/data/add',
                method: 'POST',
                data: {
                    ...body,
                    fileName,
                },
            });
            return {
                filePath: response.data.name,
            };
        } catch (err) {
            return {};
        }
    };
}

export default OneCerService;
