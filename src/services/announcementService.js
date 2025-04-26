import { Helper } from '../lib/helper';

export async function createAnnouncement(formData) {
  return Helper.Post({
    url: '/announcement',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getAllAnnouncements(page = 1, per_page = 10) {
  return Helper.Get(`/announcements?page=${page}&per_page=${per_page}`);
}

export async function showAnnouncement(id) {
  return Helper.Get(`/announcement/${id}`);
}

export async function deleteAnnouncement(id) {
  return Helper.Delete({ url: `/announcement/${id}` });
}

export async function updateAnnouncement(id, formData) {
  return Helper.Post({
    url: `/announcement/${id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
