// import module
const router = require('express').Router()

// import verifier
// const { verify } = require ('../helpers/jwt')

// import our controllers
const { account, profile, vehicles, rating, history, payment } = require('../controllers')

// apply our controllers
// account : edit username or password
router.get('/account/:id', account.getAccountById)
router.patch('/account/edit/username/:id', account.changeUsername)
router.patch('/account/edit/password/:id', account.changePassword)

// profile
router.get('/profile/:id', profile.getUserProfileByID)
router.patch('/profile/edit/:id', profile.editUserProfile)
router.patch('/profile/upload/:id', profile.uploadImageProfile)

// vehicle
router.get('/vehilce', vehicles.getUserVehicle)
router.patch('/vehicle', vehicles.editVehicleData)

// rating
router.get('/rating/:id', rating.getRatingByUser)
router.post('/rating', rating.addRating)

// history
router.get('/history/:id', history.getHistoryByUser)

// wallet
router.get('/wallet/saldo/:id', payment.getSaldo)
router.patch('/wallet/topup/:id', payment.topUpSaldo)
// router.patch('/wallet/pay/:id')

// parking : enter and leave including payment transactions

// export our routers
module.exports = router