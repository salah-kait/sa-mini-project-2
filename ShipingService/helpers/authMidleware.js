const axios = require('axios');


async function isAuthenticated(req, res, next) {
    const {authorization } = req.headers;

    if (!authorization)
        return res
            .status(403)
            .send({
                message: "Unauthorized"
            });

    if (!authorization.startsWith("Bearer"))
        return res
            .status(403)
            .send({
                message: "Unauthorized"
            });

    const split = authorization.split("Bearer ");
    if (split.length !== 2)
        return res
            .status(403)
            .send({
                message: "Unauthorized"
            });

    const token = split[1];

    try {
        const decodedToken = await verifyIdToken(token);
        req.user = decodedToken.user;
        req.jwt_token = token;

        return next();
    } catch (err) {
        return res
            .status(403)
            .send({
                message: "Unauthorized"
            });
    }
}

module.exports = isAuthenticated;

const verifyIdToken = (token)=>{
    return new Promise((resolve, reject) => {
        const authUrl = process.env.ACCOUNT_SERVICE_URL;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
        };

        axios.post(
            authUrl+'/api/auth/verify-token',
            bodyParameters,
            config
        ).then(
            function (response) {

                return resolve(response.data);
            }
        ).catch(
            function (error) {

                return reject(error.response);
            }
        );
    });

}