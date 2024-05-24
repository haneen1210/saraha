import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const filevalidation = {
    image: ['image/jpeg', 'image/png', 'image/webp'],
    file: ['application/pdf']
}
function FileUpload(customValidatin = []) {
    const fullPath = path.join(__dirname, '../upload');
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fullPath);
        },
        filename: (req, file, cb) => {
            cb(null, nanoid() + file.originalname);
        }
    });
    function fileFilter(req, file, cb) {
        if (customValidatin.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb("invalid format", false)
        }}
    const upload = multer({ fileFilter, storage });
    return upload;
}
export default FileUpload;