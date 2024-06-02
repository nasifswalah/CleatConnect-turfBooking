import multer from "multer";
import { errorHandler } from "../utils/error.handler.js";

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {fileSize: 2000000},
    fileFilter:( req, file, cb ) => {
        const filetype = '/jpeg|jpg|png/';
        const extname = filetype.test(file.originalname.toLowerCase());
        const mimetype = filetype.test(file.mimetype)
        
        if( extname && mimetype ) {
            return cb(null, true);
        } else {
            return cb(errorHandler(400, "Only JPEG, JPG and PNG images are allowed"));
        }
    } 
})

export default upload;