import passport, { DoneCallback } from 'passport';
import LocalStrategy from 'passport-local';
import bcryptjs from 'bcryptjs';

import User from './models/User';

    
export const localStrategy = () => {
    return new LocalStrategy.Strategy(async (username: string, password: string, done: any) => {
        const user: User | null = await User.findOne({where: {username: username}});

        if(user) {
            const passwordMatches: boolean = await bcryptjs.compare(password, user.password);
    
            if(passwordMatches)
                return done(null, user);
    
            return done(null, false);
        }
        
        done(null, false);
    });
}

export const serializeUser = (user: Express.User, done: DoneCallback) => {
    done(null, {
        id: user.id,
        email: user.email,
        username: user.username,
    })
}

export const deserializeUser = (user: Express.User, done: DoneCallback) => {
    done(null, user);
}

