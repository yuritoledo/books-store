import {
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Image from "next/image"
import { useMutation, useQuery } from "react-query"
import NewBookModal from "../components/NewBook"
import { getBooks, removeBook } from "../service/books"
import { IoTrash } from "react-icons/io5"
import useToast from "../hooks/useToast"
import { Book } from "../types/book"
import { useRef } from "react"

const Home: NextPage = () => {
  const selectedId = useRef("")

  const query = useQuery("books", getBooks)
  const toast = useToast()
  const mutation = useMutation(removeBook, {
    onSuccess: () => {
      query.refetch()
      toast({
        title: "Book removed successfully 🎉",
        status: "success",
      })
    },
  })

  const onClickRemove = (id: string) => {
    selectedId.current = id
    mutation.mutate(id)
  }

  return (
    <VStack bg="#E5E5E5">
      <HStack>
        <Heading>Bookshelf</Heading>
        <Button>Add book</Button>
      </HStack>
      <VStack gap="36px">
        {query.data?.map((book) => (
          <HStack
            bg="white"
            w="601px"
            h="100%"
            key={book.id}
            borderRadius="8px"
            p="15px"
          >
            <Image
              src={book.imageUrl}
              alt="book"
              width="125px"
              height="200px"
            />
            <VStack justify="space-between" align="start" h="100%">
              <HStack justify="space-between">
                <Text h="24px" fontWeight="bold">
                  {book.title}
                </Text>
                <IconButton
                  aria-label="Remove book"
                  bg="transparent"
                  isLoading={mutation.isLoading && book.id === selectedId}
                  onClick={() => onClickRemove(book.id)}
                  icon={<IoTrash size="30px" color="#929292" />}
                />
              </HStack>
              <Text>{book.author}</Text>
              <Text>{book.description}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      <NewBookModal />
    </VStack>
  )
}

export default Home
