import { useEffect, useState } from "react";
import CategoryTable from "../components/category/category.table";
import { getCategoryAPI } from "../services/api.service";
import CategoryModal from "../components/category/category.create";

export interface ICatagory {
    "id": number,
    "categoryCode": string,
    "name": string,
    "description": string
}

export interface NotificationRes {
    title: string;
    description: string;
}

const Category = () => {
    const [dataCategories, setDateCategories] = useState<ICatagory[] | null>([]);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);

    const loadCategories = async () => {
        const res = await getCategoryAPI(current, pageSize);
        if (res && res.data) {
            setDateCategories(res.data.content);
            setTotal(res.data.totalPages)
        }

    }
    useEffect(() => {
        loadCategories();
    }, [current, pageSize])
    return (
        <>
            <CategoryModal
                loadCategories={loadCategories}
            ></CategoryModal>
            <CategoryTable
                loadCategories={loadCategories}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                dataCategories={dataCategories}
                pageSize={pageSize}
                current={current}
                total={total}
            />
        </>
    )
}
export default Category;