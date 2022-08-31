import { useLayoutEffect, useState } from "react"
import { siteTitle } from "../config/constants"
import { gql,  useMutation } from '@apollo/client';


const CreateAuthor = () => {

  useLayoutEffect(() => {
    document.title = `${siteTitle} | Create Author`
  }, [])
  
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const CREATE_AUTHOR = gql`
  mutation CreateBook($name: String!) {
    createAuthor(name: $name) {
      msg
      status
    }
  }
  `

  const [CreateAuthor] = useMutation(CREATE_AUTHOR)
  
  const publish = async () => {
    const create = await CreateAuthor(
      {
        variables: {
          "name": name
        }
      }
    )
    console.log(create.data)

    if (create.data.createAuthor.status == 200)
      setMessage("Your author added successfully!")
  }


  return (
    <div onKeyDown={(e) => {
      if (e.key === "Enter")
        publish()
    }}>
      <p className="text-lg font-semibold mb-4">Create New Author</p>
      <div className="lg:w-1/2">
      <div className="flex gap-4 mb-4">
          {
            message !== "Your author added successfully!" ?
              <input
                className="bg-black focus:bg-gray-900 hover:bg-gray-900 outline-none py-4 px-2 rounded-xl w-1/2"
                placeholder="Enter name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              :
              <input
              className="bg-gray-900 text-gray-500 outline-none py-4 px-2 rounded-xl w-1/2"
              value={name}
              disabled
              />
        }
        </div>
        <div className="lg:w-1/2">
          <p className="ml-2 font-light">{message}</p>
          <p className="bg-black py-2 px-4 rounded-xl ml-auto w-max hover:bg-gray-900 cursor-pointer"
            onClick={publish}
          >
            Publish
          </p>
        </div>
      </div>
    </div>  
  )
}

export default CreateAuthor