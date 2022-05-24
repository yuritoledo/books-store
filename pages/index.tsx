import {
  Button,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import NewBookModal from "../components/NewBook"
import BooksList from "../components/BooksList"

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <VStack h="100vh" w="601px" mx="auto">
      <HStack justify="space-between" w="100%">
        <Heading>Bookshelf</Heading>
        <Button onClick={onOpen} colorScheme="green" variant="solid">
          Add book
        </Button>
      </HStack>

      <BooksList />

      <NewBookModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  )
}

export default Home
