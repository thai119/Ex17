import axios from "./axios.customize";

const loginAPI = (email: String, password: String) => {
    const URL_BACKEND = "/auth/login"
    const data = {
        email: email,
        password: password,
    }
    return axios.post(URL_BACKEND, data)
}

const getCategoryAPI = (current: number, size: number) => {
    const URL_BACKEND = `/admin/categories?current=${+current}&size=${+size}`;
    return axios.get(URL_BACKEND);
}

const postCreateCategoryAPI = (categoryCode: string, name: string, description: string) => {
    const URL_BACKEND = `/admin/categories`;
    const data = {
        categoryCode, name, description
    }
    return axios.post(URL_BACKEND, data);
}
const putUpdateCategoryAPI = (id: number, categoryCode: string, name: string, description: string) => {
    const URL_BACKEND = `/admin/categories/${id}`;
    const data = {
        categoryCode, name, description
    }
    return axios.put(URL_BACKEND, data);
}

const deleteCategoryAPI = (id: number) => {
    const URL_BACKEND = `/admin/categories/${id}`;
    return axios.delete(URL_BACKEND);
}


const getAccountAPI = () => {
    const URL_BACKEND = "/auth/account";
    return axios.get(URL_BACKEND);
}

export {
    loginAPI, getAccountAPI,
    getCategoryAPI, postCreateCategoryAPI, putUpdateCategoryAPI, deleteCategoryAPI
}