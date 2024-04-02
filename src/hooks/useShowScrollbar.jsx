import { useEffect } from "react";

export function useShowScrollbar() {
  useEffect(() => {
    // document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
}
