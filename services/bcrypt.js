const bcrypt = require("bcrypt");

// Hashing a password
exports.passwordHashing = async (password) => {
    try {
        const saltRounds = 10;
        let saltPassword = await bcrypt.hash(password, saltRounds);
        return saltPassword;
    } catch (err) {
        console.error("hashing error", err);
        return null;
    }
};

// passwordComparing function
exports.passwordComparing = async (hashedPassword, userPassword) => {
    try {
        const result = await bcrypt.compare(userPassword, hashedPassword);
        if (result) {
            console.log("Passwords match!");
            return true;
        } else {
            console.log("Passwords do not match!");
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};
