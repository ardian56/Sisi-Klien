import axios from "@/Utils/AxiosInstance";

// Ambil semua mata kuliah
export const getAllMataKuliah = () => axios.get("/matakuliah");

// Ambil 1 mata kuliah
export const getMataKuliah = (id) => axios.get(`/matakuliah/${id}`);
