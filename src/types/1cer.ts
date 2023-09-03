export interface IOneCerUploadResponse {
    id: string;
    name: string;
}

export interface IOneCerGetResponse {
    name: string;
}

export interface IOneCerDeleteResponse {
    error: boolean;
}

export interface IUploadedFileResponse {
    idFile: string;
    name: string;
}
