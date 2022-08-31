import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_AUTHORS = gql `
query GetAuthors {
  getAuthors {
    _id
    name
    createdAt
  }
}`

function App() {

  const { loading, error, data } = useQuery(GET_AUTHORS)
  
  console.log(data)
  
  
  return (
    <div>
      Hello
    </div>
  );
}

export default App;
