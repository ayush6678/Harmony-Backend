const router=require("express").Router();
const passport=require("passport");

router.get("/login/success",(req,res)=>{
    if(req.user)
    {
        res.status(200).json(
            {
                error:false,
                messsage:"Successfully Logged In",
                user:req.user,
            }
        )

    }
    else
    {
        res.status(403).json({error:true,messsage:"Not Authorized"});
    }
})

router.get("/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        messsage:"Login Failure",
    })
})

router.get(
    "/google",
    passport.authenticate("google",{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:"/login/failed",
    })
)
router.get("/google",passport.authenticate("google",["profile","email"]));
router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect(process.env.CLIENT_URL);
})

module.exports=router;
