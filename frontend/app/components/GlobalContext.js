import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from 'react-native';

const Context = createContext();

const Provider = ({ children }) => {
    const [domain, setDomain] = useState("https://baconbuck-heroku-9f95201c7a14.herokuapp.com");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appSettings, setAppSettings] = useState({});
    const [userObj, setUserObj] = useState()

    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme);

    const setToken = async (token) => {
        await SecureStore.setItemAsync('access_token', token);
    };

    const getToken = async () => {
        return await SecureStore.getItemAsync('access_token');
    };

    const clearTokens = async () => {
        await SecureStore.deleteItemAsync('access_token');
    };

    const refreshToken = async () => {
        try {
            const refresh_token = await SecureStore.getItemAsync('refresh_token');
            if (!refresh_token) {
                throw new Error('Refresh token not found');
            }
    
            const response = await fetch(`${domain}/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refresh_token }),
            });
    
            if (response.ok) {
                const { access } = await response.json();
                await SecureStore.setItemAsync('access_token', access);
                return access;
            } else {
                throw new Error('Failed to refresh token');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    };

    const fetchData = async (url, method = 'GET', body = null) => {
        try {
            let access_token = await SecureStore.getItemAsync('access_token');
            if (!access_token) {
                access_token = await refreshToken(); // Attempt to refresh token
            }
    
            const options = {
                method: method,
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : null,
            };
    
            const response = await fetch(`${domain}/${url}`, options);
    
            if (response.ok) {
                const data = await response.json();
                console.log('Data fetched successfully:', data);
                return data;
            } else {
                console.error('Failed to fetch data:', response.statusText);
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw error;
        }
    };

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

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect( () => { 
        initTest();
        setTheme(systemTheme);
    }, [systemTheme]);

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn, 
        appSettings, 
        setAppSettings,
        userObj, 
        setUserObj,
        setToken,
        fetchData, 
        theme, 
        toggleTheme,
    };

    return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export { Context, Provider };