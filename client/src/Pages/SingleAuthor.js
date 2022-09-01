import { useLayoutEffect, useEffect } from "react"
import { useParams } from "react-router-dom"
import { siteTitle } from "../config/constants"
import Single from "../Components/Single"
import { useQuery, gql } from "@apollo/client"
import NotFound from "./NotFound"


const SingleAuthor = () => {

  const params = useParams()

  const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    getAuthor(_id: $id) {
      _id
      name
      createdAt
      books {
        _id
        title
        authorId
        createdAt
        author {
          _id
          name
        }
      }
    }
  }
  `

  const { data, loading, error, refetch } = useQuery(GET_AUTHOR, {
    variables: {
      "id": params.id
    }
  })

  useEffect(() => {
    if (data) {
      refetch()
      document.title = `${siteTitle} | ${data.getAuthor.name}`
    }     
  }, [loading])


  if (loading) return <h1>Loading...</h1>

  if(!data) return <NotFound />
  
  return (
    <Single 
      useFor="author"
      array={data.getAuthor.books}
      item={data.getAuthor}
    />
  )
}

export default SingleAuthor