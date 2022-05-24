import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import theme from "../styling/theme"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider theme={theme} resetCSS>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
