import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { getAccessToken } from '../utils/getAccessToken';
import { generatorRandomText } from '../utils/generatorRandomText';

const register = async (req: any, res: any) => {
    const body = req.body;
    delete body.confirmPassword;
    const { email, password } = body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            throw new Error('The account already exists.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        body.password = hashPassword;

        const newUser: any = new UserModel(body);
        await newUser.save();

        delete newUser._doc.password;

        newUser._doc.token = await getAccessToken({
            _id: newUser._id,
            email: newUser.email,
            rule: 1
        });

        res.status(200).json({
            message: 'Register successfully',
            data: newUser
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
};

const login = async (req: any, res: any) => {
    const body = req.body;
    const { email, password } = body;

    try {
        const user: any = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('The account does not exist');
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            throw new Error('Login fail!');
        }

        delete user._doc.password;
        user._doc.token = await getAccessToken({
            _id: user._id,
            email: user.email,
            rule: user.rule ?? 1
        });

        res.status(200).json({
            message: 'Login successfully',
            data: user
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
};

const loginWithGoogle = async (req: any, res: any) => {
    const body = req.body;
    const { email, name } = body;

    try {
        const user: any = await UserModel.findOne({ email });

        if (user) {
            delete user._doc.password;
            user._doc.token = await getAccessToken({
                _id: user._id,
                email: user.email,
                rule: user.rule ?? 1
            });

            res.status(200).json({
                message: 'Login successfully',
                data: user
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(
                generatorRandomText(6),
                salt
            );

            body.password = hashpassword;

            const newUser: any = new UserModel(body);
            await newUser.save();

            delete newUser._doc.password;

            newUser._doc.token = await getAccessToken({
                _id: newUser._id,
                email: newUser.email,
                rule: 1
            });

            res.status(200).json({
                message: 'Login successfully',
                data: newUser
            });
        }
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
};

export const controller = {
    register,
    login,
    loginWithGoogle
};
