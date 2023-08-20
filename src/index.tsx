/* @refresh reload */
import { render } from "solid-js/web";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

render(() => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
), document.getElementById("root")!);
