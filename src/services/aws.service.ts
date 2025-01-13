import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import config from '../config/config';
import path from 'path';
import AWS from 'aws-sdk';
import { ApiError } from '../config/errors';
import httpStatus from 'http-status';

export const s3 = new AWS.S3({
  accessKeyId: config.aws.aws_s3_access_key,
  secretAccessKey: config.aws.aws_s3_secret_key,
  region: config.aws.aws_region,
});

const s3Client = new S3Client({
  region: config.aws.aws_region,
  credentials: {
    accessKeyId: config.aws.aws_s3_access_key,
    secretAccessKey: config.aws.aws_s3_secret_key,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: config.aws.aws_bucket,
    acl: 'public-read', 
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (_req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  }),
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new ApiError(httpStatus.FORBIDDEN, 'Only image files are allowed!'));
    }
    cb(null, true);
  },
});

export default upload;
