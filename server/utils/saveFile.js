const uuid = require('uuid');
const { getFileExtension, isImage } = require('../checking/checkFile');

module.exports = function saveFile(req, res, next) {
    if (req.files) {
        let fileLinks = [];
        if (!req.files.file.length) req.files.file = [req.files.file];
        for (let file of req.files.file) {

            const extension = getFileExtension(file.name);
            if (isImage(file)) {
                let fileLink = `/images/${uuid.v4()}.${extension}`;
                fileLinks.push(fileLink);
                file.mv(`${__dirname}/../public${fileLink}`);
            } else{
                return res.end(404);
            }

        }
        req.body.fileLinks = fileLinks;
    }
    next();
}