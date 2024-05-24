
import multer from "multer"

export const filevalidation = {
    image: ['image/png', 'image/jpeg', 'image/webp'],
    pdf: ['application/pdf'],
    excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
};

function FileUpload(customValidation = []) {
    const storage = multer.diskStorage({});
    
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb("Invalid format", false);
        }
    }
    
    const upload = multer({ fileFilter, storage });
    return upload;
}

export default FileUpload;
