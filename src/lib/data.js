import toast from 'react-hot-toast';
import { GetStudent, Statistic } from './apiCalls';

export async function GetDataStudent(currentPage) {
  try {
    const response = await GetStudent(currentPage);
    return response.data;
  } catch (error) {
    toast.error('حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى');
    return null;
  }
}
export async function GetStatistic(currentPage) {
  try {
    const response = await Statistic(currentPage);
    return response.data;
  } catch (error) {
    toast.error('حدث خطأ أثناء محاولة التحميل . يرجى المحاولة مرة أخرى');
    return null;
  }
}
