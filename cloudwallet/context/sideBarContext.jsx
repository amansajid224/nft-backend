import { createContext, useContext, useState } from "react";
const SideBarContext = createContext({});
export const useSideBarContext = () => useContext(SideBarContext);

export const SideBarProvider = ({ children }) => {
  const [toggleProfile, setToggleProfile] = useState(false);
  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <SideBarContext.Provider
      value={{
        toggleProfile,
        setToggleProfile,
        toggleSideBar,
        setToggleSideBar,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
