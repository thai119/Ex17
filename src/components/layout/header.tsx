import { useState } from 'react';
import { AliwangwangOutlined, DatabaseOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];
const Header = () => {
    const items: MenuItem[] = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/categories">Categories</Link>,
            key: 'categories',
            icon: <DatabaseOutlined />,
        },
        {
            label: <Link to="/login">Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }
        ,
        {
            label: `Welcome `,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <><span>Logout</span></>,
                    key: "logout"
                }
            ]
        }
        ,

    ];

    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </>
    )
}
export default Header;