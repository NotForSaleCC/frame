import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function createPortalRoot(name) {
  const portal = document.createElement("div");
  portal.setAttribute("id", name);

  return portal;
}

export default function usePortal(id) {
  const elementRef = useRef(null);

  useEffect(() => {
    const foundRoot = document.getElementById(id);
    const rootElem = foundRoot || createPortalRoot(id);

    if (!foundRoot) document.body.appendChild(rootElem);
    rootElem.appendChild(elementRef.current);

    return () => {
      if (elementRef.current)
        elementRef.current.parentNode?.removeChild(elementRef.current);
      if (rootElem.childNodes.length < 1)
        rootElem.parentNode?.removeChild(rootElem);
    };
  }, []);

  if (!elementRef.current) elementRef.current = document.createElement("div");

  return {
    portal: elementRef.current,
    teleport(children) {
      return createPortal(children, elementRef.current);
    },
  };
}
