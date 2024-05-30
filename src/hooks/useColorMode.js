import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useColorMode() {
  const[colorMode, setColorMode] = useLocalStorage('color-mode', 'dark');

  useEffect(() => {
    const className = 'light';
    const bodyClasses = window.document.documentElement.classList;
  
    colorMode === 'dark' ? bodyClasses.add(className) : bodyClasses.remove(className);
  }, [colorMode]);
  
  return [colorMode, setColorMode];
}

export default useColorMode;