import { Helper } from "./helper";

const extract_params = (params) => {

    let urlParams = '';
    for (var i = 0; i < params.length; i++)
        urlParams += `&${Object.entries(params[i])[0][0]}=${Object.entries(params[i])[0][1]}`;
    return urlParams;
};

export async function login(data) {
    return Helper.Post({ url: `/admin/auth/login`, data });
}

export async function getBrands(page = 1, params = []) {
    return Helper.Get(`/admin/brands?page=${page}&per_page=10${extract_params(params)}`);
};

export async function getBrandById(id) {
    return Helper.Get(`/admin/brands/${id}`);
};

export async function addBrands(data) {
    return Helper.Post({ url: `/admin/brands`, data });
};

export async function updateBrands(id, data) {
    return Helper.Post({ url: `/admin/brands/${id}`, data });
};

export async function deleteBrands(id) {
    return Helper.Delete({ url: `/admin/brands/${id}` });
};

export async function getModels(page = 1, params = []) {
    return Helper.Get(`/admin/models?page=${page}&per_page=10${extract_params(params)}`);
};

export async function addModels(data) {
    return Helper.Post({ url: `/admin/models`, data });
};

export async function deleteModels(id) {
    return Helper.Delete({ url: `/admin/models/${id}` });
};

export async function getModelById(id) {
    return Helper.Get(`/admin/models/${id}`);
};

export async function updateModels(id, data) {
    return Helper.Put({ url: `/admin/models/${id}`, data });
};

export async function getOffers(page = 1) {
    return Helper.Get(`/admin/offers?page=${page}&per_page=10`);
};

export async function getOfferById(id) {
    return Helper.Get(`/admin/offers/${id}`);
};

export async function addOffers(data) {
    return Helper.Post({ url: `/admin/offers`, data });
};

export async function updateOffers(id, data) {
    return Helper.Put({ url: `/admin/offers/${id}`, data });
};

export async function deleteOffers(id) {
    return Helper.Delete({ url: `/admin/offers/${id}` });
};

export async function getStores(page = 1, params = []) {
    return Helper.Get(`/admin/stores?page=${page}&per_page=10${extract_params(params)}`);
};

export async function addStores(data) {
    return Helper.Post({ url: `/admin/stores`, data });
};

export async function getStoreById(id) {
    return Helper.Get(`/admin/stores/${id}`);
};

export async function updateStores(id, data) {
    return Helper.Post({ url: `/admin/stores/${id}`, data });
};

export async function deleteStores(id) {
    return Helper.Delete({ url: `/admin/stores/${id}` });
};

export async function getProducts(page = 1, params = []) {
    return Helper.Get(`/admin/products?page=${page}&per_page=10${extract_params(params)}`);
};

export async function addProducts(data) {
    return Helper.Post({ url: `/admin/products`, data });
};

export async function updateProducts(id, data) {
    return Helper.Post({ url: `/admin/products/${id}`, data });
};

export async function deleteProducts(id) {
    return Helper.Delete({ url: `/admin/products/${id}` });
};

export async function getProductsById(id) {
    return Helper.Get(`/products/${id}`);
};

export async function getRoles(page = 1, params = []) {
    return Helper.Get(`/admin/roles?page=${page}&per_page=10${extract_params(params)}`);
};

export async function addRoles(data) {
    return Helper.Post({ url: `/admin/roles`, data });
};

export async function getRoleById(id) {
    return Helper.Get(`/admin/roles/${id}`);
};

export async function updateRoles(id, data) {
    return Helper.Put({ url: `/admin/roles/${id}`, data });
};

export async function updatePermissions(id, data) {
    return Helper.Put({ url: `/admin/roles/permissions/${id}`, data });
};

export async function delelteRoles(id) {
    return Helper.Delete({ url: `/admin/roles/${id}` });
};

export async function getServices(page = 1, params = []) {
    return Helper.Get(`/admin/services?page=${page}&per_page=10${extract_params(params)}`);
};

export async function addServices(data) {
    return Helper.Post({ url: `/admin/services`, data });
};

export async function getCategoryService() {
    return Helper.Get(`/admin/services/categories`);
};

export async function getServiceById(id) {
    return Helper.Get(`/admin/services/${id}`);
};

export async function updateServices(id, data) {
    return Helper.Put({ url: `/admin/services/${id}`, data });
};


export async function deleteServices(id) {
    return Helper.Delete({ url: `/admin/services/${id}` });
};

export async function getOrders(page = 1, params = []) {
    return Helper.Get(`/admin/orders?page=${page}&per_page=10${extract_params(params)}`);
};

export async function deleteOrders(id) {
    return Helper.Delete({ url: `/admin/orders/${id}` });
};

export async function addOrders(data) {
    return Helper.Post({ url: `/admin/orders`, data });
};

export async function getOrderById(id) {
    return Helper.Get(`/admin/orders/${id}`);
};

export async function updateOrders(id, data) {
    return Helper.Put({ url: `/admin/orders/${id}`, data });
};


export async function getEmployees(page = 1, params = []) {
    return Helper.Get(`/admin/employees?page=${page}&per_page=10${extract_params(params)}`);
};

export async function addEmployees(data) {
    return Helper.Post({ url: `/admin/employees`, data });
};

export async function getEmployeesById(id) {
    return Helper.Get(`/admin/employees/${id}`);
};

export async function updateEmployees(id, data) {
    return Helper.Put({ url: `/admin/employees/${id}`, data });
};

export async function deleteEmployees(id) {
    return Helper.Delete({ url: `/admin/employees/${id}` });
};

export async function getStatistics() {
    return Helper.Get(`/admin/statistics`);
};
