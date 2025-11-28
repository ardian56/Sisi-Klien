import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMataKuliah,
  storeMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "../Apis/MataKuliahApi";
import { showSuccess, showError } from "../Helpers/toastHelper";

// Ambil semua mata kuliah
export const useMataKuliah = (query = {}) =>
  useQuery({
    queryKey: ["matakuliah", query],
    queryFn: () => getAllMataKuliah(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res?.headers["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

// Tambah
export const useStoreMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      showSuccess("Mata Kuliah berhasil ditambahkan!");
    },
    onError: () => {
      showError("Gagal menambahkan mata kuliah");
    },
  });
};

// Update
export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMataKuliah(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      showSuccess("Mata Kuliah berhasil diupdate!");
    },
    onError: () => {
      showError("Gagal mengupdate mata kuliah");
    },
  });
};

// Hapus
export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
      showSuccess("Mata Kuliah berhasil dihapus!");
    },
    onError: () => {
      showError("Gagal menghapus mata kuliah");
    },
  });
};
