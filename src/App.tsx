import { createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import { Toast } from "@kobalte/core";
import { getAccount } from "~/utils";
import { Breadcrumbs, GameList } from "~/components";

export default () => {
  const [position, setPosition] = createSignal<string[]>([]);

  const intoFolder = (folder: string) => setPosition((prev) => [...prev, folder]);

  const account = getAccount();

  return (
    <div class="w-screen h-[100dvh] bg-pink-50">
      <div class="w-5/6 sm:w-4/5 lg:w-3/5 h-full m-auto py-8 flex flex-col space-y-4">
        <Breadcrumbs
          position={position()}
          setPosition={setPosition}
        />
        <GameList
          account={account}
          position={position()}
          intoFolder={intoFolder}
        />
        <Portal>
          <Toast.Region>
            <Toast.List class="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-full sm:w-[400px] m-0 z-50 outline-0" />
          </Toast.Region>
        </Portal>
      </div>
    </div>
  );
};
