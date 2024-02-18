import Router from "./routes/Router";
import Layout from "./components/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
export const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Router />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
