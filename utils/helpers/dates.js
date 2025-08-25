// Date helper functions

function calculateAgeFromDate(dateValue) {
    if (!dateValue) return null;
    const today = new Date();
    const dob = new Date(dateValue);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

module.exports = {
    calculateAgeFromDate
};


