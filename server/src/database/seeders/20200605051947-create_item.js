'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

	return queryInterface.bulkInsert('item', [
		{
			title: 'Lampadas',
			image: 'lampadas.svg'
		},
		{
			title: 'Pilhas e Baterias',
			image: 'baterias.svg'
		},
		{
			title: 'Papéis e Papelão',
			image: 'papeis-papelao.svg'
		},
		{
			title: 'Resíduos Eletrônicos',
			image: 'eletronicos.svg'
		},
		{
			title: 'Resíduos Orgânicos',
			image: 'organicos.svg'
		},
		{
			title: 'Óleo de cozinha',
			image: 'oleo.svg'
		}
	], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   	return queryInterface.bulkDelete('item', null, {});
  }
};
