import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { Form, FormikProvider, useFormik } from "formik"
import FormInput from "./FormInput"
import FormTextarea from "./FormTextArea"
import * as Yup from "yup"
import { Book } from "../types/book"
import { useMutation, useQueryClient } from "react-query"
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

type Props = {
  isOpen: boolean
  onClose(): void
}

const NewBookModal = (props: Props) => {
  const { isOpen, onClose } = props

  const toast = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation(createBook, {
    onSuccess: (data) => {
      queryClient.setQueryData("books", data)
      toast({
        title: "Book created! 🎉",
        status: "success",
      })
      onCloseModal()
    },
    onError: () => {
      toast({
        title: "Error creating book 😩",
        status: "error",
      })
    },
  })

  const onCloseModal = () => {
    form.resetForm()
    onClose()
  }

  const onSubmit = (values: Book) => {
    mutation.mutate(values)
  }

  const form = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: false,
  })

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader w="560px" alignSelf="center">
          <Heading fontSize="42px">Add a new book</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody w="560px" alignSelf="center">
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
