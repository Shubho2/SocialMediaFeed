import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserRepository }  from "../database";
import { User } from '../database/model/User';

class UserController {

    private static userRepository: UserRepository =  new UserRepository();

    static getUserRepository() {
        return UserController.userRepository;
    }

    static setUserRepository(userRepository: UserRepository) {
        UserController.userRepository = userRepository;
    }
    
    static async signup(request, response) {
        const { firstName, lastName, email, password, confirmPassword } = request.body;
        try {
            const existingUser  = await UserController.userRepository.findByEmail(email);
            if (existingUser) {
                return response.status(400).json({ message: `User with email ${email} already exist` });
            }

            if (password !== confirmPassword) {
                return response.status(400).json({ message: "Passwords don't match" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await UserController.userRepository.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword } as User);

            const token = jwt.sign({ email: result.email, id: result._id}, process.env.SECRET_KEY, { expiresIn: "1h" });
            response.status(200).json({ result: result, token });

        } catch (error: any) {
            console.log(error);
            response.status(409).json({ message: error.message });
        }
    }

    static async signin(request, response) {
        const { email, password } = request.body;
        try {
            const existingUser  = await UserController.userRepository.findByEmail(email);
            if (!existingUser) {
                return response.status(404).json({ message: "User doesn't exist" });
            }

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordCorrect) {
                return response.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY, { expiresIn: "1h" });
            response.status(200).json({ result: existingUser, token });

        } catch (error: any) {
            console.log(error);
            response.status(500).json({ message: "Something Went Wrong" });
        }
    }

}

export default UserController;