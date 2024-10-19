import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkSide } from "../customHooks/useDarkSide"

export const DarkMode = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const colorSchema = colorTheme === 'light'
    const toggleDarkMode = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
      };
    return   <DarkModeSwitch
    checked={colorSchema}
    onChange={toggleDarkMode}
    size={22}
/>
}

