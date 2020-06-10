module.exports = {

    //para uso local
    dialect: "mariadb",
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'ecoleta',

    // em produção
    //dialect: "mysql",
    //host: 'mysql669.umbler.com',
    //username: 'databasemyhair',
    //password: 'databasemyhair2020',  
    //database: 'databasemyhair',

    
    define: {
        timestamps: true,
    }
}