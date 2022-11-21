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
        <div className="w-full h-screen flex justify-center items-center">
            <div className="form w-full max-w-xs flex-col text-center">
                <h1 className='p-6 text-center text-3xl font-extrabold'>Add New Book</h1>
                <input className='bg-none appearance-none border w-full py-2 px-3 my-2 leading-tight focus:outline-teal-400' type="text" onChange={handleChange} placeholder='Book title' name="title" />
                <textarea className='bg-none appearance-none border w-full py-2 px-3 my-2 leading-tight focus:outline-teal-400' type="text" rows={5} onChange={handleChange} placeholder='Book desc' name="desc" />
                <input className='bg-none appearance-none border w-full py-2 px-3 my-2 leading-tight focus:outline-teal-400' type="number" onChange={handleChange} placeholder='Book price' name="cover" />
                <input className='bg-none appearance-none border w-full py-2 px-3 my-2 leading-tight focus:outline-teal-400' type="text" onChange={handleChange} placeholder='Book cover' name="price" />
                <button className='px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black' onClick={handleClick}>Add</button>
                <Link className='px-6 uppercase font-semibold' to="/">See all books</Link>
            </div>
        </div>
    )
}

export default Add