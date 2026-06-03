import axios from "axios";

const API_URL = "http://localhost:8080/servicios";

export const getServicios = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}`},
    });
    return res.data;
};

export const getServicioById = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}`},
    });
    return res.data;
};

export const createServicio = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(API_URL,data, {
        headers: { Authorization: `Bearer ${token}`},
    });
    return res.data;
};


export const updateServicio = async (id, data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`},
    });
    return res.data;
};
export const deleteServicio = async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};