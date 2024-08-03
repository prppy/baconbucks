import React, { useState, useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "react-native";
import colors from "../config/colors";

const Context = createContext();

const Provider = ({ children }) => {
    const [domain, setDomain] = useState(
        "https://backonbucks-05fec980cd2b.herokuapp.com/api/v1.0"
    );
    const [userObj, setUserObj] = useState();

    const systemTheme = useColorScheme();
    const [isLightTheme, setIsLightTheme] = useState(systemTheme === "light");

    const [isLargeFont, setIsLargeFont] = useState(false);

    const defaultFontSizes = {
        thirteen: 13,
        fourteen: 14,
        fifteen: 15,
        sixteen: 16,
        eighteen: 18,
        twenty: 20,
        twentyfour: 24,
        thirty: 30,
        twohundred: 200, //to adjust width & height of modal
    };

    const getLargerFontSizes = () => {
        const largerFontSizes = {};
        for (const key in defaultFontSizes) {
            if (defaultFontSizes.hasOwnProperty(key)) {
                const originalSize = defaultFontSizes[key];
                let adjustedSize = originalSize;

                // Adjust font size based on specific conditions
                if (originalSize === 200) {
                    adjustedSize += 30; // Add 30 to font size 200
                } else {
                    adjustedSize += 4; // Default adjustment for other sizes
                }

                largerFontSizes[key] = adjustedSize;
            }
        }
        return largerFontSizes;
    };

    const setToken = async (token) => {
        await SecureStore.setItemAsync("access_token", token);
    };

    const getToken = async () => {
        return await SecureStore.getItemAsync("access_token");
    };

    const clearToken = async () => {
        await SecureStore.deleteItemAsync("access_token");
    };

    const setRefresh = async (token) => {
        await SecureStore.setItemAsync("refresh_token", token);
    };

    const getRefresh = async () => {
        return await SecureStore.getItemAsync("refresh_token");
    };

    const clearRefresh = async () => {
        await SecureStore.deleteItemAsync("refresh_token");
    };

    const refreshToken = async () => {
        try {
            const refresh_token = await getRefresh();
            if (!refresh_token) {
                throw new Error("Refresh token not found");
            }

            const response = await fetch(`${domain}/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refresh_token }),
            });

            if (response.ok) {
                const { access } = await response.json();
                await setToken(access);
                const user = await fetchData("user/get-user/");
                setUserObj(user);
                return access;
            } else {
                throw new Error("Failed to refresh token");
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    };

    const updateUserDetails = async () => {
        const json = await fetchData("user/get-user/");
        setUserObj(json);
    };

    const fetchData = async (url, method = "GET", body = null) => {
        try {
            // Function to attempt fetch with given token
            const attemptFetch = async (token) => {
                const options = {
                    method: method,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: body ? JSON.stringify(body) : null,
                };

                const response = await fetch(`${domain}/${url}`, options);

                if (response.ok) {
                    return await response.json();
                } else {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                }
            };

            // Try fetching with the current token
            let access_token = await getToken();
            try {
                return await attemptFetch(access_token);
            } catch (fetchError) {
                // Check if the error indicates an invalid token
                if (fetchError.message.includes("token_not_valid")) {
                    // Attempt to refresh the token
                    access_token = await refreshToken();
                    // Retry fetch with the new token
                    return await attemptFetch(access_token);
                } else {
                    // Re-throw any other errors
                    throw fetchError;
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
            throw error;
        }
    };

    const initTest = () => {
        fetch(`${domain}/user/test`, { method: "GET" })
            .then((res) => (res.ok ? res.json() : res.json()))
            .then((json) => {
                console.log(json);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const toggleTheme = () => {
        setIsLightTheme((prevTheme) => !prevTheme);
    };

    const toggleFontSize = () => {
        setIsLargeFont((prevState) => !prevState);
    };

    useEffect(() => {
        initTest();
        setIsLightTheme(systemTheme === "light");
    }, [systemTheme]);

    const globalContext = {
        domain,
        userObj,
        setUserObj,
        setToken,
        fetchData,
        isLightTheme,
        toggleTheme,
        getToken,
        isLargeFont,
        toggleFontSize,
        getLargerFontSizes,
        defaultFontSizes,
        setRefresh,
        updateUserDetails,
    };

    return (
        <Context.Provider value={globalContext}>{children}</Context.Provider>
    );
};

export { Context, Provider };
