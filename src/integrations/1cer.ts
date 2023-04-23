import axios, { AxiosHeaders, AxiosRequestHeaders } from 'axios';

class OneCerService {
    public headers: AxiosRequestHeaders = new AxiosHeaders();

    public uploadFiles = async (files: Express.Multer.File[]) => {
        const formData = new FormData();

        const respnse = await axios({
            url: 'https://dev2.1cer.ru/api/files/data/add',
            method: 'POST',
            data: formData,
        });
    };
}

export default OneCerService;
