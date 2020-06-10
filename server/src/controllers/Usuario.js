const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

module.exports = {

    async index(request, response){
        usuarios = await Usuario.findAll();
        return response.json(usuarios);
    }, 



}