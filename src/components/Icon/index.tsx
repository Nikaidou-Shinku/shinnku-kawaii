import { IconDefinition, icon } from "@fortawesome/fontawesome-svg-core";

interface IconProps {
  name: IconDefinition;
}

export default (props: IconProps) => icon(props.name).node[0];
