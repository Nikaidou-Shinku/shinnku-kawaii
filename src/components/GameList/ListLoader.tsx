import { Match, Switch, createEffect, createSignal } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import Fuse from "fuse.js";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { GameItem } from "~/data/interface";
import { shuffleArray } from "~/utils";
import { Icon } from "~/components";
import List from "./List";

const fetchGameList = async (account: string, position: string[]) => {
  const target = position.join("/");
  const resp = await fetch(`/api/download/${account}/${target}`);

  interface GameInfo {
    "@type": "file" | "folder";
    date: string;
    name: string;
    size: string;
  }

  const res: GameInfo[] = await resp.json();

  return res.map((g) => ({
    type: g["@type"],
    name: g.name,
    value: g.name,
    date: g.date,
    size: g.size,
  }));
};

interface ListLoaderProps {
  position: string[];
  intoFolder: (folder: string) => void;
}

export default (props: ListLoaderProps) => {
  const query = createQuery(
    () => props.position,
    () => fetchGameList("04", props.position), // TODO: load balance
  );

  const [searchStr, setSearchStr] = createSignal("");

  const [fuse, setFuse] = createSignal<Fuse<GameItem>>();
  const [list, setList] = createSignal<GameItem[]>([]);

  const search = () => {
    const key = searchStr().trim();

    if (key === "") {
      setList(shuffleArray([...query.data!]));
      return;
    }

    const tFuse = fuse();

    if (typeof tFuse === "undefined") {
      throw "Fuse is undefined!";
    }

    const res = tFuse.search(key);

    setList(res.map((item) => item.item));
  };

  createEffect(() => {
    if (query.isSuccess) {
      setFuse(new Fuse(query.data, { keys: ["name"], includeScore: true }));
      setList(shuffleArray([...query.data]));
    }
  });

  return (
    <Switch>
      <Match when={query.isLoading}>
        <div class="bg-white flex-1 flex items-center justify-center text-2xl">
          <div class="animate-spin">
            <Icon name={faSpinner} />
          </div>
          <div class="pl-1">Loading...</div>
        </div>
      </Match>
      <Match when={query.isError}>Error: {`${query.error}`}</Match>
      <Match when={query.isSuccess}>
        <form
          class="border-b-2"
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
          <input
            class="w-full py-2 px-4"
            placeholder="Search..."
            onChange={(e) => setSearchStr(e.currentTarget.value)}
          />
        </form>
        <List
          items={list()}
          position={props.position}
          intoFolder={props.intoFolder}
        />
      </Match>
    </Switch>
  );
};
