import { useQuery, gql } from "@apollo/client"
import { useEffect, useLayoutEffect, useState } from "react"
import { siteTitle } from "../config/constants"
import { Link } from "react-router-dom"
import Card from "../Components/Card"

const Books = () => {

  const [books, setBooks] = useState([])

  useLayoutEffect(() => {
    document.title = `${siteTitle} | Books`
  }, [])
  
  const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      createdAt
      author {
        name
      }
      title
      _id
      authorId
    }
  }`

  const { loading, data } = useQuery(GET_BOOKS)

  useEffect(() => {
    if(data)
    setBooks(data.getBooks)
  }, [loading])
  
  
  if(loading) return <h1>Loading...</h1>
  return (
    <div>
    <p className="text-lg font-semibold mb-4">All Books</p>
    {
      !books[0] ?
        <p className="font-light">No Books exist yet. to create your first book,
          <Link to="/book/create">
           <span className="hover:text-white"> Click here</span>
          </Link> 
          .
        </p>
        :
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
        {
        books.map((item, index) => {
         return (
            <Card
            useFor="book"
            item={item}
            index={index}
            />
            )
          })
        }
      </div>  
    }
  </div>
  )
}

export default Books