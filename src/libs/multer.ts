import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename(req, file, cb) {
    const uniqueName = uuidv4();
    const extension = file.mimetype.split("/")[1];
    cb(null, `${uniqueName}.${extension}`);
  },
});

export const upload = multer({
  storage: diskStorage,
});