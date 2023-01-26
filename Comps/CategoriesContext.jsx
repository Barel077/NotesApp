import { useNavigation } from "@react-navigation/native";
import { useContext, createContext, useState } from "react";
import { useTheme } from "react-native-paper";

const CategoriesContext = createContext(null);

export function useCategories() {
    return useContext(CategoriesContext);
}

export default function CategoriesProvider({ children }) {
    const theme = useTheme();
    const nav = useNavigation();
    const [categories, setCategories] = useState([]);

    const value = {
        theme,
        nav,
        categories,
        setCategories
    }

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}
