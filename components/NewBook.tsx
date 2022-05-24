import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import { Form, FormikProvider, useFormik } from "formik"
import FormInput from "./FormInput"
import FormTextarea from "./FormTextArea"
import * as Yup from "yup"
import { Book } from "../types/book"
import { useMutation } from "react-query"
import { createBook } from "../service/books"
import useToast from "../hooks/useToast"

const initialValues: Book = {
  title: "",
  author: "",
  description: "",
  imageUrl: "",
}

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  author: Yup.string().trim().required("Author is required"),
  description: Yup.string().trim().required("Description is required"),
  imageUrl: Yup.string().trim().required("Image URL is required"),
})

const NewBookModal = () => {
  const { isOpen, onClose } = useDisclosure()

  const toast = useToast()

  const mutation = useMutation(createBook, {
    onSuccess: () => {
      toast({
        title: "Book created! 🎉",
        status: "success",
      })
      onClose()
    },
    onError: () => {
      toast({
        title: "Error creating book 😩",
        status: "error",
      })
    },
  })

  const onSubmit = (values: Book) => {
    mutation.mutate({
      ...values,
      imageUrl: "https://picsum.photos/125/200",
    })
  }

  const form = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: false,
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormikProvider value={form}>
            <Form>
              <FormInput label="Title" name="title" />
              <FormInput label="Author" name="author" />
              <FormTextarea label="Description" name="description" />
              <FormInput label="Image URL" name="imageUrl" />
              <Button
                colorScheme="green"
                my="15px"
                type="submit"
                isLoading={mutation.isLoading}
              >
                Save
              </Button>
            </Form>
          </FormikProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default NewBookModal
