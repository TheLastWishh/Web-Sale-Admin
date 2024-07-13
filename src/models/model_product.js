const db = require('./database');

exports.getListCategories = async () => {
    try {
        let sql = `SELECT * FROM productcategories ORDER BY GroupProductID ASC`;
        const categoryResult = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list category success');
                resolve(result);
            });
        });

        return categoryResult;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.getListProducts = async () => {
    try {
        let sql = `SELECT * FROM product`;
        const listProducts = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list product success');
                resolve(result);
            });
        });

        return listProducts;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getListProductsByCategory = async (category) => {
    try {
        let sql = `SELECT * FROM product WHERE ProductCategoryID = ?`;
        const listProducts = await new Promise((resolve, reject) => {
            db.query(sql, [category], (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get list product success');
                resolve(result);
            });
        });

        return listProducts;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.add = async (data) => {
    try {
        let sql = `INSERT INTO product SET ?`;
        db.query(sql, data);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getProductInfo = async (productID) => {
    try {
        let sql1 = `SELECT * FROM product WHERE productID = ?`;
        const productInfo = await new Promise((resolve, reject) => {
            db.query(sql1, [productID], (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get product info success');
                resolve(result[0]);
            });
        });

        let sql2 = `SELECT ProductCategoryName FROM productcategories WHERE ProductCategoryID = ?`;
        const ProductCategoryName = await new Promise((resolve, reject) => {
            db.query(sql2, [productInfo.ProductCategoryID], (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get category success');
                resolve(result[0]);
            });
        });
        productInfo.ProductCategoryName = ProductCategoryName.ProductCategoryName;

        let sql3 = `SELECT SupplierName FROM supplier WHERE SupplierID = ?`;
        const SupplierName = await new Promise((resolve, reject) => {
            db.query(sql3, [productInfo.SupplierID], (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get supplier success');
                resolve(result[0]);
            });
        });
        productInfo.SupplierName = SupplierName.SupplierName;

        return productInfo;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.update = async (data, productID) => {
    try {
        let sql = `UPDATE product SET ? WHERE ProductID = ?`;
        db.query(sql, [data, productID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.delete = async (productID) => {
    try {
        let sql = `DELETE FROM product WHERE ProductID = ?`;
        db.query(sql, [productID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};
