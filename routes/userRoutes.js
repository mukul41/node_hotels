const express = require('express');
const router = express.Router();
const User =require('./../models/user')

//to create the person on the database
router.post('/', async (req, res) => {
    try {
        const { name, age, email, password, work } = req.body;

        // Create a new user document
        const newUser = new User({
            name,
            age,
            email,
            password, // Note: Password should be hashed in production for security
            work,
        });

        await newUser.save(); // Save the user to the database
        res.status(201).json(newUser); // Send response back with the created user
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});
// get the detail of all the person
router.get('/', async(req,res)=>{
    try {
        const data = await User.find();
        console.log('data fetched');
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: 'Internal server error', error });
    }
})

// get the person detail on the basis of work type
router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;

        // Check if worktype is one of the valid options
        if (worktype ==='chef' || worktype === 'waiter' || worktype === 'manager') {
            const response = await User.find({ work: worktype });
            console.log('data fetched');
            res.status(200).json(response);  // Send success response
        } else {
            console.log('invalid worktype');
            res.status(400).json({ message: 'Invalid worktype' });  // Send error response for invalid worktype
        }
    } catch (error) {
        res.status(500).json({ message: 'We cannot find the person', error });  // Send server error response
    }
});

router.put('/:id', async(req,res)=>{
    try {
        const UserId = req.params.id;
        const updateUserData = req.body;

        const response =await User.findByIdAndUpdate(UserId,updateUserData,{
            new : true,
            runValidation: true,
        })
        if(!response){
            return res.status(404).json({error:'User not found'});
        }
        console.log('data updated')
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error }); 
    }
})

module.exports=router;