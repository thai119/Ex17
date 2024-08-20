import { notification, Popconfirm, Space, Table } from 'antd';
import type { GetProp, TablePaginationConfig, TableProps } from 'antd';
import { ICatagory, NotificationRes } from '../../pages/category';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CategoryUpdate from './category.update';
import { useState, useEffect } from 'react';
import { deleteCategoryAPI } from '../../services/api.service';
import { SorterResult } from 'antd/es/table/interface';

interface IProps {
    loadCategories: () => void;
    setCurrent: (value: number) => void;
    setPageSize: (value: number) => void;
    dataCategories: ICatagory[] | null;
    pageSize: number;
    current: number;
    total: number;
}

const notificationConfirm: NotificationRes = {
    title: "Delete category",
    description: "Delete category success!!!"
};

const notificationDeny: NotificationRes = {
    title: "Delete category failed",
    description: "Delete category failed!!!"
};

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const CategoryTable = (props: IProps) => {
    const { dataCategories, pageSize, current, total, setCurrent, setPageSize, loadCategories } = props;
    const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<ICatagory>({
        id: 0,
        categoryCode: "",
        name: "",
        description: ""
    });
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const columns: TableProps<ICatagory>['columns'] = [
        {
            title: 'STT',
            render: (_, __, index) => {
                return <>{index + 1 + (pageSize * (current - 1))}</>;
            },
        },
        {
            title: 'Id',
            dataIndex: 'id',
            render: (_, record) => {
                return (
                    <>
                        <a
                            onClick={() => {
                                // Add any necessary logic here
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            {record.id}
                        </a>
                    </>
                );
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'categoryCode',
            dataIndex: 'categoryCode',
        },
        {
            title: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined
                        style={{ color: 'orange' }}
                        onClick={() => {
                            setIsModalUpdate(true);
                            setDataUpdate(record);
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onChange = (pagination: TablePaginationConfig) => {
        setCurrent(pagination.current || 1);
        setPageSize(pagination.pageSize || 10);
        loadCategories(); // Reload data after pagination or sorting change
    };

    const confirmDelete = async (id: number) => {
        const res = await deleteCategoryAPI(id);
        if (res && res.data) {
            notification.success({
                message: notificationConfirm.title,
                description: notificationConfirm.description,
            });
            loadCategories(); // Reload data after successful deletion
        } else {
            notification.error({
                message: notificationDeny.title,
                description: notificationDeny.description,
            });
        }
    };

    const cancel = () => {
        console.log("not delete!!");
    };

    const handleTableChange: TableProps<ICatagory>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
        onChange(pagination); // Ensure the table refreshes on change
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataCategories || []}
                rowKey="id"
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => (
                        <div>
                            {range[0]} - {range[1]} trên {total} rows
                        </div>
                    ),
                }}
                onChange={handleTableChange}
            />
            <CategoryUpdate
                isModalUpdate={isModalUpdate}
                setIsModalUpdate={setIsModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadCategories={loadCategories}
            />
        </>
    );
};

export default CategoryTable;
