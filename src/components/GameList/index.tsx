import { Show } from "solid-js";
import { rootList } from "~/data/constants";
import ListLoader from "./ListLoader";
import List from "./List";

interface GameListProps {
  position: string[];
  intoFolder: (folder: string) => void;
}

export default (props: GameListProps) => (
  <div class="flex-1 flex flex-col overflow-auto">
    <Show
      when={props.position.length > 0}
      fallback={(
        <List
          items={rootList}
          intoFolder={props.intoFolder}
        />
      )}
    >
      <ListLoader {...props} />
    </Show>
  </div>
);