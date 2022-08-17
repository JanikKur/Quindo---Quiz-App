const bcrypt = require('bcrypt');

module.exports.comparePasswords = async (password1, password2) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password1, password2, function (err, result) {
            if (err || (result === false)) {
                reject("Wrong Password");
            }
            if (result === true) {
                resolve();
            }
        });
    })
}