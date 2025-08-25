// ID helper functions

function isValidObjectId(id) {
    return /^[a-fA-F0-9]{24}$/.test(String(id));
}

module.exports = {
    isValidObjectId
};


