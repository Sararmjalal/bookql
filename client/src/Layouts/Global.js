import { Outlet } from "react-router-dom"
import Copyright from "../Components/Copyright"
import Header from "../Components/Header"

const GlobalLayout = () => {
  return (
    <div>
      <Header />
      <section className="bg-gray-800 pt-8 pb-16 px-8 text-gray-300 min-h-screen">
        <Outlet />
      </section>
      <Copyright />
    </div>
  )
}

export default GlobalLayout