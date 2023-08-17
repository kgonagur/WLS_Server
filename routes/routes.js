const express =require('express');
const rpi = require('../models/rpi');
const router =express.Router()
const rpitemplate=require('../models/rpi')
const ola = require('../olaSetlight.js');

async function setLight(rpis) {
    try {
        console.log('inside setlight')
      console.log(rpis);
    } catch(err) {
      console.log(err.message)
    }
};

//This API is used to create an entry in the database for the registered rpi
router.post('/', async(req,res)=>{
    const rpi = new rpitemplate({
        
    friendlyName:req.body.friendlyName,
    ipAddress:req.body.ipAddress,
    fixtures:req.body.fixtures,
    fixtureCount:req.body.fixtureCount
})
    try{
        console.log("reached post");
  const savedRpi=await rpi.save();
  res.json(savedRpi);
    }catch(err){
        res.json({message:err});
    }
});

//get all rpis
//http://localhost:3500/rpis/
router.get('/',async(req,res)=>{
    console.log('reached get');
    try{
        const rpis = await rpi.find();
        res.json(rpis);
    } catch(err){
        res.json({message:err});
    }
});
//get specific rpis
//http://localhost:3500/rpis/63920eeb95e7dc1757b01b61/
router.get('/:postId',async(req,res)=>{
    console.log('reached specific get');
    try{
        console.log(req.params.postId);
        const rpis = await rpi.findById(req.params.postId);
        res.json(rpis);
    } catch(err){
        console.log(err)
        res.json({message:err});
    }
});


//delete rpis
router.delete('/:postId',async(req,res)=>{
    try{
        const removedPost = await rpi.remove({_id:req.params.postId});
        res.json(removedPost);
    } catch(err){
        res.json({message:err});
    }
});

//update The color values of fixtures associated with each raspberry pi

router.patch('/:postId/fixtures',async(req,res)=>{
    try{
        console.log("reachedUpdate");
        const raspPi = await rpi.findById(req.params.postId);
        console.log(raspPi.fixtures)
        raspPi.fixtures=(req.body);
        ola.setLight(raspPi)
        const updatedRpi = await rpi.updateOne({_id:req.params.postId},{$set:{fixtures: req.body}});
        res.json(updatedRpi);
        console.log('update is succesful')
        console.log(updatedRpi);
    } catch(err){
        console.log(err)
        res.json({message:err});
    }
});


module.exports=router