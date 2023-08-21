import { Show, createMemo } from "solid-js";
import { ContextMenu } from "@kobalte/core";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { GameItem } from "~/data/interface";
import { showToast } from "~/utils/toast";
import { Icon } from "~/components";

interface ListItemProps {
  parent: string[];
  game: GameItem;
  intoFolder: (folder: string) => void;
}

export default (props: ListItemProps) => {
  const getUrl = () => {
    const target = [...props.parent, props.game.value].join("/");
    return `https://shinnku.com/api/download/04/${target}`; // TODO: load balance
  };

  const onClick = () => {
    if (props.game.type === "folder") {
      props.intoFolder(props.game.value);
    } else {
      const url = getUrl();
      window.open(url);
    }
  };

  const copyLink = async () => {
    const url = getUrl();

    try {
      await window.navigator.clipboard.writeText(url);
      showToast("Successfully copied!", url);
    } catch (err: any) {
      showToast("Error occurred", `${err}`);
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
    <ContextMenu.Root>
      <ContextMenu.Trigger>
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
            <div class="hidden sm:block">Date: {date()}</div>
          </div>
        </div>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content class="bg-white min-w-[200px] p-2 rounded-md border shadow outline-0">
          <Show
            when={props.game.type === "file"}
            fallback={(
              <ContextMenu.Item
                class="p-2 hover:bg-blue-600 hover:text-white rounded select-none outline-0"
                onSelect={onClick}
              >
                Open
              </ContextMenu.Item>
            )}
          >
            <ContextMenu.Item
              class="p-2 hover:bg-blue-600 hover:text-white rounded select-none outline-0"
              onSelect={onClick}
            >
              Download
            </ContextMenu.Item>
            <ContextMenu.Item
              class="p-2 hover:bg-blue-600 hover:text-white rounded select-none outline-0"
              onSelect={copyLink}
            >
              Copy link
            </ContextMenu.Item>
          </Show>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
