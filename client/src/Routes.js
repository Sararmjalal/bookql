import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalLayout from "./Layouts/Global";
import Authors from "./Pages/Authors";
import Books from "./Pages/Books";
import CreateAuthor from "./Pages/CreateAuthor";
import CreateBook from "./Pages/CreateBook";
import EditAuthor from "./Pages/EditAuthor";
import EditBook from "./Pages/EditBook";
import NotFound from "./Pages/NotFound";
import SingleAuthor from "./Pages/SingleAuthor";
import SingleBook from "./Pages/SingleBook";

export default function GraphRoutes() {

  return (
    <Router>
     <Routes>  
        
        <Route path="/" element={<GlobalLayout />}>

        <Route path="" element={<Authors />} />
        <Route path="author/:id" element={<SingleAuthor />} />
        <Route path="books" element={<Books />} />
        <Route path="book/:id" element={<SingleBook />} />

        <Route path="author/create" element={<CreateAuthor />} />
        <Route path="author/edit/:id" element={<EditAuthor />} />
        <Route path="book/create" element={<CreateBook />} />
        <Route path="book/edit/:id" element={<EditBook />} />
          
          <Route path="*" element={<NotFound />} />
          
      </Route> 
      </Routes>
  </Router>
)
}