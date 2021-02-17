import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [pageName, setPageName] = useState("");
    const [selectedLaunch, setSelectedLaunch] = useState();

    const provider = {
        pageName,
        setPageName,
        selectedLaunch, 
        setSelectedLaunch,
    };

    return (
        <GlobalContext.Provider value={provider}>
            {children}
        </GlobalContext.Provider>
    );
};