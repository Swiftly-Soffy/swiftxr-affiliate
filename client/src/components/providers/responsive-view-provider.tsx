import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";

type ResponsiveViewContextProps = {
    isMobile: boolean
    children?: ReactNode
}

const ResponsiveViewContext = createContext<ResponsiveViewContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useResponsiveViewContext = () => {
    const context = useContext(ResponsiveViewContext);
    if (!context) {
        throw new Error('useResponsiveViewContext must be used within a ComponentProvider');
    }
    return context;
}

export const ResponsiveViewContextProvider: React.FC<ResponsiveViewContextProps> = ({ children, isMobile }) => {

    return (

        <ResponsiveViewContext.Provider value={{ isMobile }}>
            {children}
        </ResponsiveViewContext.Provider>

    )
}
