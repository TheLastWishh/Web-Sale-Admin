const db = require('./database');

exports.getListOrders = async () => {
    try {
        let sql = `SELECT * FROM purchaseorder ORDER BY OrderDate ASC`;
        const listPurchaseOrder = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list purchaseorder success');
                resolve(result);
            });
        });

        return listPurchaseOrder;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getListOrdersUnconfirmed = async () => {
    try {
        let sql = `SELECT * FROM purchaseorder WHERE State='Chờ xác nhận' ORDER BY OrderDate ASC`;
        const listPurchaseOrderUnconfirmed = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list purchaseorder success');
                resolve(result);
            });
        });

        return listPurchaseOrderUnconfirmed;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.confirm = async (purchaseOrderID) => {
    try {
        let sql = `UPDATE purchaseorder SET state = 'Đang giao hàng' WHERE PurchaseOrderID = ?`;
        db.query(sql, [purchaseOrderID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getListOrdersDelivery = async () => {
    try {
        let sql = `SELECT * FROM purchaseorder WHERE State='Đang giao hàng' ORDER BY OrderDate ASC`;
        const listPurchaseOrderDelivery = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list purchaseorder success');
                resolve(result);
            });
        });

        return listPurchaseOrderDelivery;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.deliver = async (purchaseOrderID) => {
    try {
        let sql = `UPDATE purchaseorder SET state = 'Hoàn thành' WHERE PurchaseOrderID = ?`;
        db.query(sql, [purchaseOrderID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getListOrdersDelivered = async () => {
    try {
        let sql = `SELECT * FROM purchaseorder WHERE State='Hoàn thành' ORDER BY OrderDate ASC`;
        const listPurchaseOrderDelivered = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list purchaseorder success');
                resolve(result);
            });
        });

        return listPurchaseOrderDelivered;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getPurchaseOrderDetail = async (purchasrOrderID) => {
    try {
        let sql1 = `SELECT * FROM purchaseorderdetail WHERE PurchaseOrderID = ?`;
        const purchaseOrderDetails = await new Promise((resolve, reject) => {
            db.query(sql1, [purchasrOrderID], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

        for (let index = 0; index < purchaseOrderDetails.length; index++) {
            const item = purchaseOrderDetails[index];
            const productInfo = await new Promise((resolve, reject) => {
                let sql2 = `SELECT ProductName, ImgProduct FROM product WHERE ProductID = ?`;
                db.query(sql2, [item.ProductID], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result[0]);
                });
            });
            purchaseOrderDetails[index] = Object.assign(item, productInfo);
        }

        let sql3 = `SELECT Total FROM purchaseorder WHERE PurchaseOrderID = ?`;
        const total = await new Promise((resolve, reject) => {
            db.query(sql3, [purchasrOrderID], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });

        return {
            purchaseOrderDetails: purchaseOrderDetails,
            Total: total.Total,
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.cancelOrder = (purchaseOrderID) => {
    try {
        let sql1 = `DELETE FROM purchaseorderdetail
                    WHERE PurchaseOrderID = ?;`;
        db.query(sql1, [purchaseOrderID]);

        let sql2 = `DELETE FROM purchaseorder
                    WHERE PurchaseOrderID = ?;`;
        db.query(sql2, [purchaseOrderID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};
