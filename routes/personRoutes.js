import express from 'express'

import { checkAdminAuth } from '../middlewares/auth-middleware.js'
import { createPersonContoller, deletePersonController, personController, updatePersonController } from '../controllers/personController.js'
const router=express.Router()

router.post('/add-person',checkAdminAuth,createPersonContoller)
router.put('/update-person/:id',checkAdminAuth,updatePersonController)
router.get('/all-persons',checkAdminAuth,personController)
router.delete('/delete-person/:id',checkAdminAuth,deletePersonController)

export default router