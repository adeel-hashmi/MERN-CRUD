import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Books() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
                // console.log("🚀 ~ file: Books.jsx ~ line 9 ~ fetchAllBooks ~ res", res)

            } catch (err) {
                console.log("🚀 ~ file: Books.jsx ~ line 12 ~ fetchAllBooks ~ err", err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/books/${id}`);
            window.location.reload()
        }
        catch (err) { console.log(err); }
    }



    return (
        <>
            <div className="flex font-mono place-content-center">
                <div className=" w-full max-w-md flex-col text-center">
                    <h1 className='p-6 text-center text-3xl font-extrabold'>Books Shop</h1>
                    <button className='px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black'>
                        <Link to="/add">Add new book</Link>
                    </button>
                    <div className="books text-center">
                        {books
                            .sort((a, b) => b.id - a.id)
                            .map(book => (
                                <div className="book border-2 border-black" key={book.id}>
                                    {book.cover && <img className="bg-black" src={book.cover} alt={`Book no. ${book.id}`} />}
                                    <h2 className='relative w-full flex-none mb-2 text-2xl font-semibold'>{book.title}</h2>
                                    <p>{book.desc}</p>
                                    <p className='relative text-lg text-black'>${book.price}</p>
                                    <button className='px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black' onClick={() => handleDelete(book.id)}>Delete</button>
                                    <button className='px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900'><Link to={`/update/${book.id}`}>Update</Link></button>
                                </div>
                            ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Books