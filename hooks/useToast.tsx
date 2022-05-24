import { useToast as useToastBase } from "@chakra-ui/react"

const useToast = () => {
  const toast = useToastBase({
    duration: 2000,
    position: "top",
    variant: "subtle",
  })
  return toast
}

export default useToast
