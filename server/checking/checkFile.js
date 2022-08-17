const imageFileTypes = {
    "jpeg": 1,
    "jpg": 1,
    "png": 1,
    "gif": 1,
    "tiff": 1,
    "tif": 1,
    "webp": 1,
    "bmp": 1
}

function isImage(file){
    const extension = getFileExtension(file.name);
    return imageFileTypes[extension.toLowerCase()];
}

function getFileExtension(filename) {
    const fileParts = filename.split('.');
    return fileParts[fileParts.length - 1];
}

module.exports = {
    isImage,
    getFileExtension
}