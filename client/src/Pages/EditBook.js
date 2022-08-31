import { useLayoutEffect } from "react"
import { siteTitle } from "../config/constants"

const EditBook = () => {

  useLayoutEffect(() => {
    document.title = `${siteTitle} | Edit Book`
    }, [])

  return (
    <h1>EditBook</h1>
  )
}

export default EditBook