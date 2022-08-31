import { useLayoutEffect, useState } from "react"
import { siteTitle } from "../config/constants"
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";


const EditAuthor = () => {

  useLayoutEffect(() => {
    document.title = `${siteTitle} | Edit Author`
  }, [])
  
  const params = useParams()
  const [thisAuthor, setThisAuthor] = useState({
    _id: "",
    name:"",
  })

  const GET_AUTHOR = gql`
  query GetAuthor($id: ${params.id}) {
    getAuthor(_id: $id) {
      _id
      name
    },
  }
  `
  const { data, loading } = useQuery(GET_AUTHOR)
  
  console.log(data)

  if(loading) return <h1>Loading...</h1>
  return (
    <h1>EditAuthor</h1>
  )
}

export default EditAuthor