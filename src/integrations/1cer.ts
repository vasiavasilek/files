import axios, { AxiosRequestConfig } from 'axios';
import { IncomingHttpHeaders } from 'http';
import { IOneCerDeleteResponse, IOneCerGetResponse, IOneCerUploadResponse } from '../types/1cer';

class OneCerService {
    private api: string;

    private headers: IncomingHttpHeaders;

    public constructor(api: string, headers: IncomingHttpHeaders) {
        this.api = api;
        this.headers = headers;
    }

    /**
     * Шаблон запроса
     * @param config - параметры запроса
     */
    private request = <T>(config?: AxiosRequestConfig) => axios<T>({
        baseURL: `${this.api}/files/data`,
        headers: {
            Authorization: this.headers.authorization,
        },
        ...config,
    });

    /**
     * Запрос на удаление файла
     * @param data - параметры запроса
     */
    public deleteFile = async (data: Record<string, any>): Promise<IOneCerDeleteResponse> => {
        try {
            const response = await this.request<IOneCerDeleteResponse>({
                url: '/delete',
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
     * @param data - параметры запроса
     */
    public getFile = async (data: Record<string, any>): Promise<{filePath?: string}> => {
        try {
            const response = await this.request<IOneCerGetResponse>({
                url: '/get',
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
     * @param body - параметры запроса
     * @param fileName - оригинальное имя файла
     */
    public uploadFile = async (data: Record<string, any>): Promise<{name?: string; id?: string;}> => {
        try {
            const response = await this.request<IOneCerUploadResponse>({
                url: '/files/data/add',
                method: 'POST',
                data,
            });
            return response.data;
        } catch (err) {
            return {};
        }
    };
}

export default OneCerService;
