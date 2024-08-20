import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import { AuthContext } from '../components/context/auth.context';
import { getAccountAPI } from '../services/api.service';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user, setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const location = useLocation();

    const fetchAndSetUser = async () => {
        try {
            const res = await getAccountAPI();
            if (res && res.data) {
                setUser({
                    email: res.data.email,
                    fullName: res.data.fullName,
                    id: res.data.id,
                });
                console.log("check data: ", user);
            }
        } catch (error) {
            console.error("Failed to fetch account data: ", error);
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    };

    useEffect(() => {
        if (isAppLoading) {
            fetchAndSetUser();
            setIsAppLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [isAppLoading, setIsAppLoading]);

    if (isLoading) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    if (user && user.id) {
        return <>{children}</>;
    } else {
        return (
            <Result
                status="403"
                title="Opps!!!"
                subTitle="You need to log in to access this resource!"
                extra={
                    <Button type="primary">
                        <Navigate to="/login" state={{ from: location }} replace />
                    </Button>
                }
            />
        );
    }
};

export default PrivateRoute;
