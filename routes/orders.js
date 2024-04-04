import express from 'express';
import Order from '../models/order.js';

const router = express.Router();

router.get('/orders/:username', async (req, res) => {
    try {
        await Order.find({user: req.params.username}).sort({date: -1})
                    .then(orders => {
                        if (orders.length > 0) {
                            res.json(orders)
                        }
                    })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
})

router.post('/orders', async (req, res) => {
    try {
        const {date, name, price, user} = req.body
        if (name == null || name === "" || price == null || price === "" || date == null || date === "" || user == null || user === "") {
            res.json("Error: Please enter all the fields")
        } else {
            const newOrder = new Order({
                date,
                name,
                price,
                user
            })
            newOrder.save()
                .then(() => res.json("New order added!"))
                .catch((err) => res.status(400).json("Error: " + err));
        }
    } catch (err) {
        res.status(500).json('Error: Internal Server Error')
    }
})

export default router;