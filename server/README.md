# myhair-backend
back-end do app my hair


# primeiros comandos
yarn init
yarn add express bcrypt jsonwebtoken mysql sequelize 
yarn add sequelize-cli -D
yarn add nodemon -D

# criar o script no package json

"scripts": {
    "dev": "nodemon app.js"
  },

# criando as migrations
yarn sequelize migration:create --name=usuario
yarn sequelize db:migrate





