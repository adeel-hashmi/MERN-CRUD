import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
//middleware
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
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

app.listen(8800, () => {
    console.log("Connected to backend !")
})