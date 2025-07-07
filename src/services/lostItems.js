import { Helper } from '../lib/helper';

export async function getLostItems() {
  const response = await Helper.Get('/getLostItems');
  return response.data;
}

export async function addLostItem(formData) {
  return Helper.Post({
    url: '/lostItem',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export async function getLostItemById(id) {
  return Helper.Get(`/showLostItem/${id}`);
}

export async function deleteLostItem(id) {
  return Helper.Delete({ url: `/lostItem/${id}` });
}

export async function updateLostItem(id, formData) {
  return Helper.Post({
    url: `/lostItem/${id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
