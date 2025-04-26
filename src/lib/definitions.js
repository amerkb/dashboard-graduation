import { FaHome, FaPlusCircle, FaBuysellads } from 'react-icons/fa';
import { MdOutlineWork, MdAccessTimeFilled } from 'react-icons/md';
import { PiExamFill, PiStudentBold } from 'react-icons/pi';

const requestJoinColumns = [
  { id: 'id', label: 'المعرف' },
  { id: 'full_name', label: 'الاسم' },
  { id: 'university_number', label: 'الرقم الوطني' },
  { id: 'image', label: 'الصورة', image: true },
];

const navigationItems = [
  { hr: 'dd' },
  { static: 'الأساسيات ' },
  { icon: <FaHome />, text: 'الداشبورد', to: '/' },
  { icon: <PiStudentBold />, text: 'الطلاب', to: '/students' },
  { hr: 'dd' },
  { static: ' الاعلانات وفرص العمل ' },

  {
    icon: <MdOutlineWork />,
    text: 'فرص العمل',
    subItems: [
      { icon: <MdOutlineWork />, text: 'فرص العمل', to: '/jobOpportunities' },
      {
        icon: <FaPlusCircle />,
        text: ' إضافة فرصة',
        to: '/jobOpportunity/add',
      },
    ],
  },
  {
    icon: <FaBuysellads />,
    text: ' الاعلانات',
    subItems: [
      { icon: <FaBuysellads />, text: 'الاعلانات', to: '/announcements' },
      {
        icon: <FaPlusCircle />,
        text: ' إضافة الاعلانات',
        to: '/announcements/add',
      },
    ],
  },
  { hr: 'dd' },
  { static: '   برامج الامتحانات و الدوام ' },
  {
    icon: <PiExamFill />,
    text: 'برامج الامتحانات',
    subItems: [
      { icon: <PiExamFill />, text: ' برامج الامتحانات', to: '/stores' },
      { icon: <FaPlusCircle />, text: 'إضافة برنامج', to: '/addstores' },
    ],
  },
  {
    icon: <MdAccessTimeFilled />,
    text: ' برامج الدوام',
    subItems: [
      { icon: <MdAccessTimeFilled />, text: ' برامج الدوام', to: '/stores' },
      { icon: <FaPlusCircle />, text: 'إضافة برنامج', to: '/addstores' },
    ],
  },
  { hr: 'dd' },

  // {
  //     icon: <SiTransmission />,
  //     text: "المفقودات",
  //     subItems: [
  //         { icon: <SiTransmission />, text: " المفقودات", to: "/stores" },
  //         { icon: <FaPlusCircle />, text: "إضافة المفقودات", to: "/addstores" }
  //     ]
  // },
];

export { requestJoinColumns, navigationItems };
