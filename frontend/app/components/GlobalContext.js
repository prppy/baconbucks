import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from 'expo-secure-store';

const Context = createContext();

const Provider = ({ children }) => {
    const [domain, setDomain] = useState("https://baconbuck-heroku-9f95201c7a14.herokuapp.com");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appSettings, setAppSettings] = useState({});
    const [userObj, setUserObj] = useState()

    const setToken = async (token) => {
        await SecureStore.setItemAsync('token', JSON.stringify(token));
    }

    const initTest = () => {
        fetch(`${domain}/api/v1.0/user/test`, { method: 'GET' })
            .then(res => res.ok ? res.json() : res.json())
            .then(json => {
                console.log(json);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        initTest();
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
