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
			let productDetail = products.filter(function (detail) {
				return detail.id == req.params.id
			})
			res.render("detail", {
				productDetail: productDetail[0]
			})
		},

		// Create - Form to create
		create: (req, res) => {
			res.render("product-create-form")
		},

		// Create -  Method to store
		store: (req, res) => {
			let newProduct = {
				id: products.length + 1,
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				description: req.body.description
			};

			let arrayNewProduct = products;
			arrayNewProduct.push(newProduct);

			let arrayNewProductJson = JSON.stringify(arrayNewProduct)
			fs.writeFileSync(productsFilePath, arrayNewProductJson)
			res.redirect("/")
		},

		// Update - Form to edit
		edit: (req, res) => {
			let productDetail = products.filter(function (detail) {
				return detail.id == req.params.id
			})

			res.render("product-edit-form", { productDetail: productDetail[0]
			})
		},
		// Update - Method to update
		update: (req, res) => {

			let productEdited = {}
			productEdited = products.map(function (productElement) {
				if (productElement.id == req.params.id) {
					productElement.name = req.body.name
					productElement.price = req.body.price
					productElement.discount = req.body.discount
					productElement.category = req.body.category
					productElement.description = req.body.description
					productElement.image = req.body.image
				}
				return productElement
			})

			productEdited = JSON.stringify(productEdited)
			fs.writeFileSync(productsFilePath, productEdited)
			res.redirect('/')
		},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let productDeleted = {}
			productDeleted = products.filter(function (productElement) {
				if (productElement.id != req.params.id) {
					return true
				}
				else {
					return false
				}
			})

			productDeleted = JSON.stringify(productDeleted)
			fs.writeFileSync(productsFilePath, productDeleted)
			res.redirect('/')
		},
};

module.exports = controller;