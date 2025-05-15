import { Helper } from '../lib/helper';

export async function addWorkSchedules(formData) {
  return Helper.Post({
    url: '/workSchedules',
    data: formData,
  });
}

export async function updateWorkSchedule(formData) {
  return Helper.Put({
    url: `/workSchedules/${formData.id}`,
    data: formData,
  });
}

export async function workSchedules(semester_id) {
  const url = `/workSchedules?semester_id=${semester_id}`;
  const response = await Helper.Get(url);
  return response.data.data;
}
