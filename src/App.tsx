import { Route, Routes } from "@solidjs/router";
import { Home } from "./Pages";

export default () => (
  <Routes>
    <Route path="/" component={Home} />
  </Routes>
);
