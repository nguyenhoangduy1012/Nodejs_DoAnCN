const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/upProduct.controller");
const admin = require("../controllers/admin.controller");

const upload = require("../middlewares/uploadImage")


module.exports = function(app) {


    app.post('/admin/add-product',[authJwt.verifyToken, authJwt.isAdmin, upload.array('productImage',4)], controller.upload);

    app.get('/admin/add-product',[authJwt.verifyToken, authJwt.isAdmin], controller.getInput);
    app.get('/admin/product',[authJwt.verifyToken, authJwt.isAdmin], admin.productManagement);
    app.get('/admin/order',[authJwt.verifyToken, authJwt.isAdmin], admin.orderManagement )
    app.delete('/admin/product/:product_id',[authJwt.verifyToken, authJwt.isAdmin],admin.deleteProduct);
    app.post('/admin/product/:product_id',[authJwt.verifyToken, authJwt.isAdmin],admin.changeStock);
    app.post('/admin/order/:order_id',[authJwt.verifyToken, authJwt.isAdmin],admin.updateOrder);
    
}