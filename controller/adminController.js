const bcrypt = require("bcryptjs")

const Admin = require("../model/admin")
const Guest = require("../model/guest")

class App {
    getIndex = (req, res, next) => {
        res.render('index', {title : "Home Page"})
    }

    getAdmin = async(req, res, next) => {
        try{
            const admin = await Admin.find({})
            console.log(admin)
    
                res.render("admin-page", 
                {title: "Admin Page", 
                admin: admin || []
            })
        }catch(err){
            res.render("/", {error: err})
        }
    }
     
    postAdmin = async(req, res, next) => {
        try{
            const admin = await Admin.find({})

            if(admin.length === 0) {
                const{firstName, lastName, email, number, gender} = req.body
            
                const adminPass = await bcrypt.hash(email , 10)
                
                console.log("great")

                const realAdmin = await new Admin ({
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    password : adminPass,
                    number : number,
                    gender : gender,
                })
                console.log(realAdmin)
                const saveAdmin = await realAdmin.save()
                if ( saveAdmin ) { 
                    //res.send("Test")
                    req.session.email = saveAdmin.email
                    let redirectUrl = "/admin/guest"
                    res.redirect(303, redirectUrl)
                    return 
                }else{
                    throw{
                        message : "Unable to save you as the admin"
                    }
                }
            }else {
                const {email, password} = req.body
                console.log(email, password) 
                let registeredAdmin = await Admin.findOne({email: email}) 
                //console.log(registeredAdmin)
                if(registeredAdmin){
                    let realAdmin = await bcrypt.compare(password , registeredAdmin.password)
                    console.log(realAdmin)
                    if (realAdmin) {
                        req.session.email = registeredAdmin.email
                        res.redirect(303 , '/admin/guest')
                    }else {
                        res.render('index' , { title : 'Invalid Credentials'})
                    }
                }else {
                    res.render('index' , { title : 'User not found'})
                } 
            }
        }catch(error){
            // res.render("error", {error: "Invalid Credentials"})
            res.json({mes:error.message})
        }
    }

    getGuest = async(req , res , next) => {
        if(req.session.email){
            const admin = await Admin.findOne({email : req.session.email})
            res.render('guest' , { title  : "Guests", admin : admin })
        }else{
            res.redirect(303, '/admin')
        }
    }

    postGuest = async(req, res, next) => {
        try{
            if(req.session.email) {
                const{firstName, lastName, tableNumber, extraGuest} = req.body
                const checkGuest = await Guest.findOne({firstName : firstName , lastName : lastName})
                if(!checkGuest) {
                    const realGuest = await new Guest ({
                        firstName : firstName,
                        lastName : lastName,
                        tableNumber : tableNumber,
                        extraGuest : extraGuest
                    })
                    const saveGuest = await realGuest.save()
                    if ( saveGuest ) { 
                        let redirectUrl = "/admin/all-guests"
                        res.redirect(303, redirectUrl)
                        return 
                    }else{
                        throw{
                            message : "Unable to save guest"
                        }
                    }
                }else{
                    res.render("guest", {message : "You already saved this Guest"})
                }
            }
        }catch(error) {
            res.json({mes:error.message}) 
        }
    }

    getAllGuests = async (req , res , next) => {
        try{ 
            if(req.session.email){
                const admin = await Admin.findOne({email : req.session.email})
                const guest= await Guest.find()
                if(guest.length != 0){
                    res.render("all-guests" , {
                        guests : guest ,
                        title : "Guests",
                        admin : admin,
                    })
                    return 
                }
                else{
                    res.render("all-guests", {
                        noGuest : "No Guest has been invited." ,
                        title : "Guests",
                        admin : admin,
                    })
                }
            }else{
                const redirectUrl = "/admin/guest"
                res.redirect(303, redirectUrl)
            }
        }catch(err){
            res.render("error-page", {error: err})
        }
    }

    getGuestUpdate = async(req, res, next) => {
        try{
            if(req.session.email){
                const admin = await Admin.findOne({email : req.session.email})
                const guest = await Guest.findOne({_id: req.params.guestId})
                if(guest){
                    res.render("guest-update", {title : "Update your Guest", guestDB: guest, admin: admin})
                }else{
                    throw{
                        message: "Guest not found"
                    }
                }
            }else{
                const redirectUrl = "/admin/all-guests"
                res.redirect(303, redirectUrl)
            }
        }catch(err){
            res.send(err.message)
        }
    }

    updateGuest = async(req, res, next) => {
        try{
            if(req.session.email) {
                const admin = await Admin.findOne({email : req.session.email})
                const guest= await Guest.findOne({_id : req.params.guestId})
                if(guest){
                    Guest.findByIdAndUpdate(req.params.guestId, {
                       firstName : req.body.firstName,
                       lastName : req.body.lastName,
                       tableNumber : req.body.tableNumber,
                       extraGuest : req.body.extraGuest 
                    }, {new : true, useFindAndModify : false}, (err, item) => {
                        if(err){
                            res.status(500)
                            return
                        }else {
                            let redirectUrl = "/admin/all-guests"
                            res.redirect(303, redirectUrl)
                        }
                    })
                }else {
                    throw {
                        message : "This Guest is not found"
                    }
                }
            }else{
                res.send(`You can't access this page.`)
            }
        }catch(error) {
            res.send(error.message)
        }
    }
    deleteGuest = async (req, res, next) => {
		if(req.session.email){
			try{
                let guest = await Guest.findById(req.params.guestId)
                if (guest) {
                    let delGuest = await Guest.findByIdAndRemove(guest._id)
                    if(delGuest){
                        res.redirect(303, "/admin/all-guests")
                    }else{
                        throw{
                            status : 500,
                            message : "Internal server error"
                        }
                    }
                }else{
                    throw{
                        status : 400,
                        message : "Something went wrong with this request"
                    }
                } 
			}catch(err){
				res.json(err.message)
			}
		}else{
			res.send(`You can't access this page.`)
		}
		
	}
}

const returnApp = new App()

module.exports = returnApp 