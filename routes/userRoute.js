const express = require('express');
const router = express.Router();
const UserControler = require('../Controler/UserControler')
const verifyJWT = require('../middleway/verifyJWT')

router.use(verifyJWT)

router.route('/')
      .get(UserControler.getAllUser)
      .post(UserControler.createNewUser)
      .put(UserControler.updateUser)
      .delete(UserControler.DeleteUser)

module.exports = router