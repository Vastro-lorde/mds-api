// String helper functions

function toTitleCase(value) {
    if (!value) return value;
    return value
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

function trimAndCollapseSpaces(value) {
    if (!value) return value;
    return value.replace(/\s+/g, ' ').trim();
}

module.exports = {
    toTitleCase,
    trimAndCollapseSpaces
};


