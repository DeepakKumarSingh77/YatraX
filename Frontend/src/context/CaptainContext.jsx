// CaptainContext.js
import { createContext, useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContextProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    // console.log("Captain Context Provider", captain);
    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContextProvider;
