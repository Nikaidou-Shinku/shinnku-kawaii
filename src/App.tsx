import { createSignal } from "solid-js";
import { Breadcrumbs, GameList } from "~/components";

export default () => {
  const [position, setPosition] = createSignal<string[]>([]);

  const intoFolder = (folder: string) => setPosition((prev) => [...prev, folder]);

  return (
    <div class="w-screen h-screen bg-pink-50">
      <div class="w-3/5 h-full m-auto py-8 flex flex-col space-y-4">
        <Breadcrumbs
          position={position()}
          setPosition={setPosition}
        />
        <GameList
          position={position()}
          intoFolder={intoFolder}
        />
      </div>
    </div>
  );
};
