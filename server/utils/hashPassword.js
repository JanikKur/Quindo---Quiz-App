const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
}