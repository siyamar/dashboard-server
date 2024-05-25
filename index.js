const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dashboard"
})


app.get("/users", (req, res) =>{
    const sql = "SELECT * FROM user_info";
    db.query(sql, (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data)
    })
})

app.post("/users", (req, res) => {

    const email = req.body.email;
    console.log(email)

    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM user_info WHERE email = ?";
    db.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // If email already exists, return an error
        if (result.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }
    

    const values = [
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.role
    ];
    console.log(values)

    const sql = "INSERT INTO user_info (email, password, name, role) VALUES (?, ?, ?, ?)";

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
})

app.get("/orders", (req, res) =>{
    const sql = "SELECT * FROM tailor_management";
    db.query(sql, (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data)
    })
})

// app.post("/orders", (req, res)=>{
//     const sql = "INSERT INTO tailor_management (total_order, total_item, total_transfer, total_receive, total_payment_amount, total_customer, avg_cost_per_order, avg_profit_per_order, avg_revenue_per_order, total_employee_payment, create_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//     const values = [
//         req.body.totalOrder,
//         req.body.totalItem,
//         req.body.totalTransfer,
//         req.body.totalReceive,
//         req.body.totalPaymentAmount,
//         req.body.totalCustomer,
//         req.body.averageCostPerOrder,
//         req.body.averageProfitPerOrder,
//         req.body.averageRevenewPerOrder,
//         req.body.totalEmployeePayment,
//         req.body.createBy,
//     ]
//     console.log(values)
//     db.query (sql, [values], (err, data)=>{
//         if(err) return res.json( err);
//         return res.json(data);
//     })
// })
app.post("/orders", (req, res) => {
    const values = [
        req.body.totalOrder,
        req.body.totalItem,
        req.body.totalTransfer,
        req.body.totalReceive,
        req.body.totalPaymentAmount,
        req.body.totalCustomer,
        req.body.averageCostPerOrder,
        req.body.averageProfitPerOrder,
        req.body.averageRevenewPerOrder,
        req.body.totalEmployeePayment,
        req.body.createBy,
    ];

    const sql = "INSERT INTO tailor_management (total_order, total_item, total_transfer, total_receive, total_payment_amount, total_customer, avg_cost_per_order, avg_profit_per_order, total_revenew_amount, total_employee_payment, create_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// app.post('/orders', (req, res)=>{
//     const order = req.body
//     db.collection('tailor_management')
//     .insertOne(order)
//     .then(result=>{
//         res.status(201).json(result)
//     })
//     .catch(err=>{
//         res.status(500).json({err:'Could not create a new document'})
//     })
// })


app.listen(port, ()=>{
    console.log(`Dashboard is running port ${port}`)
})