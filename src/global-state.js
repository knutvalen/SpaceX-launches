import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [pageName, setPageName] = useState("");

    const provider = {
        pageName,
        setPageName
    };

    return (
        <GlobalContext.Provider value={provider}>
            {children}
        </GlobalContext.Provider>
    );
};