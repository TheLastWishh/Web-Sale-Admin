const db = require('./database');

exports.getListUsers = async () => {
    try {
        let sql = `SELECT * FROM user WHERE Role = '0'`;
        const listUsers = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list user success');
                resolve(result);
            });
        });

        return listUsers;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getListUsersUnlock = async () => {
    try {
        let sql = `SELECT * FROM user WHERE LockUser = 'Unlock' AND Role = '0'`;
        const listUsers = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list user success');
                resolve(result);
            });
        });

        return listUsers;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.lock = async (userID) => {
    try {
        let sql = `UPDATE user SET LockUser = 'Lock' WHERE UserID = ?`;
        db.query(sql, [userID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getListUsersLock = async () => {
    try {
        let sql = `SELECT * FROM user WHERE LockUser = 'Lock' AND Role = '0'`;
        const listUsers = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list user success');
                resolve(result);
            });
        });

        return listUsers;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.unlock = async (userID) => {
    try {
        let sql = `UPDATE user SET LockUser = 'Unlock' WHERE UserID = ?`;
        db.query(sql, [userID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};
