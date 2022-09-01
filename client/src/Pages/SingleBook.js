import { useEffect, useLayoutEffect, useState } from "react"
import Single from "../Components/Single"
import { siteTitle } from "../config/constants"
import { useQuery, gql } from "@apollo/client"
import { useParams } from "react-router-dom"
import NotFound from "./NotFound"


const SingleBook = () => {

  const params = useParams()

  const GET_BOOK = gql`query GetBook($id: ID!) {
    getBook(_id: $id) {
      title
      authorId
      author {
        name
        books {
          _id
          title
          createdAt
          author {
            _id
            name
          }
          authorId
        }
      }
      createdAt
      _id
    }
  }
  `

  const { data, loading, refetch } = useQuery(GET_BOOK, {
    variables: {
      "id": params.id
    }
  })

  useEffect(() => {
    if (data) {
      refetch()
      document.title = `${siteTitle} | ${data.getBook.title}`
    }     
  }, [loading])

  if (loading) return <h1>Loading...</h1>

  if(!data) return <NotFound />
  
  return (
    <Single 
      useFor="book"
      array={data.getBook.author.books}
      item={data.getBook}
    />
  )
}

export default SingleBook