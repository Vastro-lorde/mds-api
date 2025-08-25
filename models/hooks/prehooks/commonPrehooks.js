// Reusable Mongoose pre hooks

function addUpdatedAtPreSave(schema) {
    schema.pre('save', function (next) {
        this.updatedAt = new Date();
        next();
    });
}

function softDeletePreFind(schema) {
    schema.pre(/^find/, function (next) {
        if (this.getFilter && !this.getFilter().includeInactive) {
            this.where({ active: { $ne: false } });
        }
        next();
    });
}

module.exports = {
    addUpdatedAtPreSave,
    softDeletePreFind
};


