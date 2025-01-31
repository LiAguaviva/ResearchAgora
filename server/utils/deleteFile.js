import fs from 'fs';
import path from 'path';

export const deleteFile = (file, folder) => {
    const filePath = path.join(path.resolve(), '../server/public/images', folder, file);
    console.log("Attempting to delete:", filePath);

    try {
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error(error);
    }
}

