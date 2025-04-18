// const Sales = require("./Sales");

// MongoDB Aggregation Consider a MongoDB collection named sales with documents
// structured as follows:
// json:
// {
//     _id: ObjectId(...),
//     date: ISODate(2024-06-15T00:00:00Z),
//     store: Store A,
//     items: [
//         {
//             name: "item1",
//             quantity: 5,
//             price: 10.0
//         },
//         {
//             name: "item2",
//             quantity: 3,
//             price: 20.0
//         }


//     ]
// }
// Your task is to write an aggregation pipeline to calculate the total revenue generated by each store
// for each month, along with the average price of items sold. The result should be sorted first by store
// and then by month (in ascending order).
// The expected output should be something like this:
// json:
// [
//     {
//         store: Store A,
//         month: 2024-06,
//         totalRevenue: 230.0,
//         averagePrice: 15.0
//     },
//     {
//         store: Store B,
//         month: 2024-06,
//         totalRevenue: 150.0,
//         averagePrice: 12.5
//     }
// ]

// Solution


// mongoose.connect('mongodb://localhost:27017/transactionDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


app.get('/test-sale-schema', async (req, res) => {
    try {
        let queryResults = await Sales.aggregate([
            {
                $unwind: "$items"
            },
            {
                $project: {
                    store: 1,
                    month: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    revenue: { $multiply: ["$items.quantity", "$items.price"] },
                    totalItemPrice: "$items.price",
                    totalItemQuantity: "$items.quantity"
                }
            },
            {
                $group: {
                    _id: { store: "$store", month: "$month" },
                    totalRevenue: { $sum: "$revenue" },
                    totalQuantity: { $sum: "$totalItemQuantity" },
                    totalPrice: { $sum: { $multiply: ["$totalItemPrice", "$totalItemQuantity"] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    store: "$_id.store",
                    month: "$_id.month",
                    totalRevenue: 1,
                    averagePrice: { $divide: ["$totalPrice", "$totalQuantity"] }
                }
            },
            {
                $sort: { store: 1, month: 1 }
            }
        ])


        return res.status(200).json({
            success: true,
            message: "Query Ran Successfully!",
            data: queryResults
        })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
})

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
