import { useRef } from "react";

export const MainPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
       if (inputRef.current) {
           inputRef.current.focus();
       }
    }
    return (
        <div>
          <input ref={inputRef} type="text" />
          <button onClick={handleButtonClick}>Focus Input</button>
        </div>
      );
}