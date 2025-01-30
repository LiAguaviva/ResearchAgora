import fs from 'fs';
import path from 'path';

export const deleteFile = (file, folder) => {
    console.log("in the delete++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("file",file);
    console.log("folder",folder);
    
    
    const filePath = path.join(path.resolve(), '../server/public/images', folder, file);
    console.log("Attempting to delete:", filePath);

    try {
        fs.unlinkSync(filePath);
        console.log("Deleted successfully");
    } catch (error) {
        console.error(error);
    }
}

