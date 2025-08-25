// Auth-related enums

const Roles = Object.freeze({
    ADMIN: 'admin',
    STAFF: 'staff',
    STUDENT: 'student',
    PARENT: 'parent',
    COACH: 'coach'
});

const RoleEnum = Object.freeze(Object.values(Roles));

module.exports = {
    Roles,
    RoleEnum
};


