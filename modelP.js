const mongoose=require('mongoose');
const personSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        require:true
    }

},{collection:'people'});  //explicitly defining the collection name, instead of auto naming of collection-plural;


//making a model out of the schema for exporting
const person=mongoose.model('person',personSchema);

module.exports=person;

