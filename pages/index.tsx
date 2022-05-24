import type { NextPage } from "next"
import { useQuery } from "react-query"
import NewBookModal from "../components/NewBook"
import { getBooks } from "../service/books"

const Home: NextPage = () => {
  const query = useQuery("books", getBooks)

  return (
    <>
      {query.data?.map((x) => (
        <div key={x.id}>
          <h1>{x.title}</h1>
          <p>{x.author}</p>
          <p>{x.description}</p>
          <img src={x.imageUrl} alt="book" />
        </div>
      ))}

      <NewBookModal />
    </>
  )
}

export default Home
