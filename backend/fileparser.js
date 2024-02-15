import AWS from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_REGION, S3_BUCKET } = process.env;
const s3 = new AWS.S3({
    region: S3_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

async function uploadImage({ imageName, imagePath }) {
    const params = {
        Bucket: S3_BUCKET,
        Key: imageName,
        Body: fs.createReadStream(imagePath)
    };

    try {
        const data = await s3.upload(params).promise();
        console.log("key ",data.Key)
        return data.Location;
    } catch (err) {
        throw new Error(`Error uploading file: ${err}`);
    }
}

export { uploadImage };
