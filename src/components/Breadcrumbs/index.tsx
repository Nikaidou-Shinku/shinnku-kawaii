import { For, Setter } from "solid-js";

interface ItemProps {
  order: number;
  value: string;
  setPosition: Setter<string[]>;
}

const Item = (props: ItemProps) => {
  const jump = () => props.setPosition((prev) => prev.slice(0, props.order));

  return (
    <span
      class="cursor-pointer hover:underline"
      onClick={jump}
    >
      {props.value}
    </span>
  );
};

interface BreadcrumbsProps {
  position: string[];
  setPosition: Setter<string[]>;
}

export default (props: BreadcrumbsProps) => (
  <div>
    <Item
      order={0}
      value="Root"
      setPosition={props.setPosition}
    />
    <For each={props.position}>
      {(item, i) => (
        <>
          <span> / </span>
          <Item
            order={i() + 1}
            value={item}
            setPosition={props.setPosition}
          />
        </>
      )}
    </For>
  </div>
);
