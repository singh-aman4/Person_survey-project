const express=require('express');

const person=require('./modelP.js');

const router=express.Router();

router.post('/',async (req,res)=>{
    try{
        const data=req.body;
        const newPerson= new person(data);
        const savedPerson=await newPerson.save() //returns a promise
        console.log(`Data Saved successfully while - ${newPerson.name} was ${newPerson.status} `);
        res.status(200).json(savedPerson);
    }catch(error){
        console.log("unable to save the data "+req.body);
        console.error();
        res.status(500).json({error: "some internal server error occured"});
    }
    
    
})
router.get('/',async (req,res)=>{
    try{
        const data= await person.find();
        console.log("Fetched Data successfully");
        res.json({ Adata: data });
        // res.send(data);
    } catch(error){
        console.log("Some error ocurred!");
        res.status(500).send({error:"Some error ocurred!"});
    }
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        const data=await person.find({work:workType});
        console.log("worktype based info fetched! "+workType);
       
        res.status(200).json(data);
    }catch(error){
        console.log("some error ocurred!");
        res.status(500).json({error:"There was error in paramter of API endpoint"});
    }
})

//updation of the documents;

router.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;

        const response=await person.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:'peron not found'});
        }
        console.log("Data updated successfully");
        res.status(200).json(response);

    }catch(err){
        console.log("bhai server kei problem hai sorry");
        res.status(500).json({message:"some internal error"});
    }
})


//deletion of document 

router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const response=await person.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        console.log("data deleted successfully");
        res.status(200).json({msg:"data deleted"});
    }catch(err){
        console.log("Internal error mate!");
        res.status(500).json({err:"Internal error 505"});
    }
})

module.exports=router;
