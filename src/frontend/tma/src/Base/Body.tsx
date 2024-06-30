import { FC, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { About, Main, NotFound, RouteDetails, RoutesList } from "./Pages";

export const Body: FC = () => {
  const [appInit, setAppInit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  if (appInit) {
    localStorage.setItem("lastVisitedPath", JSON.stringify(location));
  }
  
  useEffect(() => {
    const lastVisitedRaw = localStorage.getItem("lastVisitedPath");
    if (!!lastVisitedRaw && !appInit) {
      const lastVisitedPath = JSON.parse(lastVisitedRaw);
      navigate(lastVisitedPath.pathname);
    }
    setAppInit(true);
    return () => { };
  }, []);
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
