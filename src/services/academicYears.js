import { Helper } from '../lib/helper';

export async function addAcademicYear(formData) {
  return Helper.Post({
    url: '/academicYear',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getAcademicYears() {
  const response = await Helper.Get('/academicYears');
  return response.data.data;
}

export async function deleteAcademicYear(id) {
  return Helper.Delete({ url: `/academicYear/${id}` });
}
