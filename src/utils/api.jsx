import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, formData) => {
  try {
    const response = await fetch(apiUrl + URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(apiUrl + url, params);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateImageFromApi = async (url, formData) => {
  try {
    const response = await axios.put(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImageFromApi = async (url, formData) => {
  try {
    const response = await axios.post(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateDataFromApi = async (url, formData) => {
  try {
    const response = await axios.put(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteImage = async (url) => {
  try {
    const response = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDataFromApi = async (url) => {
  const response = await axios.delete(apiUrl + url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteMultipleData = async (url, data) => {
  const response = await axios.delete(apiUrl + url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};
// export const deleteMultipleData = async (url, config) => {
//   const response = await axios.delete(apiUrl + url, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       "Content-Type": "application/json",
//     },
//     ...config, // allows passing { data }, { params }, etc.
//   });
//   return response.data;
// };
