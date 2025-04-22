import { FaBars, FaCar, FaCarSide, FaChevronDown, FaCartPlus, FaCube, FaCubes, FaHome, FaPlusCircle, FaPlusSquare, FaStore, FaTag, FaTags, FaTimes, FaTools, FaTrademark, FaUserCog, FaUserPlus, FaUsers, FaUserShield, FaUserTie, FaWarehouse, FaWrench } from 'react-icons/fa';
import { FaBuysellads, FaCartShopping, FaCodePullRequest } from "react-icons/fa6";
import { MdAccessTimeFilled, MdOutlineWork } from 'react-icons/md';
import { PiExamFill, PiStudentBold } from 'react-icons/pi';

const requestJoinColumns = [
    { id: 'id', label: 'المعرف', },
    { id: 'full_name', label: 'الاسم', },
    { id: 'university_number', label: 'الرقم الوطني', },
    { id: 'image', label: 'الصورة', image: true },

];
const modelsColumns = [
    { header: "المعرف", key: "id" },
    { header: "الاسم", key: "name" },
    { header: "معرف الماركة", key: "brand_id" },
    { header: "اسم الماركة", key: "brand_name" },
];
const offersColumns = [
    { header: "المعرف", key: "id" },
    { header: "معرف المنتج", key: "productId" },
    { header: "الاسم", key: "name" },
    { header: "السعر الجديد", key: "price" },
    { header: "السعر القديم", key: "old_price" },
    { header: " من الوقت", key: "start_time" },
    { header: "إلى الوقت", key: "end_time" },
];
const storesColumns = [
    { header: "المعرف", key: "id" },
    { header: "الصورة", key: "photo" },
    { header: "الاسم", key: "name" },
    { header: "العنوان", key: "address" },
    { header: "عدد المنتجات", key: "count_products" },
];
const productsColumns = [
    { header: "المعرف", key: "id" },
    { header: "الصورة", key: "main_photo" },
    { header: "الاسم", key: "name" },
    { header: "السعر الجديد", key: "price" },
    { header: "السعر القديم", key: "old_price" },
    { header: "عرض", key: "offer" },
    { header: "الكيلومتراج", key: "mileage" },
    { header: "سنة الصنع", key: "year_of_construction" },
    { header: "الغيار", key: "gears" },
    { header: "النوع", key: "type" },
];
const storesType = [
    { id: "gallery", name: "معرض" },
    { id: "office", name: "مكتب" }
];
const rolesColumns = [
    { header: "المعرف", key: "id" },
    { header: "الاسم", key: "name" },
];
const servicesColumns = [
    { header: "المعرف", key: "id" },
    { header: "اسم الخدمة", key: "name" },
    { header: "شرح الخدمة", key: "description" },
    { header: " معرف فئة الخدمة", key: "category_id" },
    { header: " فئة الخدمة", key: "category" },
    { header: "التفعيل", key: "active" },
];
const ordersColumns = [
    { header: "المعرف", key: "id" },
    { header: "اسم الخدمة ", key: "service_name" },
    { header: "معرف المعرض ", key: "store_id" },
    { header: " اسم المعرض ", key: "store_name" },
    { header: "  السعر ", key: "price" },
    { header: "  عدد الأيام ", key: "count_days" },
    { header: "  من الوقت  ", key: "start_time" },
    { header: "  إلى الوقت  ", key: "end_time" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => ({
    id: currentYear - i,
    name: currentYear - i,
}));

const drive_type = [
    { id: "front", name: "أمامي" },
    { id: "rear", name: "خلفي" }
];

const fuel_type = [
    { id: "petrol", name: "بانزين" },
    { id: "diesel", name: "مازوت" },
    { id: "hybrid", name: "هجين" },
    { id: "electric", name: "كهرباء" }
];

const gears = [
    { id: "manual", name: "غيار عادي" },
    { id: "automatic", name: "غيار أوتوماتيك" }
];

const type = [
    { id: "used", name: "مستعمل" },
    { id: "new", name: "جديد" }
];

const seat_type = [
    { id: "leather", name: "جلد" },
    { id: "cloth", name: "قماش" }
];

const cylinders = [
    { id: 3, name: "3 سلندر" },
    { id: 4, name: "4 سلندر" },
    { id: 5, name: "5 سلندر" },
    { id: 6, name: "6 سلندر" },
    { id: 8, name: "8 سلندر" },
    { id: 1, name: "10 سلندر" },
    { id: 12, name: "12 سلندر" },
    { id: 16, name: "16 سلندر" }
];

const bodyType = [
    { id: 1, name: "Sedan" },
    { id: 2, name: "SUV" },
    { id: 3, name: "Truck" },
    { id: 4, name: "Coupe" },
    { id: 5, name: "Convertible" },
];


const employeesColumns = [
    { header: "المعرف", key: "id" },
    { header: "معرف الموظف", key: "name" },
    { header: "ايميل الموظف", key: "email" },
    { header: "معرف الوظيفة", key: "role_id" },
    { header: " وظيفة الموظف", key: "role_name" },
];

const navigationItems = [
    { hr: "dd" },
    { static: "الأساسيات " },
    { icon: <FaHome />, text: "الداشبورد", to: "/" },
    { icon: <PiStudentBold />, text: "الطلاب", to: "/students" },
    { hr: "dd" },
    { static: " الاعلانات وفرص العمل " },


    {
        icon: <MdOutlineWork />,
        text: "فرص العمل",
        subItems: [
            { icon: <MdOutlineWork />, text: "فرص العمل", to: "/models" },
            { icon: <FaPlusCircle />, text: " إضافة فرصة", to: "/addModels" }
        ]
    },
    {
        icon: <FaBuysellads />,
        text: " الاعلانات",
        subItems: [
            { icon: <FaBuysellads />, text: "الاعلانات", to: "/models" },
            { icon: <FaPlusCircle />, text: " إضافة الاعلانات", to: "/addModels" }
        ]
    },
    { hr: "dd" },
    { static: "   برامج الامتحانات و الدوام " },
    {
        icon: <PiExamFill />,
        text: "برامج الامتحانات",
        subItems: [
            { icon: <PiExamFill />, text: " برامج الامتحانات", to: "/stores" },
            { icon: <FaPlusCircle />, text: "إضافة برنامج", to: "/addstores" }
        ]
    },
    {
        icon: <MdAccessTimeFilled />,
        text: " برامج الدوام",
        subItems: [
            { icon: <MdAccessTimeFilled />, text: " برامج الدوام", to: "/stores" },
            { icon: <FaPlusCircle />, text: "إضافة برنامج", to: "/addstores" }
        ]
    },
    { hr: "dd" },

    // {
    //     icon: <SiTransmission />,
    //     text: "المفقودات",
    //     subItems: [
    //         { icon: <SiTransmission />, text: " المفقودات", to: "/stores" },
    //         { icon: <FaPlusCircle />, text: "إضافة المفقودات", to: "/addstores" }
    //     ]
    // },

];


export { requestJoinColumns, modelsColumns, offersColumns, ordersColumns, storesColumns, productsColumns, rolesColumns, servicesColumns, employeesColumns, navigationItems, storesType, yearOptions, drive_type, fuel_type, gears, type, seat_type, cylinders, bodyType };
