const modelProduct = require('../models/model_product');

class ProductController {
    async listProducts(req, res) {
        if (!req.session.User) {
            req.session.back = `/product`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listProducts = await modelProduct.getListProducts();
            let category = await modelProduct.getListCategories();
            res.render('product/list-products', {listProducts: listProducts, category: category, user: user});
        }
    }

    async listByCategory(req, res) {
        if (!req.session.User) {
            req.session.back = `/product`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let categoryID = req.params.productCategoryID;
            let listProducts = await modelProduct.getListProductsByCategory(categoryID);
            let category = await modelProduct.getListCategories();
            res.render('product/list-products', {listProducts: listProducts, category: category, user: user});
        }
    }

    async addProduct(req, res) {
        if (!req.session.User) {
            req.session.back = `/product/add`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            res.render('product/add-product', {user: user});
        }
    }

    async add(req, res) {
        const {productID, productName, productCategoryID, supplierID, quantity, costPrice, price, imgProduct, description} = req.body;
        let data = {
            productID: productID,
            productName: productName,
            productCategoryID: productCategoryID,
            supplierID: supplierID,
            imgProduct: imgProduct,
            description: description,
            quantity: quantity,
            costPrice: costPrice,
            price: price,
        };

        await modelProduct.add(data);
        res.redirect('./');
    }

    async editProduct(req, res) {
        if (!req.session.User) {
            req.session.back = `/product/edit`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listProducts = await modelProduct.getListProducts();
            let category = await modelProduct.getListCategories();
            res.render('product/edit-product', {listProducts: listProducts, category: category, user: user});
        }
    }

    async editByCategory(req, res) {
        if (!req.session.User) {
            req.session.back = `/product/edit`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let categoryID = req.params.productCategoryID;
            let listProducts = await modelProduct.getListProductsByCategory(categoryID);
            let category = await modelProduct.getListCategories();
            res.render('product/edit-product', {listProducts: listProducts, category: category, user: user});
        }
    }

    async edit(req, res) {
        if (!req.session.User) {
            req.session.back = `/product/edit`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let productID = req.params.productID;
            let productInfo = await modelProduct.getProductInfo(productID);
            res.render('product/update-product', {productInfo: productInfo, user: user});
        }
    }

    async update(req, res) {
        const {productID, productName, productCategoryID, supplierID, quantity, costPrice, price, imgProduct, description} = req.body;
        let data = {
            productName: productName,
            productCategoryID: productCategoryID,
            supplierID: supplierID,
            imgProduct: imgProduct,
            description: description,
            quantity: quantity,
            costPrice: costPrice,
            price: price,
        };

        await modelProduct.update(data, productID);
        res.redirect('/product/edit');
    }

    async deleteProduct(req, res) {
        if (!req.session.User) {
            req.session.back = `/product/delete`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listProducts = await modelProduct.getListProducts();
            let category = await modelProduct.getListCategories();
            res.render('product/delete-product', {listProducts: listProducts, category: category, user: user});
        }
    }

    async deleteByCategory(req, res) {
        if (!req.session.User) {
            req.session.back = `/product/delete`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let categoryID = req.params.productCategoryID;
            let listProducts = await modelProduct.getListProductsByCategory(categoryID);
            let category = await modelProduct.getListCategories();
            res.render('product/delete-product', {listProducts: listProducts, category: category, user: user});
        }
    }

    async delete(req, res) {
        let productID = req.params.productID;
        await modelProduct.delete(productID);
        res.redirect('/product');
    }
}

module.exports = new ProductController();
