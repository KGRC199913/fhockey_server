module.exports = (req) => {
    const { email, password } = req.body;
    req.body = { email, password: "" };
    return {
        email,
        password
    };
};