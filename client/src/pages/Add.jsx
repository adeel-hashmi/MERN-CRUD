import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Add() {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    // console.log("🚀 ~ file: Add.jsx ~ line 10 ~ Add ~ books", books)
    const handleClick = async e => {
        e.preventDefault() // to prevent reload on clicking this button
        try {
            console.log('trying to post')
            await axios.post("http://localhost:8800/books", book)
            console.log('posted post')
            navigate("/")
        } catch (err) {
            console.log("post not successful error: ", err)
        }
    }
    return (
        <div className="form">
            <h1>Add Books</h1>
            <input type="text" onChange={handleChange} placeholder='Book title' name="title" id="" />
            <input type="text" onChange={handleChange} placeholder='Book desc' name="desc" id="" />
            <input type="number" onChange={handleChange} placeholder='Book price' name="cover" id="" />
            <input type="text" onChange={handleChange} placeholder='Book cover' name="price" id="" />
            <button onClick={handleClick}>Add</button>
            <Link to="/">See all books</Link>
        </div>
    )
}

export default Add