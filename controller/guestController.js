"use strict"

const guest = require("../model/guest")
const Guest = require("../model/guest")

class App {
    getGuestLogin = (req, res, next) => {
        res.render('guest-login', {title : "Guest"})
    }

    postGuestLogin = async(req, res, next) => {
        try{
            const{firstName, lastName} = req.body
            let registeredGuest = await Guest.findOne({firstName : firstName, lastName : lastName, hasEntered : false})
            if(registeredGuest){
                console.log(registeredGuest)
                Guest.findOneAndUpdate({firstName : firstName}, {
                    hasEntered : true
                }, {new : true, useAndModify : false}, (err, item) => {
                    if(err){
                        res.status(500)
                        return
                    }else{0
                        let redirectUrl = "/guest/welcome/" + registeredGuest._id
                        res.redirect(redirectUrl)
                        return
                    }
                })
            }else{
                res.render("guest-login", {title: "Guest", noEntry : "This Guest is already inside the venue"})
            }
        }catch(error){
            res.json({mes:error.message})
        }
    }

    getWelcomed = async(req, res, next) => {
        const guest = await Guest.findOne({_id : req.params.guestId})
        if(guest){
            res.render("Congrats", {title : "Welcome", guest : guest})
        }
    }
}

const returnApp = new App()

module.exports = returnApp 