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
            <h1>Books Shop</h1>
            <div className="books">
                {books.map(book => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt='' />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>${book.price}</span>
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                        <button>Update</button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add">Add new book</Link>
            </button>
        </>
    )
}

export default Books