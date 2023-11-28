const projects=require('../Models/projectSchema')
// add project
exports.addprojects= async (req,res)=>{
    console.log("inside add project function");
    const userId=req.payload
    const projectImage=req.file.filename
    
    const{title,languages,overview,github,website}=req.body
    // console.log(`${title},${languages},${overview},${github},${website},${projectImage},${userId}`);
    try{
        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already exist!! Upload another")
        }else{
            const newProject=new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json(`request failed,error:${err}`)
    }
   
    
}

// getuserprojects
exports.alluserProjects=async(req,res)=>{
    const userId=req.payload
    try{
       const  userProjects= await projects.find({userId})
       res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err) 
    }
}
// allprojects
exports.getallProjects=async(req,res)=>{
    const searchKey=req.query.search
    const query={
        languages:{$regex:searchKey,$options:"i"}
    }
    try{
       const  projectDetails= await projects.find(query)
       res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err) 
    }
}
// gethomeProjects
exports.getHomeProjects=async(req,res)=>{
    try{
        const  homeprojects= await projects.find().limit(3)
        res.status(200).json(homeprojects)
     }catch(err){
         res.status(401).json(err) 
     }
}
// edit project
exports.editProjectController=async(req,res)=>{
    // get project id
    const {id}=req.params
    const userId=req.payload
    const{title,languages,overview,github,website,projectImage}=req.body
    const uploadProjectImage=req.file?req.file.filename:projectImage
    try{
      const updateProject=await projects.findByIdAndUpdate({_id:id},{
        title,languages,overview,github,website,projectImage:uploadProjectImage,userId
      },{new:true})
      await updateProject.save()
      res.status(200).json(updateProject)
    }catch(err){
      res.status(401).json(err)
    }
    }
    // deleteproject
    exports.deleteProjectController=async(req,res)=>{
        // get project  details
        const {id}=req.params
        try{
             const removeProject=await projects.findByIdAndDelete({_id:id})
             res.status(200).json(removeProject)
        }catch(err){
            res.status(401).json(err)
        }
    }