import express from 'express';
import User from '../models/user.js';

const router = express.Router()

router.get('/users', async (req, res) => {              //get all users (to check duplicate)
    try {
        await User.find()
                .then(users => {
                    if (users.length === 0) {
                        res.json('No user in database')
                    } else {
                        res.json(users)
                    }
                })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}) 

router.get('/users/:username', async (req, res) => {    //get one user by username
    try {
        await User.find({username: req.params.username})
                .then(user => {
                    if (user.length === 0) {
                        res.json('No user with such name in database')
                    } else {
                        res.json(user)
                    }
                })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}) 

router.post('/users', async (req, res) => {            //add a new user
    try {
        const {username, password} = req.body
        if (username == null || username === "" || password == null || password === "") {
            res.json({"error": "Please enter all the fields"})
        } else {
            User.find()
                .then(users => {
                    users.forEach(user => {
                        if (user.username === username) {
                            res.json({"error": "This user already exists"})
                        }
                    });
                })
            
            const newUser = new User({
                username,
                password
            })
            newUser.save()
                .then(() => res.json("New user added!"))
                .catch((err) => res.status(400).json("Error: " + err));
        }
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            res.status(200).send(user);
        }
        else {
            res.status(401).send({ 'error': 'Unauthorized User' });
        } 
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
});

export default router;