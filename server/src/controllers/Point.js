const Point = require('../models/Point');
const Point_Item = require('../models/Point_Item');

const database = require('../database');
const { QueryTypes } = require('sequelize');

module.exports = {

    async index(request, response){

        const { city, uf, items } = request.query;
        
        const parsedITems = String(items)
        .split(',')
        .map(item => Number(item.trim()));
        
        const points = await database.query(
            `SELECT DISTINCT point.* FROM point INNER JOIN point_item ON point_item.point_id = point.id WHERE point.city = "${city}" AND point.uf = "${uf}" AND point_item.item_id IN (${parsedITems})`,
            { type: QueryTypes.SELECT}
        );

        if(points && points.length > 0){
            return response.json(points);
        }

        return response.json("nada encontrado");
    }, 

    async pointitem(request, response){
        point_item = await Point_Item.findAll();
        return response.json(point_item);
    }, 

    async show(request, response){

        const { id } = request.params;

        point = await Point.findOne({
            where: {
                id
            },
            include: { association: 'item'}
        });
        
        if(point)
        {
            return response.json(point);
        }

        return response.json({ erro: "Não encontrao."});

        
    }, 


    async point_create(request, response){

         const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
         } = request.body;
         

         const point = await Point.create({
            name,
            image: request.file.filename,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
         });



        point_items = items.split(',')
        .map(item => Number(item.trim())) 
        .map(item_id => {
            return {
                item_id,
                point_id: point.id
            }
         });
        
        await Point_Item.bulkCreate(point_items);
        return response.json(point);
    }, 




}