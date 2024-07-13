const modelTopSales = require('../models/model_topsales');
const modelProduct = require('../models/model_product');
const db = require('../models/database');

class TopSalesController {
    async getTopSales(req, res) {
        if (!req.session.User) {
            req.session.back = `/topsales`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listTopSales = await modelTopSales.getTopSales();
            let category = await modelProduct.getListCategories();
            res.render('top sales/topsales', {listTopSales: listTopSales, category: category, user: user});
        }
    }

    async getTopSalesByCategory(req, res) {
        if (!req.session.User) {
            req.session.back = `/topsales`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let categoryID = req.params.productCategoryID;
            let listTopSales = await modelTopSales.getTopSalesByCategory(categoryID);
            let category = await modelProduct.getListCategories();
            res.render('top sales/topsales', {listTopSales: listTopSales, category: category, user: user});
        }
    }
}

module.exports = new TopSalesController();
