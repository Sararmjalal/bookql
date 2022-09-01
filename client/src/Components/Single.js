import UserAvatar from "../assets/jpg/UserAvatar.jpg"
import BookImage from "../assets/jpg/BookImage.jpg"
import { Link } from "react-router-dom"
import Card from "./Card"

const Single = (props) => {

  const { useFor, array ,item } = props
  
  return (
    <div className="md:flex gap-10">
      <div className="bg-black sm:w-72 h-max rounded-xl text-white flex flex-col items-start overflow-hidden mb-10">
        <img 
          className="sm:w-72 sm:h-72 w-full h-full aspect-square object-cover"
          src={useFor === "book" ? BookImage : UserAvatar}
        />
        <div className="flex flex-col gap-2 px-4 pt-4 pb-8 text-gray-300">
          {
            useFor === "book" ?
              <>
                <p className="font-light hover:text-white"><span className="font-normal text-white">Title: </span>
                  <Link to={`/book/${item._id}`}>
                     {item.title}
                  </Link>
                </p>
                <p className="font-light hover:text-white"><span className="font-normal text-white">Writer: </span>
                  <Link to={`/author/${item.authorId}`}>
                    {item.author.name}
                  </Link>
                </p>
              </>
            :
              <p className="font-light hover:text-white"><span className="font-normal text-white">Name: </span>
                 <Link to={`/author/${item._id}`}>
                    {item.name}
                  </Link>       
              </p>
          }
          <p className="font-light">
            <span className="font-normal text-white mr-1">
              Created At:
            </span>{item.createdAt.slice(0, 4)}/{item.createdAt.slice(5, 7)}/{item.createdAt.slice(8, 10)}
          </p>
        </div>
      </div>
      <div className="sm:w-[calc(100%-18rem)]">
        <p className="text-lg font-semibold mb-4">{
          useFor === "book" ? 
            `Other books written by ${item.author.name}`
            :
            `Books written by ${item.name}`
          }
        </p>
        <div className="grid xl:grid-cols-2 gap-6">
          {
            array[0] ?
            array.map((element, index) => {
              return (
                 <Card
                 useFor="book"
                 item={element}
                 index={index}
                 />
                 )
            })
              :
           <p className="font-light">This author written no books yet.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Single