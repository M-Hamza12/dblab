import express, { Request } from 'express';
import multer, { memoryStorage, FileFilterCallback } from 'multer';
import S3Service from './../services/S3Service';
const storage = memoryStorage();
const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
  }
};
const upload = multer({ storage });
const router = express.Router();

router.route('/').post(upload.single('image'), async (req, res) => {
  const { file } = req;
  if (!file)
    return res.status(400).json({
      message: 'Bad Request',
    });
  const { key, err } = await S3Service.uploadToS3(file);
  if (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: (err as any)?.message ?? 'something went wrong' });
  }

  return res.status(201).json({ key });
});
export default router;
