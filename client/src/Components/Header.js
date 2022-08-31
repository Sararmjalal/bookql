import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import MenuIcon from "../assets/svg/MenuIcon"

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false)
  const thisLocation = useLocation()
  const navigate = useNavigate()

  return (
    <>
    <div className="bg-black w-full flex items-center gap-10 px-4 py-6">
      <div className="md:w-60 w-1/2 ">
        <Link to="/">
          <p
            className={`${thisLocation.pathname === "/" ? "text-white font-normal" : "text-gray-400"}  hover:text-white text-lg`}>
            Simple Bookql
          </p>
        </Link>
      </div>
      <ul className="hidden md:w-72 md:flex md:gap-10 md:items-center text-gray-400 font-light ">
        <Link to="/">
          <li
            className={`${thisLocation.pathname === "/" ? "text-white font-normal" : "text-gray-400"}  hover:text-white pl-4`}>
            Authors
          </li>
        </Link>
        <Link to="/books">
          <li
            className={`${thisLocation.pathname === "/books" ? "text-white font-normal" : "text-gray-400"}  hover:text-white pl-4`}>
            Books
          </li>
        </Link>
      </ul>
      <div className="text-right md:flex md:gap-2 font-light md:w-[calc(100%-16rem)] w-1/2">
        <div className="hidden md:block w-[calc(100%-2rem)] text-right">
          <button
            className={`${thisLocation.pathname === "/author/create" ? " bg-white font-normal" : "bg-gray-400"}
            hover:bg-white py-2 px-4 rounded-xl `}
            onClick={() => navigate("/author/create")}
          >
            Create Author
          </button>
        </div>
        <div className="hidden md:block md:w-[12rem] lg:w-36 xl:w-34 text-right">
          <button
            className={`${thisLocation.pathname === "/book/create" ? " text-white font-normal" : "text-gray-400"}
             hover:bg-gray-800 py-2 px-4 rounded-xl bg-gray-700 `}
             onClick={() => navigate("/book/create")}
          
          >
            Create Book
            </button>
          </div>
          <p
            className="md:hidden block text-gray-400 hover:text-white focus:text-white w-max ml-auto cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
              <MenuIcon />
            </p>
      </div> 
    </div>
      <>
        <div
          className={ mobileMenu ? "mobileMenuBackdrop" : "hidden" }
          onClick={() => setMobileMenu(false)}></div>
        <ul className={ mobileMenu ? "mobileMenu" : "hidden" }>
          <li className="text-white py-6 w-full text-center text-lg border-b-2 border-gray-700">Main Menu</li>
          <Link to="/">
            <li
              className={`${thisLocation.pathname === "/" ? "text-white font-normal" : "text-gray-400 font-light"} 
              py-6 w-full text-center border-b-2 hover:text-white border-gray-700`}
              onClick={() => setMobileMenu(false)}
            >
              Authors
            </li>
          </Link>
          <Link to="/books">
            <li
              className={`${thisLocation.pathname === "/books" ? "text-white font-normal" : "text-gray-400 font-light"} 
              py-6 w-full text-center border-b-2 hover:text-white border-gray-700`}
              onClick={() => setMobileMenu(false)}
            >
              Books
            </li>
          </Link>
          <Link to="/author/create">
            <li
              className={`${thisLocation.pathname === "/author/create" ? "text-white font-normal" : "text-gray-400 font-light"} 
              py-6 w-full text-center border-b-2 hover:text-white border-gray-700`}
              onClick={() => setMobileMenu(false)}
            >
              Create Author
            </li>
          </Link>
          <Link to="/book/create">
            <li
              className={`${thisLocation.pathname === "/book/create" ? "text-white font-normal" : "text-gray-400 font-light"} 
              py-6 w-full text-center border-b-2 hover:text-white border-gray-700`}
              onClick={() => setMobileMenu(false)}
            >
              Create Book
            </li>
          </Link>
        </ul>
        </>
  </>
  )
}

export default Header