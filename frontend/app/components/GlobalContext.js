import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from 'expo-secure-store';

const Context = createContext();

const Provider = ({ children }) => {
    const [domain, setDomain] = useState("http://127.0.0.1:8000");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appSettings, setAppSettings] = useState({});
    const [userObj, setUserObj] = useState()

    const setToken = async (token) => {
        await SecureStore.setItemAsync('token', JSON.stringify(token));
    }

    const initAppSettings = () => {
        fetch(`${domain}/api/v1.0/app/settings`, { method: 'GET' })
            .then(res => res.ok ? res.json() : res.json())
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
        userObj, 
        setUserObj,
        setToken,
    };

    return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export { Context, Provider };
