import { HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"
import React, { useRef } from "react"
import { IoTrash } from "react-icons/io5"
import { useMutation, useQuery } from "react-query"
import useToast from "../hooks/useToast"
import { getBooks, removeBook } from "../service/books"

const BooksList = () => {
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
          <Image src={book.imageUrl} alt="book" width="125px" height="200px" />
          <VStack justify="space-between" align="start" h="100%">
            <HStack justify="space-between">
              <Text h="24px" fontWeight="bold">
                {book.title}
              </Text>
              <IconButton
                aria-label="Remove book"
                bg="transparent"
                isLoading={mutation.isLoading && book.id === selectedId.current}
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
  )
}

export default BooksList
