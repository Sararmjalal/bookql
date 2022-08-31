import { useLayoutEffect } from "react"

const NotFound = () => {

  useLayoutEffect(() => {
    document.title = "404 | Not Found"
    }, [])

  return (
    <h1>Not Found</h1>
  )
}

export default NotFound