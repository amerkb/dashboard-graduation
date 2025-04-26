import toast from 'react-hot-toast';
import { updateCheckStudent } from './apiCalls';

export async function updateCheckStudentForm(id) {
  try {
    const response = await updateCheckStudent(id);

    if ((response.status = 200)) {
      toast.success('تم تعديل معلومات الموظف بنجاح');
      return response;
    } else {
      toast.error(response.response.data.errors.map((e) => e));
      return null;
    }
  } catch (error) {
    toast.error('حدث خطأ أثناء محاولة التعديل . يرجى المحاولة مرة أخرى');
    return null;
  }
}
