import { useEffect, useState } from "react";

export const useTinkoffScript = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "tinkoff-script";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      setScriptLoaded(true);
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js";
      script.async = true;
      script.onload = () => {
        console.log("Tinkoff script successfully loaded");
        setScriptLoaded(true);
      };
      script.onerror = () => {
        console.error("Error loading Tinkoff script. Check URL and network.");
      };
      document.body.appendChild(script);
    }
  }, []);

  return scriptLoaded;
};
