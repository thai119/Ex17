import { Modal, Col, Row, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { putUpdateCategoryAPI } from '../../services/api.service';
import { ICatagory, NotificationRes } from '../../pages/category';

interface IProps {
    loadCategories: () => void;
    isModalUpdate: boolean;
    setIsModalUpdate: (value: boolean) => void;
    dataUpdate: ICatagory;
    setDataUpdate: (value: ICatagory) => void;
}

const dataUpdateN: ICatagory = {
    "id": 0,
    "categoryCode": "",
    "name": "",
    "description": ""
}

const notificationData: NotificationRes = {
    title: "Update Book",
    description: "Update book success!!!"
};
const CategoryUpdate = (props: IProps) => {
    const { loadCategories, isModalUpdate, setIsModalUpdate, dataUpdate, setDataUpdate } = props;
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalUpdate(true);
    };
    const handleOk = () => {
        setDataUpdate(dataUpdateN)
        setIsModalUpdate(false);
    };
    const handleCancel = () => {
        setDataUpdate(dataUpdateN)
        setIsModalUpdate(false);
    };


    const onFinish = async (values: ICatagory) => {
        const res = await putUpdateCategoryAPI(values.id, values.categoryCode, values.name, values.description)
        if (res && res.data) {
            notification.success({
                message: notificationData.title,
                description: notificationData.description
            })
            loadCategories();
        }
        setIsModalUpdate(false);
    }


    return (
        <>
            {dataUpdate ?
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Modal title="Create" open={isModalUpdate} onOk={() => { form.submit() }} onCancel={handleCancel} maskClosable={false} okText="Create" okButtonProps={{ loading: loading }}>
                        <Form
                            form={form}
                            name="layout-multiple-horizontal"
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                                "categoryCode": dataUpdate.categoryCode,
                                "name": dataUpdate.name,
                                "description": dataUpdate.description
                            }}
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
                                        <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
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
                :
                <a></a>
            }
        </>
    )
}
export default CategoryUpdate;