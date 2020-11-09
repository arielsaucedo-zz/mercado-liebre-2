const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productDetail = products.filter (function (detail) {
			return detail.id == req.params.id
		})
		res.render("detail",{productDetail: productDetail})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productDetail = products.filter (function (detail) {
			return detail.id == req.params.id
		})
		res.render("product-edit-form", {productDetail: productDetail})
	},
	// Update - Method to update
	update: (req, res) => {
		res.send ("Aqui podras editar tus productos")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.send ("Aqui podras borrar tus productos")
	}
};

module.exports = controller;