/* @refresh reload */
import { render } from "solid-js/web";
import { QueryClient } from "@tanstack/solid-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/solid-query-persist-client";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 mins
      gcTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

render(
  () => (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60, // 1 hour
      }}
    >
      <App />
    </PersistQueryClientProvider>
  ),
  document.getElementById("root")!,
);
