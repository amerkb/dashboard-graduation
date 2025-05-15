import { Helper } from '../lib/helper';

export async function addExamSchedules(formData) {
  return Helper.Post({
    url: '/examSchedules',
    data: formData,
  });
}

export async function updateExamSchedule(formData) {
  return Helper.Put({
    url: `/examSchedules/${formData.id}`,
    data: formData,
  });
}

export async function getExamSchedule(semester_id) {
  const url = `/examSchedules?semester_id=${semester_id}`;
  const response = await Helper.Get(url);
  return response.data.data;
}
