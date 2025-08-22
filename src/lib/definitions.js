import { FaHome, FaPlusCircle, FaBuysellads } from 'react-icons/fa';
import { MdOutlineWork, MdAccessTimeFilled } from 'react-icons/md';
import { PiExamFill, PiStudentBold } from 'react-icons/pi';
import { SiTransmission } from 'react-icons/si';

const requestJoinColumns = [
  { id: 'id', label: 'المعرف' },
  { id: 'full_name', label: 'الاسم' },
  { id: 'university_number', label: 'الرقم الوطني' },
  { id: 'image', label: 'الصورة', image: true },
];
const hateMessage = [
  { id: 'body', label: 'الرسالة' },
  { id: 'sender', label: 'الطالب' },
  { id: 'group', label: ' المجموعة' },
  { id: 'created_at', label: 'تاريخ رسالة' },
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
    to: '/jobOpportunities',
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
    to: '/announcements',
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
    icon: <MdAccessTimeFilled />,
    to: '/academicYears',
    text: 'برامج الامتحانات و الدوام',
    subItems: [
      {
        icon: <MdAccessTimeFilled />,
        text: 'إدارة السنوات',
        to: '/academicYears',
      },
      {
        icon: <FaPlusCircle />,
        text: 'إضافة برنامج دوام',
        to: '/workSchedules/add',
      },
      {
        icon: <FaPlusCircle />,
        text: 'إضافة برنامج إمتحان',
        to: '/examSchedules/add',
      },
    ],
  },
  { hr: 'dd' },
  { static: 'المفقودات' },
  {
    icon: <SiTransmission />,
    to: '/lostItems',
    text: 'المفقودات',
    subItems: [
      { icon: <SiTransmission />, text: 'إدارة المفقودات', to: '/lostItems' },
    ],
  },
];

export { requestJoinColumns, navigationItems, hateMessage };
