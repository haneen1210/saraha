
import multer from 'multer';
export const filevalidation={
    image:['image/jpeg','image/png','image/webp'],
    file:['application/pdf']
}
function FileUpload(customValidatin =[]){
    const storage = multer.diskStorage({});
    function fileFilter(req,file,cb){
        if(customValidatin.includes(file.mimetype)){
            cb(null,true);
        }
        else{
            cb("invalid format",false)
        }
    }
    const upload = multer({fileFilter,storage});
    return upload;
}
export default FileUpload;