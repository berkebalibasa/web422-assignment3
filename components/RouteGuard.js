import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

export default function RouteGuard(props) {
  const router = useRouter();

  const PUBLIC_PATHS = ["/login", "/register", "/about"]; 
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    try {
      const data = await getFavourites();
      setFavouritesList(data);
    } catch (err) {
      console.log("Failed to load favourites", err);
    }
  }

  useEffect(() => {
    const path = router.pathname;

    const token = localStorage.getItem("token");

// public pages allowed
    if (PUBLIC_PATHS.includes(path)) {
      return;
    }

// If accessing a protected page without token just redirect to login
    if (!token) {
      router.push("/login");
    } else {
      updateAtom();
    }
  }, [router.pathname]);

  return <>{props.children}</>;
}
