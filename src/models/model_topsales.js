const db = require('./database');

exports.getTopSales = async () => {
    try {
        let sql = `SELECT 
                        p.ProductID, 
                        p.ProductName, 
                        p.ProductCategoryID, 
                        p.SupplierID, 
                        p.CostPrice, 
                        p.Price AS UnitPrice, 
                        SUM(pod.OrderedQuantity) AS TotalQuantitySold
                    FROM 
                        purchaseorderdetail pod
                    JOIN 
                        product p ON pod.ProductID = p.ProductID
                    GROUP BY 
                        p.ProductID, 
                        p.ProductName, 
                        p.ProductCategoryID, 
                        p.SupplierID, 
                        p.CostPrice, 
                        p.Price
                    ORDER BY 
                        TotalQuantitySold DESC
                    LIMIT 8;
                    `;
        const listTopSales = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get top sales success');
                resolve(result);
            });
        });

        return listTopSales;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.getTopSalesByCategory = async (category) => {
    try {
        let sql = `SELECT 
                        p.ProductID, 
                        p.ProductName, 
                        p.ProductCategoryID, 
                        p.SupplierID, 
                        p.CostPrice, 
                        p.Price AS UnitPrice, 
                        SUM(pod.OrderedQuantity) AS TotalQuantitySold
                    FROM 
                        purchaseorderdetail pod
                    JOIN 
                        product p ON pod.ProductID = p.ProductID
                    WHERE 
                        ProductCategoryID = ?
                    GROUP BY 
                        p.ProductID, 
                        p.ProductName, 
                        p.ProductCategoryID, 
                        p.SupplierID, 
                        p.CostPrice, 
                        p.Price
                    ORDER BY 
                        TotalQuantitySold DESC
                    LIMIT 8;
                    `;
        const listTopSales = await new Promise((resolve, reject) => {
            db.query(sql, [category], (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('Get top sales success');
                resolve(result);
            });
        });

        return listTopSales;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
