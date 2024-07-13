const modelOrder = require('../models/model_order');
const db = require('../models/database');

class OrderController {
    async listOrders(req, res) {
        if (!req.session.User) {
            req.session.back = `/order`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listOrders = await modelOrder.getListOrders();
            listOrders.forEach((item) => {
                item.OrderDate = item.OrderDate.toLocaleString();
            });
            res.render('order/list-orders', {listOrders: listOrders, user: user});
        }
    }

    async listOrdersUnconfirmed(req, res) {
        if (!req.session.User) {
            req.session.back = `/order/unconfimred`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listOrders = await modelOrder.getListOrdersUnconfirmed();
            listOrders.forEach((item) => {
                item.OrderDate = item.OrderDate.toLocaleString();
            });
            res.render('order/list-unconfirmed', {listOrders: listOrders, user: user});
        }
    }

    async confirm(req, res) {
        let purchaseOrderID = req.params.purchaseOrderID;
        await modelOrder.confirm(purchaseOrderID);
        res.redirect('/order/unconfimred');
    }

    async listOrdersDelivery(req, res) {
        if (!req.session.User) {
            req.session.back = `/order/delivery`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listOrders = await modelOrder.getListOrdersDelivery();
            listOrders.forEach((item) => {
                item.OrderDate = item.OrderDate.toLocaleString();
            });
            res.render('order/list-delivery', {listOrders: listOrders, user: user});
        }
    }

    async deliver(req, res) {
        let purchaseOrderID = req.params.purchaseOrderID;
        await modelOrder.deliver(purchaseOrderID);
        res.redirect('/order/delivery');
    }

    async listOrdersDelivered(req, res) {
        if (!req.session.User) {
            req.session.back = `/order/delivered`;
            res.redirect('/sign-in');
        } else {
            let user = req.session.User;
            let listOrders = await modelOrder.getListOrdersDelivered();
            listOrders.forEach((item) => {
                item.OrderDate = item.OrderDate.toLocaleString();
            });
            res.render('order/list-delivered', {listOrders: listOrders, user: user});
        }
    }

    async detail(req, res) {
        let user = req.session.User;
        let purchaseOrderID = req.params.purchaseOrderID;
        let purchaseOrderInfo = await modelOrder.getPurchaseOrderDetail(purchaseOrderID);
        let purchaseOrderDetail = purchaseOrderInfo.purchaseOrderDetails;
        let total = purchaseOrderInfo.Total;
        res.render('order/detail', {purchaseOrderID: purchaseOrderID, purchaseOrderDetail: purchaseOrderDetail, total: total, user: user});
    }
}

module.exports = new OrderController();
