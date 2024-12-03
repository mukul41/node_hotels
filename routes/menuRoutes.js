const express = require('express');
const router = express.Router();
const Dishes = require('./../models/menuItems')

router.get('/', async(req,res)=>{
    try {
        const data = await Dishes.find();
        console.log('data fetched');
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: 'Error adding the dish', error });

    }
})
router.post('/', async (req, res) => {
    try {
        const { name, price, taste, is_drink, ingredients, num_sales } = req.body;

        // Create a new user document
        const newItem = new Dishes({
            name,
            price,
            taste,
            is_drink, 
            ingredients,
            num_sales,
        });

        await newItem.save(); // Save the dish to the database
        res.status(201).json(newItem); // Send response back with the dish added
    } catch (error) {
        res.status(400).json({ message: 'Error adding the dish', error });
    }
});
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;

        // Check if worktype is one of the valid options
        if (tasteType ==='sour' || tasteType === 'sweet' || tasteType === 'spicy') {
            const response = await Dishes.find({ taste: tasteType });
            console.log('data fetched');
            res.status(200).json(response);  // Send success response
        } else {
            console.log('invalid taste');
            res.status(400).json({ message: 'Invalid taste' });  // Send error response for invalid worktype
        }
    } catch (error) {
        res.status(500).json({ message: 'We cannot find the dishes with this taste', error });  // Send server error response
    }
});




module.exports = router;