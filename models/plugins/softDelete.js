// Soft delete plugin: adds active/deletedAt fields, default query filter, and helper methods

module.exports = function softDeletePlugin(schema) {
    // Add fields if not already defined
    if (!schema.path('active')) {
        schema.add({ active: { type: Boolean, default: true } });
    }
    if (!schema.path('deletedAt')) {
        schema.add({ deletedAt: { type: Date, default: null } });
    }

    // Default filter to exclude inactive unless includeInactive is explicitly set on the filter
    schema.pre(/^find/, function(next) {
        try {
            const filter = this.getFilter ? this.getFilter() : {};
            if (!filter || !filter.includeInactive) {
                this.where({ active: { $ne: false } });
            }
        } catch (_) {}
        next();
    });

    // Instance method
    schema.methods.softDelete = function() {
        this.active = false;
        this.deletedAt = new Date();
        return this.save();
    };

    // Static helpers
    schema.statics.softDeleteById = function(id) {
        return this.findByIdAndUpdate(id, { active: false, deletedAt: new Date() }, { new: true });
    };

    schema.statics.softDeleteOne = function(filter) {
        return this.findOneAndUpdate(filter, { active: false, deletedAt: new Date() }, { new: true });
    };

    schema.statics.softDeleteMany = function(filter) {
        return this.updateMany(filter, { active: false, deletedAt: new Date() });
    };
};


