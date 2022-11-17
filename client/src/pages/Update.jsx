import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

function Update() {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: ""
  })

  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log("🚀 ~ file: Add.jsx ~ line 10 ~ Add ~ books", books)
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="form form w-full max-w-xs flex-col text-center">
        <h1 className='p-6 text-center text-3xl font-extrabold'>Update the Book</h1>
        <input
          className='bg-none appearance-none border w-full py-2 px-3 my-2 leading-tight focus:outline-teal-400'
          type="text"
          placeholder="Book title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          className='bg-none appearance-none border w-full py-2 px-3 my-2 leading-tight focus:outline-teal-400'
          rows={5}
          type="text"
          placeholder="Book desc"
          name="desc"
          onChange={handleChange}
        />
        <input
          className='bg-none appearance-none border w-full py-2 px-3 my-2 leading-tight focus:outline-teal-400'
          type="number"
          placeholder="Book price"
          name="price"
          onChange={handleChange}
        />
        <input
          className='bg-none appearance-none border w-full py-2 px-3 my-2 leading-tight focus:outline-teal-400'
          type="text"
          placeholder="Book cover"
          name="cover"
          onChange={handleChange}
        />
        <button className='px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black' onClick={handleClick}>Update</button>
        {/* {error && "Something went wrong!"} */}
        <Link className='px-6 uppercase font-semibold ' to="/">See all books</Link>
      </div>
    </div>
  )
}

export default Update