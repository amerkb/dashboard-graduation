import { FaCartPlus, FaFileInvoice, FaUsers, FaCartArrowDown } from 'react-icons/fa';
import { IoCarSportOutline, IoCarSport } from "react-icons/io5";
import { MdOutlineLocalOffer, MdLocalOffer } from "react-icons/md";

export function getStats(statsData) {
    return [
        {
            title: " العدد الكلي للسيارات ",
            value: statsData?.countProduct,
            icon: <IoCarSportOutline className="text-3xl" />,
            bg: "bg-orange",
            accent: "bg-orange"
        },
        {
            title: "  العدد الكلي للسيارات الفعالة",
            value: statsData?.countActiveProduct,
            icon: <IoCarSport className="text-3xl" />,
            bg: "bg-orange",
            accent: "bg-orange"
        },
        {
            title: "العدد الكلي للعروض ",
            value: statsData?.countOffer,
            icon: <MdOutlineLocalOffer className="text-3xl" />,
            bg: "bg-orange",
            accent: "bg-orange"
        },
        {
            title: "العدد الكلي للعروض الفعالة ",
            value: statsData?.CountActiveOffer,
            icon: <MdLocalOffer className="text-3xl" />,
            bg: "bg-orange",
            accent: "bg-orange"
        },
        {
            title: " العدد الكلي للطلبيات   ",
            value: statsData?.CountOrder,
            icon: <FaCartPlus className="text-3xl" />,
            bg: "bg-orange",
            accent: "bg-orange"
        },
        {
            title: "العدد الكلي للطلبيات الفعالة ",
            value: statsData?.CountActiveOrder,
            icon: <FaCartArrowDown className="text-3xl" />,
            bg: "bg-orange",
            accent: "bg-orange"
        },
        {
            title: "العدد الكلي للفواتير ",
            value: `EGP ${statsData?.totalBills}`,
            icon: <FaFileInvoice className="text-3xl" />,
            bg: "bg-orange",
            accent: "bg-orange"
        },
        {
            title: "العدد الكلي للموظفين",
            value: statsData?.countEmployees,
            icon: <FaUsers className="text-3xl" />,
            bg: "bg-orange",
            accent: "bg-orange"
        }
    ];
}
