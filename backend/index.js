import express, { json } from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
//middleware
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    // host: "process.env.DB_URL || localhost",
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
})


app.get("/", (req, res) => {
    res.json("hellow this it the backend")
})

app.get("/books", (req, res) => {
    const allBooks = "SELECT * FROM books"
    db.query(allBooks, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const insBook = "INSERT INTO books (`title`, `desc`, `price` , `cover` ) VALUES (?)"
    // const values = ["title from backend", "desc from postman", "cover pic from postman"]
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(insBook, [values], (err, data) => {
        if (err) return res.send(err)
        return res.json(data)
    })

})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully")
    })


})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});


// app.listen(process.env.PORT || 8800, () => {
app.listen(8800, () => {
    console.log("Connected to backend !")
})