import { useLayoutEffect } from "react"
import NotFoundGif from "../assets/gif/NotFound.gif"
import {useNavigate} from "react-router-dom"

const NotFound = () => {

  useLayoutEffect(() => {
    document.title = "404 | Not Found"
  }, [])
  
  const navigate = useNavigate()

  return (
    <div>
      <img
        src={NotFoundGif}
        className="rounded-full aspect-square object-cover md:w-1/2 md:h-1/2 m-auto cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  )
}

export default NotFound