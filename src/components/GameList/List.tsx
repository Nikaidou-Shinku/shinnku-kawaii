import { For, createMemo } from "solid-js";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { GameItem } from "~/data/interface";
import ListItem from "./ListItem";

interface ListProps {
  account: string;
  items: GameItem[];
  position: string[];
  intoFolder: (folder: string) => void;
}

export default (props: ListProps) => {
  let listRef: HTMLDivElement | undefined;

  const virtualizer = createMemo(() =>
    createVirtualizer({
      count: props.items.length,
      getScrollElement: () => listRef,
      estimateSize: () => 82,
    }),
  );

  return (
    <div class="flex-1 overflow-auto bg-white p-4" ref={listRef}>
      <div
        class="relative w-full"
        style={{ height: `${virtualizer().getTotalSize()}px` }}
      >
        <For each={virtualizer().getVirtualItems()}>
          {(item) => (
            <div
              class="absolute left-0 top-0 w-full"
              style={{
                height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
              }}
            >
              <ListItem
                account={props.account}
                parent={props.position}
                game={props.items[item.index]}
                intoFolder={props.intoFolder}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
