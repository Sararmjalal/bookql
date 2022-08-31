

import UserAvatar from "../assets/jpg/UserAvatar.jpg"
import BookImage from "../assets/jpg/BookImage.jpg"
import { Link } from "react-router-dom"

const Card = (props) => {
  const { useFor, item, index } = props
  
  return (
    <div className="w-full sm:h-36 h-28 rounded-xl bg-black flex gap-4 overflow-hidden pr-4">
      <div className="object-cover aspect-square sm:w-36 w-28">
        <Link to={`/${useFor === "author" ? "author" : "book"}/${item._id}`}>
         <img src={useFor === "author" ? UserAvatar : BookImage} />  
        </Link>
      </div>
      <div className="flex flex-col items-start gap-1 py-4 sm:w-[calc(100%-9rem)] w-[calc(100%-7rem)]">
        {
          useFor === "author" ?
         <Link to={`/author/${item._id}`}>
          <p className="hover:text-white sm:h-7">{item.name.length > 17 ? item.name.slice(0, 17) + "..." : item.name}</p>
          </Link>
            
            :
            <Link to={`/book/${item._id}`}>
            <p className="hover:text-white sm:h-7">{item.title.length > 17 ? item.title.slice(0, 17) + "..." : item.title}</p>
            </Link>
        }
        <p className="font-light text-sm sm:h-24">
          {`Created: ${item.createdAt.slice(0, 4)}/${item.createdAt.slice(5, 7)}/${item.createdAt.slice(8, 10)}`}
        </p>
        <div className={`${useFor === "author" ? "ml-auto" : "w-full"} font-light text-sm flex `}>
        {
          useFor === "author" ?
            null
              :
              <p className="font-light text-sm w-full">
                By
                <Link to={`/author/${item.authorId}`}>
                  <span className="ml-1 hover:text-white">
                    {item.author.name.length > 17 ? item.author.name.slice(0, 17) + "..." : item.author.name}
                  </span>
                  </Link>  
                </p>
          }
            <Link to={`/${useFor === "author" ? "author" : "book"}/${item._id}`}>
                <span className="hover:text-white">View</span>
            </Link>
              <span className="mx-1"> | </span>
            <Link to={`/${useFor === "author" ? "author" : "book"}/edit/${item._id}`}>
                <span className="hover:text-white">Edit</span>
            </Link>
            
        </div>
      </div>
    </div>
  )
}

export default Card