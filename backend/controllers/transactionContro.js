// 
const TransactionModel = require("../models/transactionModel");
const moment = require('moment');
const getAllTransaction = async (req, res) => {
  try {
    const { frequency } = req.body;
    const Transactions = await TransactionModel.find({
    
      date: {
        $gt: moment().subtract(Number(frequency), "d").toDate(),
      },
      
      userid: req.body.userid,
      
    });

    res.status(200).json(Transactions);
  } catch (error) {
    console.error("Error in getAllTransaction:", error);
    res.status(500).json(error);
  }
};

// const getAllTransaction = async (req, res) => {
//   try {
//     const { userid, frequency, selectedDate } = req.body;

//     let query = { userid }; // Initial query with user ID

//     // Adjust query based on frequency
//     if (frequency !== "custom") {
//       query.date = { $gt: moment().subtract(Number(frequency), "d").toDate() };
//     } else {
//       // Handle custom frequency with selected date range
//       if (selectedDate && selectedDate.length === 2) {
//         query.date = { $gte: selectedDate[0], $lte: selectedDate[1] };
//       } else {
//         throw new Error("Invalid custom date range");
//       }
//     }

//     // Fetch transactions based on the constructed query
//     const transactions = await TransactionModel.find(query);

//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error("Error in getAllTransaction:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const deleteTransaction = async (req, res) => {
  try {
    await TransactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.error("Error in deleteTransaction:", error);
    res.status(500).json(error);
  }
};

// const editTransaction = async (req, res) => {
//   try {
//     await TransactionModel.findOneAndUpdate(
//       { _id: req.body.transactionId },
//       req.body.payload
//     );
//     res.status(200).send("Edit Successfully");
//   } catch (error) {
//     console.error("Error in editTransaction:", error);
//     res.status(500).json(error);
//   }
// };

const editTransaction = async (req, res) => {
  try {
    const { transactionId, payload } = req.body;
    await TransactionModel.findOneAndUpdate(
      { _id: transactionId },
      payload
    );
    res.status(200).send("Edit Successfully");
  } catch (error) {
    console.error("Error in editTransaction:", error);
    res.status(500).json({ error: "Failed to edit transaction" });
  }
};


const addTransaction = async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.error("Error in addTransaction:", error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
