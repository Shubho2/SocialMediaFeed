import jwt from 'jsonwebtoken';

class Auth {

    static async authenticate(request, response, next) {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const isCustomAuth = token.length < 500;

            let decodedData;

            if (token && isCustomAuth) {
                decodedData = jwt.verify(token, process.env.SECRET_KEY);
                request.userId = decodedData?.id;
            } else if (token) {
                decodedData = jwt.decode(token);
                request.userId = decodedData?.sub;
            } else {
                response.status(401).json({ message: "Unauthorized" });
            }
            next();
        } catch (error: any) {
            console.log(error);
            response.status(401).json({ message: "Unauthorized" });
        }
    }

}

export default Auth;