import { isEmpty } from "lodash-es";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export const AuthCheck = (props) => {
  const router = useRouter();
  const { user, token } = useAuth();
  if (typeof window !== "undefined" && isEmpty(user) && token) {
    router.push("login");
  }
};
