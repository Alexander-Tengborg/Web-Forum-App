import passport from 'passport';
import LocalStrategy, { Strategy } from 'passport-local';
import bcryptjs from 'bcryptjs';

import User from './models/User';

passport.use(new LocalStrategy.Strategy(async (_username, _password, done) => {
    const user = await User.findOne({where: {username: _username}});
    if(user) {
        const passwordMatches = await bcryptjs.compare(_password, user.password);

        if(passwordMatches) {
            return done(null, user);
        }
        return done(null, false);
    }
    done(null, false);
}));
    
export const localStrategy = () => {
    return new LocalStrategy.Strategy(async (_username, _password, done) => {
        const user = await User.findOne({where: {username: _username}});
        if(user) {
            const passwordMatches = await bcryptjs.compare(_password, user.password);
    
            if(passwordMatches) {
                return done(null, user);
            }
            return done(null, false);
        }
        done(null, false);
    });
}

//FIX user: any
// export const serializeUser = (user: any, done) => {
//     done(null, {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//     })
// }

export const serializeUser = (user: any, done) => {
    done(null, user.username);
}

export const deserializeUser = (user: any, done) => {
    done(null, user);
}

