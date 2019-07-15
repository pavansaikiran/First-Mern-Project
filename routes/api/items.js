var express = require('express')
var router = express.Router();
var auth = require('../../middleware/auth')

//bringing in the item model
const Item = require('../../models/Item');

router.get('/',(req,res)=>{
    Item.find()
    .then(items => res.json(items))
})

router.post('/',auth,(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    })
    console.log(req.body)
    newItem.save().then(item => res.json(item));
})

router.delete("/:id",auth,(req,res)=>{
    Item.findById(req.params.id)
    .then(item => item.remove()
    .then(
        ()=> res.send("Item with name " + item["name"] + " has been deleted")
        ))
        .catch(error => res.status(404).send("no item has been found with id : "+req.params.id));
})

module.exports = router;