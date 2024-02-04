import express from 'express'
import ExpressFormidable from 'express-formidable'
import { createExpenseController, getOthersExpensesController, getOwnExpensesController} from '../controllers/expenseRecordController.js'
import { checkAdminAuth, userAuthentication } from '../middlewares/auth-middleware.js'

const router=express.Router()

//protected
router.post('/create-expense',userAuthentication, ExpressFormidable(),createExpenseController)
router.get('/get-expenses',userAuthentication,getOwnExpensesController)
router.get('/get-expenses/:pid',checkAdminAuth,getOthersExpensesController)
// router.post('/delete-expense/:pid',deleteExpenseController)

export default router

