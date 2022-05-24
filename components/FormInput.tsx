import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { useField } from "formik"

type Props = {
  name: string
  label: string
}

const FormInput = (props: Props) => {
  const { name, label } = props
  const [values, meta] = useField(name)

  const isInvalid = Boolean(meta.error && meta.touched)

  return (
    <FormControl my="20px" isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...values} id={name} />

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default FormInput
