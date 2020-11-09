const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let visitas = products.filter(function(visitas) {
			return visitas.category == "visited"
		})

	/* 	visitas.forEach(product => {
			product["finalPrice"] = toThousand(product.price - (product.price * product.discount / 100)) 
		}) */

		let inSale = products.filter(function(inSale) {
			return inSale.category == "in-sale"
		})

		inSale.forEach(product => {
			product["finalPrice"] = toThousand(product.price)
		})

		res.render("index", {visitas: visitas, inSale: inSale})
	},

	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
