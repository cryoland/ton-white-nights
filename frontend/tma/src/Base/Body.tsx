import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { About, Main, NotFound, RouteDetails, RoutesList } from "./Pages";

export const Body: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/routes" element={<RoutesList />} />
      <Route path="/routes/:routeId" element={<RouteDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
