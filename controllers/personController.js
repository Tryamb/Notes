import personModel from "../models/personModel.js"



export const createPersonContoller= async(req,res)=>{
    try {
       const {name,phone}=req.body
       if(!name){
        return res.status(500).send({message:'Name is required' })
       } 
       const existingPerson=await personModel.findOne({phone})
       if(existingPerson){
        return res.status(200).send({success:false, message:'Person Already exists'})
       }
       
       const person=await new personModel({name,phone}).save()
       res.status(201).send({
        success:true, 
        message:'New Person Added',
        person,
    });
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:'Error in Person'
        })
    }
}

export const updatePersonController= async(req,res)=>{
    try {
       const {name}=req.body
       const {id}=req.params
       const existingPerson=await personModel.findOne({name})
       if(existingPerson){
        return res.status(200).send({success:false, message:'Person Already exists'})
       }
       const person=await personModel.findByIdAndUpdate(
        id,{name},
        {new:true}
        );
       
       res.status(201).send({
        success:true, 
        message:'New Person Added',
        person,
    });
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:`Error while updating Person ${error}`
        })
    }
}
export const personController= async(req,res)=>{
   try {
    const person=await personModel.find({})
    return res.status(200).send({
        success:true, 
        message:'All Persons:',
        person
    }
    );

   } catch (error) {
    res.status(500).send({
        success:false,
        error,
        message:`Error while getting all persons ${error}`
    })
   }
}

export const deletePersonController= async(req,res)=>{
    try {
        const {id}=req.params
        await personModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true, 
            message:'Person deleted successfully',
        }); 
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:`Error while deleting person ${error}`
        })
    }
}


