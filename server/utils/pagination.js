module.exports = function paginate(req, res, next) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let skipIndex = (page - 1) * limit;
    if(skipIndex < 0){
        skipIndex = 0;
    }
    req.limit = limit;
    req.skipIndex = skipIndex;
    next();
}