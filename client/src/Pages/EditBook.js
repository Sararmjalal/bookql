import { useEffect, useLayoutEffect, useState } from "react"
import { siteTitle } from "../config/constants"
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";



const EditBook = () => {
  
  useLayoutEffect(() => {
    document.title = `${siteTitle} | Edit Book`
  }, [])

  const params = useParams()

  const [title, setTitle] = useState("")

  const [message, setMessage] = useState("")
  
  const GET_BOOK = gql`
  query GetBook($id: ID!) {
  getBook(_id: $id) {
      _id
      title
    }
  }
  `
  const EDIT_BOOK = gql`
  mutation EditBook($id: ID!, $title: String!) {
    editBook(_id: $id, title: $title) {
      status
    }
  }
  `
  
  const { data, loading } = useQuery(GET_BOOK, {
    variables: {
      "id": params.id
    }
  })

  const [ EditBook ] = useMutation(EDIT_BOOK)

  useEffect(() => {
    if (data)
      setTitle(data.getBook.title)
  }, [loading])

  const edit = async () => {

    if (!title) return setMessage("Field cannot be empty.")

    const edit = await EditBook({
      variables: {
        "id": params.id,
        "title": title
      }
    })

    if (edit.data.editBook.status == 200)
    setMessage("This book edited successfully!")
    
  }

  if (loading) return <h1>Loading...</h1>
  
  return (
    <div onKeyDown={(e) => {
      if (e.key === "Enter")
        edit()
    }}>
      <p className="text-lg font-semibold mb-4">Edit Book</p>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

export default EditBook