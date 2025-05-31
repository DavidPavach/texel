import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from './routes/AppRoutes';

//Toast
import { ToastContainer } from "react-fox-toast";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
    }
  }
})

const App = () => {
  return ( 
    <main className='text-xs md:text-sm xl:text-base'>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer position="top-center" isPausedOnHover={true} duration={10000} /> 
      </QueryClientProvider>
    </main>
   );
}
 
export default App;