import multer from "multer";
import path from "path";

// configura onde e como salvar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nome = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, nome);
  }
});

const upload = multer({ storage });

export default upload;
