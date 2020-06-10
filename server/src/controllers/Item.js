const Item = require('../models/Item');


module.exports = {

    async index(request, response){
        items = await Item.findAll();

        const serialized = items.map(item => {
            return { 
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}` 
            }
        });


        return response.json(serialized);
    }, 



}