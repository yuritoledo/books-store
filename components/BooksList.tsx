import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"
import { useRef } from "react"
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
    <VStack gap="36px" bg="#FAFAFA">
      {query.data?.map((book) => (
        <HStack
          key={book.id}
          bg="white"
          w="601px"
          h="100%"
          borderRadius="8px"
          p="15px"
          boxShadow="0px 51px 80px rgba(0, 0, 0, 0.04), 0px 21.3066px 33.4221px rgba(0, 0, 0, 0.0287542), 0px 11.3915px 17.869px rgba(0, 0, 0, 0.0238443), 0px 6.38599px 10.0172px rgba(0, 0, 0, 0.02), 0px 3.39155px 5.32008px rgba(0, 0, 0, 0.0161557), 0px 1.4113px 2.21381px rgba(0, 0, 0, 0.0112458);"
          gap="16px"
        >
          <Box w="125px" h="200px">
            <Image
              src={book.imageUrl}
              alt="book image"
              width="125px"
              height="200px"
              layout="fixed"
            />
          </Box>
          <VStack justify="space-between" align="start" h="100%" w="100%">
            <HStack justify="space-between" w="100%">
              <Text fontSize="20px" fontWeight="bold">
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
            <Text fontSize="12px">{book.author}</Text>
            <Text fontSize="14px">{book.description}</Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  )
}

export default BooksList
