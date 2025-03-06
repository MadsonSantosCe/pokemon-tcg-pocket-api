import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const diskStorage = multer.diskStorage({
  filename(req, file, cb) {
    const uniqueName = uuidv4();
    const extension = file.mimetype.split("/")[1];
    cb(null, `${uniqueName}.${extension}`);
  },
  destination(req, file, cb) {
    cb(null, "./public/uploads");
  },
});

export const upload = multer({
  storage: diskStorage,
});