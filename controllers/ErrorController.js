exports.Get404 = (req,res,next) =>{
    res.status(404).render("error",{pageTitle:"Not found"});
}