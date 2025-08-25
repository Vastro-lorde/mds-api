// Reusable Mongoose post hooks

function logAfterSave(schema, modelName = 'Document') {
    schema.post('save', function (doc) {
        console.log(`${modelName} saved:`, doc._id.toString());
    });
}

function handleDuplicateKeyErrors(schema) {
    schema.post('save', function (error, doc, next) {
        if (error && error.code === 11000) {
            next(new Error('Duplicate key error'));
        } else {
            next(error);
        }
    });
}

module.exports = {
    logAfterSave,
    handleDuplicateKeyErrors
};


