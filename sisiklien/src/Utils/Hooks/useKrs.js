import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import KrsApi from "../Apis/KrsApi";
import { showError, showSuccess } from "../Helpers/toastHelper";

export const useKrs = (params = {}) => {
  return useQuery({
    queryKey: ["krs", params],
    queryFn: async () => {
      const result = await KrsApi.getAllKrs(params);
      const total = result.headers["x-total-count"] || result.data.length;
      return { data: result.data, total: parseInt(total) };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useKrsDetail = (id) => {
  return useQuery({
    queryKey: ["krs", id],
    queryFn: async () => {
      const result = await KrsApi.getKrs(id);
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};

export const useStoreKrs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => KrsApi.storeKrs(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["krs"] });
      showSuccess("KRS berhasil disimpan");
    },
    onError: (error) => {
      showError(error.response?.data?.message || "Gagal menyimpan KRS");
    },
  });
};

export const useUpdateKrs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => KrsApi.updateKrs(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["krs"] });
      showSuccess("KRS berhasil diperbarui");
    },
    onError: (error) => {
      showError(error.response?.data?.message || "Gagal memperbarui KRS");
    },
  });
};

export const useDeleteKrs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => KrsApi.deleteKrs(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["krs"] });
      showSuccess("KRS berhasil dihapus");
    },
    onError: (error) => {
      showError(error.response?.data?.message || "Gagal menghapus KRS");
    },
  });
};

export const useApproveKrs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, approvedBy }) => KrsApi.approveKrs(id, approvedBy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["krs"] });
      showSuccess("KRS berhasil disetujui");
    },
    onError: (error) => {
      showError(error.response?.data?.message || "Gagal menyetujui KRS");
    },
  });
};

export const useRejectKrs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, rejectedBy, reason }) =>
      KrsApi.rejectKrs(id, rejectedBy, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["krs"] });
      showSuccess("KRS berhasil ditolak");
    },
    onError: (error) => {
      showError(error.response?.data?.message || "Gagal menolak KRS");
    },
  });
};

export const useSubmitKrs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => KrsApi.submitKrs(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["krs"] });
      showSuccess("KRS berhasil diajukan");
    },
    onError: (error) => {
      showError(error.response?.data?.message || "Gagal mengajukan KRS");
    },
  });
};
