import React, { useState, useEffect, createContext } from "react";

const Context = createContext();

const Provider = ({ children }) => {
    const [domain, setDomain] = useState("http://127.0.0.1:8000");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appSettings, setAppSettings] = useState({});
    const [token, setToken] = useState()

    const initAppSettings = () => {
        fetch(`${domain}/api/v1.0/app/settings`, { method: 'GET' })
            .then(res => res.ok ? res.json() : Promise.reject(res.json()))
            .then(json => {
                console.log(json);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        initAppSettings();
    }, []);

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn, 
        appSettings, 
        setAppSettings,
        token, 
        setToken,
    };

    return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export { Context, Provider };
