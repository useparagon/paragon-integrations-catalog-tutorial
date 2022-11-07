import { useCallback, useEffect, useRef, useState } from "react";

export default function useParagonGlobal() {
  const mountedParagon = useRef(false);
  const [paragonReady, setParagonReady] = useState(false);

  const initParagon = useCallback(async () => {
    setParagonReady(true);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !paragonReady &&
      !mountedParagon.current
    ) {
      if (window.paragon) {
        initParagon();
      } else {
        mountedParagon.current = true;
        const paragonSrc = document.createElement("script");
        paragonSrc.src = "https://cdn.useparagon.com/latest/sdk/index.js";
        paragonSrc.onload = initParagon;
        document.body.appendChild(paragonSrc);
      }
    }
  }, [paragonReady, initParagon]);

  if (paragonReady && window.paragon) {
    return window.paragon;
  }
  return undefined;
}
