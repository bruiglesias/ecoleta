
const express = require('express');
const Item = require("./controllers/Item");
const Point = require("./controllers/Point");
const multer = require("multer");
const multerConfig = require("./multer_config/multer");

const routes = express.Router();
const upload = multer(multerConfig);


routes.get('/', (request, response) => {
    return response.json({msg: "Back-end do aplicativo My Hair - status: Funcionando"});
});


routes.get('/item', Item.index);
routes.get('/point', Point.index);

routes.post('/point/create',upload.single('image'), Point.point_create);

routes.get('/point/show/:id', Point.show);

module.exports = routes;