import { useLayoutEffect, useEffect, useState } from "react"
import { siteTitle } from "../config/constants"
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";
import Card from "../Components/Card";

export const GET_AUTHORS = gql `
query GetAuthors {
getAuthors {
  _id
  name
  createdAt
}
}`

const Authors = () => {

  const [authors, setAuthors] = useState([])

  useLayoutEffect(() => {
  document.title = `${siteTitle} | Authors`
  }, [])


  const { loading, data } = useQuery(GET_AUTHORS)

  useEffect(() => {
    if(data)
    setAuthors(data.getAuthors)
  }, [loading])

  if(loading) return <h1>Loading...</h1>
  return (
    <div>
      <p className="text-lg font-semibold mb-4">All Authors</p>
      {
        !authors[0] ?
          <p className="font-light">No Authors exist yet. to create your first author,
            <Link to="/author/create">
             <span className="hover:text-white"> Click here</span>
            </Link> 
            .
          </p>
          :
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
            {
            authors.map((item, index) => {
             return (
                <Card
                useFor="author"
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

export default Authors