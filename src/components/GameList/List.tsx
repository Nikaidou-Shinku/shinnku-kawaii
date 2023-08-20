import { For, createMemo } from "solid-js";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { faFile, faFolder } from "@fortawesome/free-regular-svg-icons";
import { GameItem } from "~/data/interface";
import { Icon } from "~/components";

interface ListItemProps {
  game: GameItem;
  intoFolder: (folder: string) => void;
}

// TODO: context menu & download
const ListItem = (props: ListItemProps) => {
  const onClick = () => {
    if (props.game.type === "folder") {
      props.intoFolder(props.game.value);
    }
  };

  const date = createMemo(() => {
    const rawDate = props.game.date;

    if (rawDate === "-") {
      return "-";
    }

    return new Date(rawDate).toLocaleString();
  });

  return (
    <div
      class="py-3 px-2 border-b-2 hover:bg-gray-100 space-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div class="flex items-center space-x-2">
        <Icon name={props.game.type === "file" ? faFile : faFolder} />
        <span class="overflow-hidden text-ellipsis whitespace-nowrap">
          {props.game.name}
        </span>
      </div>
      <div class="flex justify-between">
        <div>Size: {props.game.size}</div>
        <div>Date: {date()}</div>
      </div>
    </div>
  );
};

interface ListProps {
  items: GameItem[];
  intoFolder: (folder: string) => void;
}

export default (props: ListProps) => {
  let listRef: HTMLDivElement | undefined;

  const virtualizer = createMemo(() => createVirtualizer({
    count: props.items.length,
    getScrollElement: () => listRef,
    estimateSize: () => 82,
  }));

  return (
    <div
      class="bg-white p-4 overflow-auto flex-1"
      ref={listRef}
    >
      <div
        class="w-full relative"
        style={{ height: `${virtualizer().getTotalSize()}px` }}
      >
        <For each={virtualizer().getVirtualItems()}>
          {(item) => (
            <div
              class="absolute top-0 left-0 w-full"
              style={{
                height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
              }}
            >
              <ListItem
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
