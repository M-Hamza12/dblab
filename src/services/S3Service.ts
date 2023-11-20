import {
  S3Client,
  PutObjectCommand,
  S3ClientConfig,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
      region: process.env.AWS_REGION,
    }); // Create a new instance of S3
    this.bucket = process.env.BUCKET || 'dblab-react-node';
  }
  async uploadToS3(file: any) {
    const key = uuidv4();
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    try {
      await this.s3.send(command);
      return { key };
    } catch (err) {
      console.error(err);
      return { err };
    }
  }
  async getAllImages() {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
    });
    const { Contents = [] } = await this.s3.send(command);
    console.log('contents ', Contents);
    return Contents.map((content) => content.Key);
  }
  async getPresignedUrls() {
    try {
      const keys = await this.getAllImages();
      const urls = await Promise.all(
        keys.map(async (key) => {
          const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
          });
          const signedUrl = await getSignedUrl(this.s3, command, {
            expiresIn: 3600,
          });
          return { [key as string]: signedUrl };
        })
      );
      return { urls };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}
export default new S3Service();
