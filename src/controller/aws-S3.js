
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config({path:"./.env"})

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
});

async function uploadFile(file) {
  const params = {
    ACL: "public-read",
    Bucket: "classroom-training-bucket",
    Key: "abc/" + file.originalname,
    Body: file.buffer,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const url = `https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/${params.Key}`;
    return url;
  } catch (err) {
    throw { error: err };
  }
}

module.exports = { uploadFile };

