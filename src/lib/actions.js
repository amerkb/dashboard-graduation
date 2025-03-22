import toast from "react-hot-toast";
import { addBrands, deleteBrands, login, updateBrands, addModels, deleteModels, updateModels, deleteOffers, addOffers, deleteStores, addStores, updateStores, deleteProducts, updateOffers, delelteRoles, addRoles, updateRoles, deleteServices, addServices, updateServices, deleteEmployees, addEmployees, updateEmployees, deleteOrders, addOrders, updateOrders, addProducts, updateProducts, updatePermissions } from "./apiCalls";

export async function LoginForm(formdata, navigate) {

    try {
        const response = await login(formdata, navigate);

        if (response.status === 200) {
            toast.success("تم تسجيل الدخول بنجاح");
            localStorage.setItem("user", response.data.data.token)
            localStorage.setItem("permissions", JSON.stringify(response.data.data.permissions));  
            localStorage.setItem("userData", JSON.stringify({  
                userName: response.data.data.user.name,  
                userId: response.data.data.user.id  
            }));
            navigate("/");
            return response;
        } else {
            toast.error("كلمة السر او الايميل خطأ");
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى");
        return null;
    };
};

////////////////////////////////////////////////////////////////////

export async function addBrandsForm(formdata, navigate) {

    try {
        const response = await addBrands(formdata);

        if (response.status == 201) {
            toast.success("تم إضافة الماركة بنجاح");
            navigate("/brands");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateBrandsForm(id, formdata, navigate) {

    try {
        const response = await updateBrands(id, formdata);

        if (response.status == 200) {
            toast.success("تم تعديل الماركة بنجاح");
            navigate("/brands");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function deleteBrandsForm(id) {

    try {
        const response = await deleteBrands(id);

        if (response.status == 200) {
            toast.success("تم حذف الماركة بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

//////////////////////////////////////////////////////////////////////////

export async function addModelsForm(formdata, navigate) {

    try {
        const response = await addModels(formdata);

        if (response.status === 201) {
            toast.success("تم إضافة الموديل بنجاح");
            navigate("/models");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function deleteModelsForm(id) {

    try {
        const response = await deleteModels(id);

        if (response.status == 200) {
            toast.success("تم حذف الموديل بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateModelsForm(id, formdata, navigate) {

    try {
        const response = await updateModels(id, formdata);

        if (response.status == 200) {
            toast.success("تم تعديل الموديل بنجاح");
            navigate("/models");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

///////////////////////////////////////////////////////////////////////////

export async function addOffersForm(formdata, navigate) {

    try {
        const response = await addOffers(formdata);

        if (response.status === 201) {
            toast.success("تم إضافة العرض بنجاح");
            navigate("/offers");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateOffersForm(id, formdata, navigate) {

    try {
        const response = await updateOffers(id, formdata);

        if (response.status == 200) {
            toast.success("تم تعديل العرض بنجاح");
            navigate("/offers");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function deleteOffersForm(id) {

    try {
        const response = await deleteOffers(id);

        if (response.status == 200) {
            toast.success("تم حذف العرض بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

////////////////////////////////////////////////////////////////////////////

export async function addStoresForm(formdata, navigate) {

    try {
        const response = await addStores(formdata);

        if (response.status === 201) {
            toast.success("تم إضافة المتجر بنجاح");
            navigate("/stores");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateStoresForm(id, formdata, navigate) {

    try {
        const response = await updateStores(id, formdata);

        if (response.status == 200) {
            toast.success("تم تعديل المتجر بنجاح");
            navigate("/stores");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function deleteStoresForm(id) {

    try {
        const response = await deleteStores(id);

        if (response.status == 200) {
            toast.success("تم حذف الموديل بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

////////////////////////////////////////////////////////////////////////////

export async function addProductsForm(formdata, navigate) {

    try {
        const response = await addProducts(formdata);

        if (response.status === 201) {
            toast.success("تم إضافة المنتج بنجاح");
            navigate("/products");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateProductsForm(id, formdata, navigate) {

    try {
        const response = await updateProducts(id, formdata);

        if (response.status == 200) {
            toast.success("تم تعديل السيارة بنجاح");
            navigate("/products");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function deleteProductsForm(id) {

    try {
        const response = await deleteProducts(id);

        if (response.status == 200) {
            toast.success("تم حذف السيارة بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

/////////////////////////////////////////////////////////////////////////////

export async function addRolesForm(formdata, navigate) {

    try {
        const response = await addRoles(formdata);

        if (response.status === 201) {
            toast.success("تم إضافة المتجر بنجاح");
            navigate("/roles");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function deleteRolesForm(id) {

    try {
        const response = await delelteRoles(id);

        if (response.status == 200) {
            toast.success("تم حذف الموديل بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateRolesForm(id, formdata, navigate) {

    try {
        const response = await updateRoles(id, formdata);

        if (response.status == 200) {
            toast.success("تم تعديل المتجر بنجاح");
            navigate("/roles");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updatePermissionForm(id, formdata, navigate) {

    try {
        const response = await updatePermissions(id, formdata);

        if (response.status == 200) {
            toast.success("تم تعديل الصلاحيات بنجاح");
            navigate("/roles");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        // toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

////////////////////////////////////////////////////////////////////////////

export async function deleteServicesForm(id) {

    try {
        const response = await deleteServices(id);

        if (response.status == 200) {
            toast.success("تم حذف الخدمة بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function addServicesForm(formdata, navigate) {

    try {
        const response = await addServices(formdata);

        if (response.status === 201) {
            toast.success("تم إضافة الخدمة بنجاح");
            navigate("/services");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateServicesForm(id, formdata, navigate) {

    try {
        const response = await updateServices(id, formdata);

        if (response.status == 200) {
            toast.success("تم تعديل الخدمة بنجاح");
            navigate("/services");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

//////////////////////////////////////////////////////////////////////////////

export async function addEmployeesForm(formdata, navigate) {

    try {
        const response = await addEmployees(formdata);

        if (response.status === 201) {
            toast.success("تم إضافة الموظف بنجاح");
            navigate("/employees");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function deleteEmployeesForm(id) {

    try {
        const response = await deleteEmployees(id);

        if (response.status == 200) {
            toast.success("تم حذف الموظف بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateEmployeesForm(id, formdata, navigate) {

    try {
        const response = await updateEmployees(id, formdata);

        if (response.status = 200) {
            toast.success("تم تعديل معلومات الموظف بنجاح");
            navigate("/employees");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};

/////////////////////////////////////////////////////////////////////////////

export async function deleteOrdersForm(id) {

    try {
        const response = await deleteOrders(id);

        if (response.status == 200) {
            toast.success("تم حذف الطلب بنجاح");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الحذف . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function addOrdersForm(formdata, navigate) {

    try {
        const response = await addOrders(formdata);

        if (response.status === 201) {
            toast.success("تم إضافة الطلب بنجاح");
            navigate("/orders");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة الإضافة . يرجى المحاولة مرة أخرى");
        return null;
    };
};

export async function updateOrdersForm(id, formdata, navigate) {

    try {
        const response = await updateOrders(id, formdata);

        if (response.status = 200) {
            toast.success("تم تعديل الطلب بنجاح");
            navigate("/orders");
            return response;
        } else {
            toast.error(response.response.data.errors.map((e)=> e ));
            return null;
        }
    } catch (error) {
        toast.error("حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى");
        return null;
    };
};



