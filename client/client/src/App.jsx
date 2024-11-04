import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [releaseDate, setReleaseDate] = useState(0)

  const [newTitle, setNewTitle] = useState("")

  useEffect(()=> {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/books/")
      const data = await response.json()
      setBooks(data)
    } catch(err) {
      console.log(err)
    }
  }

  const addBook = async () => {
    const bookData = {
      title,
      releaseDate,
    }
    try{
    const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookData),
    })

    const data = await response.json()
    setBooks((prev) => [...prev, data])
    }catch (err){
      console.log(err)
    }
  }

  const updateTitle = async(pk, releaseDate) => {
    const bookData = {
      title: newTitle,
      releaseDate,
    }
    try{
    const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookData),
    })

    const data = await response.json()
    setBooks((prev) =>
      prev.map((book) => {
      if(book.id === pk) {
        return data
      } else{
        return book
      }
    })) 
    }catch (err){
      console.log(err)
    }
  }

  const deleteBook = async (pk) => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "DELETE",
      })

      setBooks((prev) => prev.filter((book) => book.id !== pk))
    } catch (err){
      console.log(err)
    }
  }

  return (
    <>
    <h1>Book Site</h1>

    <div>
      <input 
      type="text" 
      placeholder='Book Title...' 
      onChange={(e) => setTitle(e.target.value)}
      />
      <input 
      type="number" 
      placeholder='Release Date..' 
      onChange={(e) => setReleaseDate(e.target.value)}
      />
      <button onClick={addBook}>Add Book</button>
    </div>
    {books.map((book) => (
    <div>
      <p>Title: {book.title}</p>
      <p>Release Date: {book.releaseDate}</p>
      <input 
      type="text" 
      placeholder='New Title...'
      onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={() => updateTitle(book.id, book.releaseDate)}>
      Change Title
      </button>
      <button onClick={() => deleteBook(book.id)}>
      Delete
      </button>
    </div>
    ))}
    </>
  )
}

export default App
