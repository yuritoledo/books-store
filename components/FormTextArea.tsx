import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react"
import { useField } from "formik"

type Props = {
  name: string
  label: string
}

const FormTextarea = (props: Props) => {
  const { name, label } = props
  const [values, meta] = useField(name)

  const isInvalid = Boolean(meta.error && meta.touched)

  return (
    <FormControl my="20px" isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea {...values} id={name} />

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default FormTextarea
