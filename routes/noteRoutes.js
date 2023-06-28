const express = require('express');
const router = express.Router();
const NotesController = require('../Controler/NotesControler')
const verifyJWT =require('../middleway/verifyJWT')

router.use(verifyJWT)

router.route('/')
      .get()
      .post(NotesController.createNote)
      .put(NotesController.UpdateNote)
      .delete()

module.exports = router