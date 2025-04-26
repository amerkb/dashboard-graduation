import { Helper } from '../lib/helper';

export async function createJobOpportunity(formData) {
  return Helper.Post({
    url: '/jobOpportunity',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getAllJobOpportunities(page = 1, per_page = 10) {
  return Helper.Get(`/jobOpportunities?page=${page}&per_page=${per_page}`);
}

export async function showJobOpportunity(id) {
  return Helper.Get(`/jobOpportunity/${id}`);
}

export async function deleteJobOpportunity(id) {
  return Helper.Delete({ url: `/jobOpportunity/${id}` });
}

export async function updateJobOpportunity(id, formData) {
  return Helper.Post({
    url: `/jobOpportunity/${id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function switchJobIsExpired(id) {
  return Helper.Put({ url: `/switchJobIsExpired/${id}` });
}
