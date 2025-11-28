import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "../Apis/DosenApi";
import { showSuccess, showError } from "../Helpers/toastHelper";

// Ambil semua dosen
export const useDosen = (query = {}) =>
  useQuery({
    queryKey: ["dosen", query],
    queryFn: () => getAllDosen(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res?.headers["x-total-count"] ?? "0", 10),
    }),
    keepPreviousData: true,
  });

// Tambah
export const useStoreDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      showSuccess("Dosen berhasil ditambahkan!");
    },
    onError: () => {
      showError("Gagal menambahkan dosen");
    },
  });
};

// Update
export const useUpdateDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDosen(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      showSuccess("Dosen berhasil diupdate!");
    },
    onError: () => {
      showError("Gagal mengupdate dosen");
    },
  });
};

// Hapus
export const useDeleteDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      showSuccess("Dosen berhasil dihapus!");
    },
    onError: () => {
      showError("Gagal menghapus dosen");
    },
  });
};
