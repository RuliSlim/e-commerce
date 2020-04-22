'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Product 1',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 2',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 3',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 4',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 5',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 6',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 7',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 8',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 9',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product 10',
        image: 'https://myanimeshelf.com/upload/dynamic/2019-09/20/af7e66203c015b98493fbcfc43a46d2783eb0780-640x800.jpg',
        price: 29999,
        stock: 50,
        sold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', {});
  }
};