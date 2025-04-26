import toast from 'react-hot-toast';
import { GetStudent } from './apiCalls';

export async function GetDataStudent(currentPage) {
  try {
    const response = await GetStudent(currentPage);
    return response.data;
  } catch (error) {
    toast.error('حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى');
    return null;
  }
}
