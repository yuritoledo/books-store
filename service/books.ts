import { Book } from "../pages"

const baseURL =
  "https://us-central1-all-turtles-interview.cloudfunctions.net/books"

const headers = {
  "Content-Type": "application/json",
  Authorization: "yuritoledo",
}

export const getBooks = async (): Promise<Book[]> => {
  const response = await fetch(baseURL, { headers })
  const books = await response.json()
  return books
}

export const createBook = async (book: Book) => {
  const response = await fetch(baseURL, {
    method: "POST",
    headers,
    body: JSON.stringify(book),
  })
  return response.json()
}

export const removeBook = async (id: string) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers,
  })
  return response.json()
}
