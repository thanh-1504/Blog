import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();
function SidebarProvider(props) {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  function handleToggleSidebar() {
    setToggleSidebar(!toggleSidebar);
  }
  return (
    <SidebarContext.Provider
      value={{ toggleSidebar, handleToggleSidebar, setToggleSidebar }}
      {...props}
    ></SidebarContext.Provider>
  );
}
function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (typeof context === "undefined") throw Error("Some thing was wrong!");
  return context;
}
export { SidebarProvider, useSidebarContext };
