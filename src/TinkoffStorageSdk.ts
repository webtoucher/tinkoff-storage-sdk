import S3 from 'aws-sdk/clients/s3.js'
import AWS from 'aws-sdk'
const { Endpoint } = AWS

export type AbortMultipartUploadParams = Omit<S3.AbortMultipartUploadRequest, 'Bucket'>
export type CompleteMultipartUploadParams = Omit<S3.CompleteMultipartUploadRequest, 'Bucket'>
export type CreateMultipartUploadParams = Omit<S3.CreateMultipartUploadRequest, 'Bucket'>
export type HeadObjectParams = Omit<S3.HeadObjectRequest, 'Bucket'>
export type ListObjectsParams = Omit<S3.ListObjectsRequest, 'Bucket'>
export type PutObjectParams = Omit<S3.PutObjectRequest, 'Bucket'>
export type UploadPartParams = Omit<S3.UploadPartRequest, 'Bucket'>

const Bucket: string = 'inbound'

export default class TinkoffStorageSdk {
    private s3: S3

    constructor(accessKeyId: string, secretAccessKey: string) {
        this.s3 = new S3({
            endpoint: new Endpoint('https://s3.api.tinkoff.ai'),
            credentials: { accessKeyId, secretAccessKey },
            signatureVersion: 'v4',
            params: { Bucket },
        })
    }

    public async getBucketLocation(): Promise<S3.GetBucketLocationOutput> {
        return await new Promise((resolve, reject) => {
            this.s3.getBucketLocation((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async getBucketVersioning(): Promise<S3.GetBucketVersioningOutput> {
        return await new Promise((resolve, reject) => {
            this.s3.getBucketVersioning((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async headObject(params: HeadObjectParams): Promise<S3.HeadObjectOutput> {
        const preparedParams = Object.assign(params, { Bucket })
        return await new Promise((resolve, reject) => {
            this.s3.headObject(preparedParams, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async listObjects(params: ListObjectsParams = {}): Promise<S3.ListObjectsOutput> {
        const preparedParams = Object.assign(params, { Bucket })
        return await new Promise((resolve, reject) => {
            this.s3.listObjects(preparedParams, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async putObject(params: PutObjectParams): Promise<S3.PutObjectOutput> {
        const preparedParams = Object.assign(params, { Bucket })
        return await new Promise((resolve, reject) => {
            this.s3.putObject(preparedParams, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async upload(params: PutObjectParams): Promise<S3.PutObjectOutput> {
        const preparedParams = Object.assign(params, { Bucket })
        return await new Promise((resolve, reject) => {
            this.s3.upload(preparedParams, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async createMultipartUpload(params: CreateMultipartUploadParams): Promise<S3.CreateMultipartUploadOutput> {
        const preparedParams = Object.assign(params, { Bucket })
        return await new Promise((resolve, reject) => {
            this.s3.createMultipartUpload(preparedParams, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async uploadPart(params: UploadPartParams): Promise<S3.UploadPartOutput> {
        const preparedParams = Object.assign(params, { Bucket })
        return await new Promise((resolve, reject) => {
            this.s3.uploadPart(preparedParams, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async completeMultipartUpload(params: CompleteMultipartUploadParams): Promise<S3.CompleteMultipartUploadOutput> {
        const preparedParams = Object.assign(params, { Bucket })
        return await new Promise((resolve, reject) => {
            this.s3.completeMultipartUpload(preparedParams, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public async abortMultipartUpload(params: AbortMultipartUploadParams): Promise<S3.AbortMultipartUploadOutput> {
        const preparedParams = Object.assign(params, { Bucket })
        return await new Promise((resolve, reject) => {
            this.s3.abortMultipartUpload(preparedParams, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    public getObjectPath({ Key }: { Key: string }): string {
        return `storage://s3.api.tinkoff.ai/inbound/${Key}`
    }
}
