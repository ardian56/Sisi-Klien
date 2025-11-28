import axios from "@/Utils/AxiosInstance";

// Ambil semua kelas
export const getAllKelas = () => axios.get("/kelas");

// Ambil 1 kelas
export const getKelas = (id) => axios.get(`/kelas/${id}`);
