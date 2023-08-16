import { isEmpty } from "@chakra-ui/utils";
import Pusher from "pusher-js";
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const PusherContext = createContext({});
export const usePusherContext = () => useContext(PusherContext);

export const PusherContextProvider = ({ children }) => {
  const { user } = useAuth();
  const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
  const config = {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    encrypted: true,
  };
  useEffect(() => {
    const pusherInstance = new Pusher(PUSHER_APP_KEY, config);
    if (!isEmpty(user)) {
      const channel = pusherInstance.subscribe(user?.id);
      channel.bind("new-notifications", listenNotifications);
    }
  }, [user?.id]);

  function listenNotifications(data) {
    console.log("data", data);
  }

  return <PusherContext.Provider value={{}}>{children}</PusherContext.Provider>;
};
