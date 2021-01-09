import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const storageName = originalname.replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${storageName}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === ('image/png' || 'image/jpg' || 'image/jpeg')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const fileSize = 2 * 1024 * 1024;

export default multer({
  storage,
  fileFilter,
  limits: { fileSize },
}).single('image');
