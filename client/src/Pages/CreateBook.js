import { useLayoutEffect, useState } from "react"
import { siteTitle } from "../config/constants"
import { gql,  useMutation, useQuery } from '@apollo/client';
import { GET_AUTHORS } from "./Authors";


const CreateBook = () => {

  useLayoutEffect(() => {
    document.title = `${siteTitle} | Create Book`
    }, [])

  const [thisBook, setThisBook] = useState(
    {
      title: "",
      authorId: ""
    }
  )

  const [message, setMessage] = useState("")

  const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $authorId: ID!) {
    createBook(title: $title, authorId: $authorId) {
      msg
      status
    }
  }
  `
  const [CreateBook] = useMutation(CREATE_BOOK)
  
  const { data } = useQuery(GET_AUTHORS)

  const publish = async () => {
    
    if (!thisBook.title || !thisBook.authorId) return setMessage("Field cannot be empty.")
    
    const findId = data.getAuthors.find(author => author._id === thisBook.authorId)

    if (!findId) return setMessage("Wrong id. Please try again!")
    
    const create = await CreateBook(
      {
        variables: { 
          "title": thisBook.title,
          "authorId": thisBook.authorId
         }
      }
    )

    if (create.data.createBook.status === 200)
      setMessage("Your book added successfully!")

  }


  return (
    <div onKeyDown={(e) => {
      if (e.key === "Enter")
        publish()
    }}>
      <p className="text-lg font-semibold mb-4">Create New Book</p>
      <div className="lg:w-1/2">
      <div className="flex gap-4 mb-4">
          {
            message !== "Your book added successfully!" ?
              <>
              <input
                className="bg-black focus:bg-gray-900 hover:bg-gray-900 outline-none py-4 px-2 rounded-xl w-1/2"
                placeholder="Enter title..."
                value={thisBook.title}
                onChange={(e) => setThisBook({...thisBook, title:e.target.value})}
                />
              <input
                className="bg-black focus:bg-gray-900 hover:bg-gray-900 outline-none py-4 px-2 rounded-xl w-1/2"
                placeholder="Enter author id..."
                value={thisBook.authorId}
                onChange={(e) => setThisBook({...thisBook, authorId:e.target.value})}
              />
            </>
              :
              <>
              <input
              className="bg-gray-900 text-gray-500 outline-none py-4 px-2 rounded-xl w-1/2"
              value={thisBook.title}
              disabled
              />
             <input
                  className="bg-gray-900 text-gray-500 outline-none py-4 px-2 rounded-xl w-1/2"
                  value={thisBook.authorId}
                  disabled
            />
            </>
        }
        </div>
        <div>
          <p className="ml-2 font-light">{message}</p>
          {
            message !== "Your book added successfully!" ?
              <p className="bg-black py-2 px-4 rounded-xl ml-auto w-max hover:bg-gray-900 cursor-pointer"
                onClick={publish}
              >
              Publish
              </p>
              :
              <p className="bg-gray-900 text-gray-500 py-2 px-4 rounded-xl ml-auto w-max"
              >
              Publish
              </p>
          }
        </div>
      </div>
    </div>  
  )
}

export default CreateBook 