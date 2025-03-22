import toast from "react-hot-toast";
import { getBrandById, getBrands, getModelById, getModels, getOffers, getProducts, getProductsById, getRoleById, getRoles, getStoreById, getStores, getCategoryService, getServices, getServiceById, getEmployees, getEmployeesById, getOrders, getOrderById, getOfferById, getStatistics, getPermissionsByRoleId } from "./apiCalls";

export async function GetBrands() {
    try {
        const response = await getBrands();
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetBrandById(id) {
    try {
        const response = await getBrandById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

//////////////////////////////////////////////////////////////

export async function GetModels() {
    try {
        const response = await getModels();
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetModelById(id) {
    try {
        const response = await getModelById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

////////////////////////////////////////////////////////////

export async function GetOffers(currentPage) {

    try {
        const response = await getOffers(currentPage);
        return response.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetOfferById(id) {
    try {
        const response = await getOfferById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

/////////////////////////////////////////////////////////////////

export async function GetStores(currentPage) {
    try {
        const response = await getStores(currentPage);
        return response.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetStoreById(id) {
    try {
        const response = await getStoreById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

/////////////////////////////////////////////////////////////////

export async function GetProducts(currentPage) {
    try {
        const response = await getProducts(currentPage);
        return response.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetPoductsById(id) {
    try {
        const response = await getProductsById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

//////////////////////////////////////////////////////////////

export async function GetRoles(currentPage) {

    try {
        const response = await getRoles(currentPage);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetRolesById(id) {
    try {
        const response = await getRoleById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

///////////////////////////////////////////////////////////////

export async function GetServices() {
    try {
        const response = await getServices();
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetServicesById(id) {
    try {
        const response = await getServiceById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetCategoryService() {
    try {
        const response = await getCategoryService();
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetEmployees(currentPage) {

    try {
        const response = await getEmployees(currentPage);
        return response.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetEmployeesById(id) {
    try {
        const response = await getEmployeesById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

///////////////////////////////////////////////////////////////

export async function GetOrders(currentPage) {
    try {
        const response = await getOrders(currentPage);
        return response.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function GetOrdersById(id) {
    try {
        const response = await getOrderById(id);
        return response.data.data;
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

////////////////////////////////////////////////////////////////

export async function GetStatistics() {

    try {
        const response = await getStatistics();

        // console.log(response.data.data);
        return response.data.data;
        
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى");
        return null;
    };
};
