const express = require('express');
const router = express.Router();
const AdminController = require("../controller/adminController")
const GuestController = require("../controller/guestController")

router.get("/", AdminController.getIndex)
router.get("/admin", AdminController.getAdmin)
router.post("/admin", AdminController.postAdmin)
router.get("/admin/guest", AdminController.getGuest)
router.post("/admin/guest", AdminController.postGuest)
router.get("/admin/all-guests", AdminController.getAllGuests)
router.get("/admin/all-guests/:guestId/update", AdminController.getGuestUpdate)
router.post("/admin/all-guests/:guestId/update", AdminController.updateGuest)
router.get("/admin/all-guests/:guestId/delete", AdminController.deleteGuest)

router.get("/guest/login", GuestController.getGuestLogin)
router.post("/guest/login", GuestController.postGuestLogin)
router.get("/guest/welcome/:guestId", GuestController.getWelcomed)

module.exports = router;
