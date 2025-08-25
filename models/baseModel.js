// Base schema with common fields and plugins

const mongoose = require('mongoose');
const softDeletePlugin = require('./plugins/softDelete');

function createBaseSchema(definition, options = {}) {
    const baseDefinition = {
        ...definition
    };

    const schema = new mongoose.Schema(baseDefinition, { timestamps: true, ...options });

    // Attach common plugins
    schema.plugin(softDeletePlugin);

    return schema;
}

module.exports = {
    createBaseSchema
};


