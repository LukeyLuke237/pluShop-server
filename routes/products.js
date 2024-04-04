import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get('/products', (req, res) => {
    try {
        Product.find()
            .then(products => {
                if (products.length === 0) {
                    res.json("No products in the database")
                } else {
                    res.json(products)
                }
            })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}) 

router.get('/products/:id', async (req, res) => {    //get one user by username
    try {
        await Product.findById(req.params.id)
                .then(product => {
                    if (product == null) {
                        res.json('No products with that id')
                    } else {
                        res.json(product)
                    }
                })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}) 

router.delete('/products/:id', async (req, res) => {
    try {
        await Product.findById(req.params.id)
                .then(product => {
                    if (product == null) {
                        res.json('No product with that id')
                    } else {
                        Product.findByIdAndDelete(req.params.id)
                            .then(() => {
                                res.json('Product Deleted')
                            })
                    }
                })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
})

router.post('/products', async (req, res) => {
    try {
        const {name, price, image} = req.body
        if (name == null || name === "" || price == null || price === "" || image == null || image === "") {
            res.json("Please enter all the fields")
        } else {
            const newProduct = new Product({
                name,
                price,
                image
            })
            newProduct.save()
                .then(() => res.json("New product added!"))
                .catch((err) => res.status(400).json("Error: " + err));
        }
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
})

export default router;