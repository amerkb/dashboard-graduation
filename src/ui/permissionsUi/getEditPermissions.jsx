import React, { useState, useEffect } from 'react';
import { updatePermissionForm } from '../../lib/actions';
import { useNavigate } from 'react-router-dom';
import AnimationLoader from "../sharedUi/loading";
import animation from "../../lib/utils/animationloading.json";
export default function GetEditPermissions({ permissionId, permissionsData }) {

  const nav = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setPermissions(permissionsData);
  }, [permissionsData]);

  const togglePermission = (id) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === id ? { ...permission, status: !permission.status } : permission
      )
    );
  };

  const navigate = (route) => {
    nav(route);
  };

  const handleSave = async () => {
    setLoading(true);
    const activeIds = permissions.filter((permission) => permission.status).map((permission) => permission.id);
    const formData = new FormData();
    activeIds.forEach(id => {
      formData.append('permission_ids[]', id);
    });
    await updatePermissionForm(permissionId, formData, navigate);
    setLoading(false);
  };
  if (((permissionId).length < 1) || (permissionsData.length < 1)) {
    return <div className=" h-[100vh] flex justify-center items-center"><AnimationLoader animationData={animation} /></div>
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={`permission-${permission.id}`}
              checked={permission.status}
              onChange={() => togglePermission(permission.id)}
              className="h-5 w-5 accent-orange ring-2 ring-gray-300 ring-opacity-50 rounded-md checked:ring-0 cursor-pointer transition-colors ml-4"
            />
            <label
              htmlFor={`permission-${permission.id}`}
              className="text-gray-700 font-medium hover:text-gray-900 transition-colors cursor-pointer"
            >
              {permission.guard_name}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={loading}
        className={`w-full my-10 sm:w-2/3 md:w-[40%] bg-orange text-white py-2 rounded-lg transition flex items-center justify-center ${loading ? "cursor-not-allowed" : "hover:bg-orange"
          }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </>
        ) : (
          "حفظ"
        )}
      </button>
    </div>
  );
};