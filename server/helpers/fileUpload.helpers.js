import multer from 'multer';

//multer storage
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  },
});

export const upload = multer({
  storage: fileStorageEngine,
});
