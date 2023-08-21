import { createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import { Toast } from "@kobalte/core";
import { getAccount } from "~/utils";
import { Breadcrumbs, GameList } from "~/components";

export default () => {
  const [position, setPosition] = createSignal<string[]>([]);

  const intoFolder = (folder: string) =>
    setPosition((prev) => [...prev, folder]);

  const account = getAccount();

  return (
    <div class="h-[100dvh] w-screen bg-pink-50">
      <div class="m-auto flex h-full w-5/6 flex-col space-y-4 py-8 sm:w-4/5 lg:w-3/5">
        <Breadcrumbs position={position()} setPosition={setPosition} />
        <GameList
          account={account}
          position={position()}
          intoFolder={intoFolder}
        />
        <Portal>
          <Toast.Region>
            <Toast.List class="fixed bottom-0 right-0 z-50 m-0 flex w-full flex-col gap-2 p-4 outline-0 sm:w-[400px]" />
          </Toast.Region>
        </Portal>
      </div>
    </div>
  );
};
