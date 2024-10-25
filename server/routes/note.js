import express from 'express'
import Note from  '../models/Note.js'
import middleware from '../middlware/middleware.js';

const router=express.Router()

router.post('/add',middleware,async(req,res)=>{
    try{
        const { title,description}= req.body;
       

        const newNote = new Note({
          title,
          description,
          userId: req.user.id
        });


        await newNote.save()

        return res.status(200).json({success:true,message:"Note Created Successfully"})

    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false,message:"Error in Adding Note"})


    }
})


router.get('/', async (req,res)=>{
    try{
        const notes =await Note.find()
        return res.status(200).json({success:true,notes})
    }catch(error){
        return res.status(500).json({success:false,message:"can't retrive notes"})
    }
})


router.put('/:id', middleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        note.title = title;
        note.description = description;

        await note.save();

        return res.status(200).json({ success: true, message: 'Note updated successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Error in updating note' });
    }
});


export default router;
