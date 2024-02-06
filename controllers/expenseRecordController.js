import userExpenseModel from '../models/expenseRecordModel.js'
import personModel from '../models/personModel.js';
export const createExpenseController= async(req,res)=>{
    try {
        const {timestamp,title,description,amount,person_id}=req.body
        const userId=req.user._id
        switch(true){
            case !title:
                return res.status(500).send({error:'Title is Required',})
            case !amount:
                return res.status(500).send({error:'Amount is Required',})
        }
   
        const expense = {
            person: person_id,
            title: title,
            description: description,
            amount: amount,
            timestamp: timestamp
          };
          // Directly insert the expense into the database
          const expenses=await userExpenseModel.updateOne({ userId }, { $push: { expenses: expense } }, { upsert: true });
           res.status(201).send({
            success:true,
            message:'Expense created successfully',
            expenses,
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:`Error in creating expense ${error}`
        })
    }
};

//get all expenses

export const getOthersExpensesController= async(req,res)=>{
        const {pid}=req.params
        try {  
              let expenses =  await userExpenseModel.find({ userId: req.user._id }).
                              select('expenses -_id')
                const hisExpenses = expenses[0].expenses.filter(expense => expense.person == pid);
                expenses = Array.from(hisExpenses, expense => {
                    const { person, ...rest } = expense.toObject();
                    return rest;
                  });
            const detail=await personModel.find({ _id: pid })
                        
            res.status(200).send({
                success:true,
                message:'Expense fetched successfully',
                detail,
                expensesCount:expenses.length,
                expenses,
            })
        } catch (error) {
            res.status(500).send({
                success:false,
                error,
                message:`Error in getting expense ${error}`
            })
        }
}

export const getOwnExpensesController= async(req,res)=>{
    try {
        let expenses =  await userExpenseModel.find({ userId: req.user._id }).
        select('expenses -_id')
const hisExpenses = expenses[0].expenses.filter(expense => expense.person === null);
expenses = Array.from(hisExpenses, expense => {
const { person, ...rest } = expense.toObject();
return rest;
});
  
res.status(200).send({
success:true,
message:'Expense fetched successfully',
expensesCount:expenses.length,
expenses,
})
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:`Error in getting expense ${error}`
        })
    }
}
