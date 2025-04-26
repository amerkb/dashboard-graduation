import { Helper } from './helper';

const extract_params = (params) => {
  let urlParams = '';
  for (var i = 0; i < params.length; i++)
    urlParams += `&${Object.entries(params[i])[0][0]}=${Object.entries(params[i])[0][1]}`;
  return urlParams;
};

export async function GetStudent(page = 1, params = []) {
  return Helper.Get(
    `/getStudentNotRegistrationComplete?page=${page}&per_page=10${extract_params(params)}`,
  );
}

export async function updateCheckStudent(id, data) {
  return Helper.Put({ url: `/checkStudentData/${id}`, data });
}
