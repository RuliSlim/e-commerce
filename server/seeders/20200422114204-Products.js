'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Frame Arms Girl - STYLET XF-3',
        image: 'https://www.1999.co.jp/itbig67/10670640a9.jpg',
        price: 950750,
        stock: 20,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - Ludens',
        image: 'https://www.1999.co.jp/itbig64/10642143a.jpg',
        price: 1500000,
        stock: 50,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - RUFUS',
        image: 'https://www.1999.co.jp/itbig65/10657727a12.jpg',
        price: 1700000,
        stock: 30,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - STYLET',
        image: 'https://www.1999.co.jp/itbig62/10628441p.jpg',
        price: 799999,
        stock: 50,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - Zelfikar',
        image: 'https://www.1999.co.jp/itbig62/10627020p.jpg',
        price: 999999,
        stock: 10,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - Gourai',
        image: 'https://www.1999.co.jp/itbig62/10624866p.jpg',
        price: 129999,
        stock: 50,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - JINRAI',
        image: 'https://www.1999.co.jp/itbig58/10586498p.jpg',
        price: 169799,
        stock: 20,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - GAOGAIGAR',
        image: 'https://www.1999.co.jp/itbig58/10583252p.jpg',
        price: 159999,
        stock: 40,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - HATSUNE MIKU',
        image: 'https://www.1999.co.jp/itbig52/10527787p.jpg',
        price: 249999,
        stock: 10,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - BAIHU',
        image: 'https://www.1999.co.jp/itbig49/10493106p.jpg',
        price: 219999,
        stock: 30,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - RUFUS',
        image: 'https://www.1999.co.jp/itbig46/10469251p.jpg',
        price: 139999,
        stock: 20,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frame Arms Girl - ATER',
        image: 'https://www.1999.co.jp/itbig44/10446006p.jpg',
        price: 179999,
        stock: 30,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Products', {});
  }
};