import { useQuery, gql } from "@apollo/client"
import { useEffect, useLayoutEffect } from "react"
import { siteTitle } from "../config/constants"
import { Link } from "react-router-dom"
import Card from "../Components/Card"

const Books = () => {

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

  const { loading, data, refetch } = useQuery(GET_BOOKS)

  useEffect(() => {
    if (data) refetch()
  }, [])
  
  
  if(loading) return <h1>Loading...</h1>
  return (
    <div>
    <p className="text-lg font-semibold mb-4">All Books</p>
    {
      !data.getBooks[0] ?
        <p className="font-light">No Books exist yet. to create your first book,
          <Link to="/book/create">
           <span className="hover:text-white"> Click here</span>
          </Link> 
          .
        </p>
        :
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
        {
        data.getBooks.map((item, index) => {
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