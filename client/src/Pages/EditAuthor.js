import { useEffect, useLayoutEffect, useState } from "react"
import { siteTitle } from "../config/constants"
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";



const EditAuthor = () => {
  
  useLayoutEffect(() => {
    document.title = `${siteTitle} | Edit Author`
  }, [])
  
  const params = useParams()

  const [name, setName] = useState("")

  const [message, setMessage] = useState("")
  
  const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    getAuthor(_id: $id) {
      _id
      name
    }
  }
  `
  const EDIT_AUTHOR = gql`
  mutation EditAuthor($id: ID!, $name: String!) {
    editAuthor(_id: $id, name: $name) {
      status
    }
  }
  `
  const { data, loading } = useQuery(GET_AUTHOR, {
    variables: {
      "id": params.id
    }
  })
  
  const [ EditAuthor ] = useMutation(EDIT_AUTHOR)
  
  useEffect(() => {
    if (data)
      setName(data.getAuthor.name)
  }, [loading])
  

  const edit = async () => {

    if (!name) return setMessage("Field cannot be empty.")
    
    const edit = await EditAuthor({
      variables: {
        "id": params.id,
        "name": name
      }
    })

    if (edit.data.editAuthor.status == 200)
      setMessage("This author edited successfully!")
    
  }

  if(loading) return <h1>Loading...</h1>
  return (
    <div onKeyDown={(e) => {
      if (e.key === "Enter")
        edit()
    }}>
      <p className="text-lg font-semibold mb-4">Edit Author</p>
      <div className="lg:w-1/2">
      <div className="flex gap-4 mb-4">
        <input
          className="bg-gray-900 text-gray-500 outline-none py-4 px-2 rounded-xl w-1/2"
          value={params.id}
          disabled
        />
        <input
          className="bg-black focus:bg-gray-900 hover:bg-gray-900 outline-none py-4 px-2 rounded-xl w-1/2"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p className="ml-2 font-light">{message}</p>
          <p className="bg-black py-2 px-4 rounded-xl ml-auto w-max hover:bg-gray-900 cursor-pointer"
            onClick={edit}
          >
            Edit
          </p>
        </div>
      </div>
    </div>  
  )
}

export default EditAuthor