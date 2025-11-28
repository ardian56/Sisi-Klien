import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "../Apis/MahasiswaApi";
import { showSuccess, showError } from "../Helpers/toastHelper";

// Ambil semua mahasiswa
export const useMahasiswa = () =>
  useQuery({
    queryKey: ["mahasiswa"],
    queryFn: getAllMahasiswa,
    select: (res) => res?.data ?? [],
  });

// Tambah
export const useStoreMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      showSuccess("Mahasiswa berhasil ditambahkan!");
    },
    onError: () => {
      showError("Gagal menambahkan mahasiswa");
    },
  });
};

// Update
export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMahasiswa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      showSuccess("Mahasiswa berhasil diupdate!");
    },
    onError: () => {
      showError("Gagal mengupdate mahasiswa");
    },
  });
};

// Hapus
export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      showSuccess("Mahasiswa berhasil dihapus!");
    },
    onError: () => {
      showError("Gagal menghapus mahasiswa");
    },
  });
};
