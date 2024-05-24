import multer from 'multer';
import { nanoid } from 'nanoid';
//import path from 'path';
//import { fileURLToPath } from 'url';
//const __dirname = path.dirname(fileURLToPath(import.meta.url));
//export const filevalidation = {
 //   image: ['image/jpeg', 'image/png', 'image/webp'],
 //   file: ['application/pdf']
//}
function FileUpload() {
    const storage = multer.diskStorage({});
    function fileFilter(req, file, cb) {
        if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb("invalid format", false)
        }}
    const upload = multer({ fileFilter, storage });
    return upload;
}
export default FileUpload;