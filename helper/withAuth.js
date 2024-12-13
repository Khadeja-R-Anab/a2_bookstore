import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login"); // Redirect to login if not logged in
      }
    }, [user, router]);

    // Render the component only if the user is logged in
    if (!user) return null;
    return <Component {...props} />;
  };
}
