import { Button, Modal, Col, Row, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { postCreateCategoryAPI } from '../../services/api.service';
import { ICatagory, NotificationRes } from '../../pages/category';

interface IProps {
    loadCategories: () => void;
}

const notificationData: NotificationRes = {
    title: "Create Book",
    description: "Create book success!!!"
};

const CategoryModal = (props: IProps) => {
    const { loadCategories } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values: ICatagory) => {
        console.log("check data: ", values)
        setLoading(true)
        const res = await postCreateCategoryAPI(values.categoryCode, values.name, values.description)
        if (res && res.data) {
            notification.success({
                message: notificationData.title,
                description: notificationData.description
            })

            loadCategories();
        }
        else {
            notification.error({
                message: notificationData.title,
                description: "failed!!!"
            })
        }
        setLoading(false)
        setIsModalOpen(false);
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Category Form</h3>
                <Button type="primary" onClick={() => { showModal() }}>Create category</Button>
                <Modal title="Create" open={isModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel} maskClosable={false} okText="Create" okButtonProps={{ loading: loading }}>
                    <Form
                        form={form}
                        name="layout-multiple-horizontal"
                        layout="vertical"
                        onFinish={onFinish}
                    >

                        <Row justify={"center"}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="categoryCode"
                                    name="categoryCode"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your categoryCode!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} placeholder="Arts" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="description"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your description!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </>
    )
}
export default CategoryModal;