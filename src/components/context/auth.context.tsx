import React, { createContext, useState, ReactNode } from 'react';

// Define the User interface
export interface User {
    email: string;
    fullName: string;
    id: string;
}

// Define the context structure
interface AuthContextProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    isAppLoading: boolean;
    setIsAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create AuthContext with default values
export const AuthContext = createContext<AuthContextProps>({
    user: { email: '', fullName: '', id: '' },
    setUser: () => { },
    isAppLoading: true,
    setIsAppLoading: () => { },
});

// Define the props for AuthWrapper
interface IProps {
    children: ReactNode; // Ensures the component can wrap other components
}

export const AuthWrapper: React.FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<User>({
        email: '',
        fullName: '',
        id: '',
    });
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
