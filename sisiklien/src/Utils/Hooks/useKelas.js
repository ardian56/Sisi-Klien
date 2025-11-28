import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllKelas,
  getKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "../Apis/KelasApi";
import { showSuccess, showError } from "../Helpers/toastHelper";

// Ambil semua kelas
export const useKelas = (query = {}) =>
  useQuery({
    queryKey: ["kelas", query],
    queryFn: () => getAllKelas(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res?.headers["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

// Ambil detail kelas by ID
export const useKelasDetail = (id) =>
  useQuery({
    queryKey: ["kelas", id],
    queryFn: () => getKelas(id),
    select: (res) => res?.data,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

// Tambah
export const useStoreKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      showSuccess("Kelas berhasil ditambahkan!");
    },
    onError: () => {
      showError("Gagal menambahkan kelas");
    },
  });
};

// Update
export const useUpdateKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateKelas(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      showSuccess("Kelas berhasil diupdate!");
    },
    onError: () => {
      showError("Gagal mengupdate kelas");
    },
  });
};

// Hapus
export const useDeleteKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      showSuccess("Kelas berhasil dihapus!");
    },
    onError: () => {
      showError("Gagal menghapus kelas");
    },
  });
};
