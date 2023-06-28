const express = require('express')
const router  = express.Router()
const authControler = require('../Controler/authController')
const loginLimiter = require('../middleway/loginLimit') 
const verifyJWT = require('../middleway/verifyJWT')

router.use(verifyJWT)

router.route('/login')
       .post(loginLimiter,authControler.login)

router.route('/refresh')
       .get(authControler.refresh)

router.route('/logout')
      .post(authControler.logout)

module.exports=router