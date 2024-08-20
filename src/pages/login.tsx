import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import './login.css'
import { loginAPI } from '../services/api.service';
import { useNavigate } from 'react-router';

interface LoginFormValues {
    username: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values: LoginFormValues) => {
        localStorage.removeItem("access_token");
        try {
            const res = await loginAPI(values.username, values.password);
            console.log("check res: ", res);
            if (res.data && res.data.token) {
                localStorage.setItem("access_token", res.data.token);
                notification.success({
                    message: "Login successful",
                    description: "You have successfully logged in."
                });
                navigate("/");
            } else {
                notification.error({
                    message: "Login failed",
                    description: "An unexpected error occurred. Please try again."
                });
            }
        } catch (error) {
            // Handle API errors or other unexpected errors here
            console.error("Login error:", error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login-form'>
            <div className="form-container">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
