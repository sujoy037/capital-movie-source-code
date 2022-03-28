const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config.json")

const TOKEN_EXP_TIME_IN_SEC = 60

exports.is_authenticated = async (req, res, next) => {
    // console.log("checking authentication...")
    const user_auth_token = req.cookies['authtoken']
    // console.log("user auth token => ", user_auth_token);

    if (user_auth_token) {
        const decode = await verify_auth_token(user_auth_token)
        if (decode) {
            // console.log("verified : ",decode);
            // check is_refresh_token
            if (decode.is_refresh_token) {
                console.log("last token expired. new token will be added... ")
                res.cookie('authtoken', decode.refresh_token, {
                    maxAge: new Date(Date.now() + 900000),
                    httpOnly: true,
                    // Forces to use https in production
                    secure: process.env.NODE_ENV === 'production' ? true : false
                });
                // return next({ user: decode.data })
            }
            req.user = decode.data
            console.log("auth: pass");
            return next()
        }
        console.log("auth: fail");
        return res.status(403).json({
            error: true,
            message: 'Authorization fail!'
        })
    }
    return res.status(403).json({
        error: true,
        message: 'Authorization fail!'
    })

}



const verify_auth_token = async (auth_token) => {
    const secret_key = jwt_secret
    // console.log("decoding token..");
    const token = get_token_from_auth_token(auth_token)
    // console.log("Token : ", token );
    const decoded = jwt.decode(token)

    if (decoded?.data) {
        try {
            // console.log("verifing token...");
            const verified = jwt.verify(token, secret_key);
            return verified
        } catch (e) {
            console.log("error : ", e.message);
            if (e.message && e.message.includes("jwt expired")) {
                const new_token = await generate_auth_token(decoded.data)
                const context = {
                    is_refresh_token: true,
                    refresh_token: new_token,
                    data: decoded.data
                }
                return context
            }
            return false
        }
    }
    return false
}


const get_token_from_auth_token = (arg) => {
    const token = arg.split("Bearer ")[1]
    return token
}



const generate_auth_token = async (arg) => {
    // console.log("arg : ", arg);
    try {
        const secret_key = jwt_secret
        const exp_base_time = Math.floor(Date.now() / 1000)
        // const total_exp_second = 60*60*24*7  // 7 days
        const exp_time = exp_base_time + TOKEN_EXP_TIME_IN_SEC
        const token = jwt.sign({
            exp: exp_time,
            data: arg
        }, secret_key);

        const generated_token = `Bearer ${token}`
        return generated_token
    } catch (e) {
        return false
    }
}
exports.generate_auth_token = generate_auth_token
