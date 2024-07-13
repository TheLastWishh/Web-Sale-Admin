const modelUser = require('../models/model_user');
const db = require('../models/database');

class UserController {
    async listUsers(req, res) {
        if (!req.session.User) {
            req.session.back = `/user`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listUser = await modelUser.getListUsers();
            res.render('user/list-users', {listUser: listUser, user: user});
        }
    }

    async lockUsers(req, res) {
        if (!req.session.User) {
            req.session.back = `/user/lock-users`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listUser = await modelUser.getListUsersUnlock();
            res.render('user/lock-users', {listUser: listUser, user: user});
        }
    }

    async lock(req, res) {
        let userID = req.params.id;
        await modelUser.lock(userID);
        res.redirect('/user/lock-users');
    }

    async unlockUsers(req, res) {
        if (!req.session.User) {
            req.session.back = `/user/unlock-users`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listUser = await modelUser.getListUsersLock();
            res.render('user/unlock-users', {listUser: listUser, user: user});
        }
    }

    async unlock(req, res) {
        let userID = req.params.id;
        await modelUser.unlock(userID);
        res.redirect('/user/unlock-users');
    }
}

module.exports = new UserController();
