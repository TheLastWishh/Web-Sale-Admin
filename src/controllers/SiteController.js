const modelProduct = require('../models/model_product');
const db = require('../models/database');

class SiteController {
    async homePage(req, res) {
        if (!req.session.User) {
            req.session.back = `/`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listProducts = await modelProduct.getListProducts();
            let category = await modelProduct.getListCategories();
            res.render('home', {listProducts: listProducts, category: category, user: user});
        }
    }

    async signIn(req, res) {
        res.render('sign-in');
    }

    async handleSignIn(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;

        if (username && password) {
            let sql = `SELECT * FROM user WHERE username = '${username}'`;
            db.query(sql, (err, rows) => {
                if (rows.length <= 0) {
                    let message = 'Tài khoản không tồn tại';
                    res.render('sign-in', {message: message});
                    return;
                }

                let user = rows[0];

                if (user.LockUser === `Lock`) {
                    let message = 'Tài khoản của bạn đã bị khóa';
                    res.render('sign-in', {message: message});
                    return;
                }

                if (password === user.Password && user.Role.readUInt8(0)) {
                    req.session.User = {
                        id: user.UserID,
                        username: user.UserName,
                        role: user.Role,
                        logIn: true,
                    };

                    if (req.session.back) {
                        res.redirect(req.session.back);
                    } else {
                        res.redirect('/');
                    }
                } else {
                    let message = 'Tài khoản hoặc mật khẩu không chính xác';
                    res.render('sign-in', {message: message});
                }
            });
        } else {
            let message = 'Vui lòng nhập đầy đủ thông tin';
            res.render('sign-in', {message: message});
        }
    }

    signOut(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new SiteController();
