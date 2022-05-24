import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider resetCSS>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
