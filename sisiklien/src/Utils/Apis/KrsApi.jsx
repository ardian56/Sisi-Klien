import axios from "../AxiosInstance";

const KrsApi = {
  getAllKrs: (params = {}) => {
    return axios.get("/krs", { params });
  },

  getKrs: (id) => {
    return axios.get(`/krs/${id}`);
  },

  storeKrs: (data) => {
    return axios.post("/krs", data);
  },

  updateKrs: (id, data) => {
    return axios.put(`/krs/${id}`, data);
  },

  deleteKrs: (id) => {
    return axios.delete(`/krs/${id}`);
  },

  approveKrs: (id, approvedBy) => {
    return axios.patch(`/krs/${id}`, {
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: approvedBy,
    });
  },

  rejectKrs: (id, rejectedBy, reason) => {
    return axios.patch(`/krs/${id}`, {
      status: "rejected",
      rejected_at: new Date().toISOString(),
      rejected_by: rejectedBy,
      rejection_reason: reason,
    });
  },

  submitKrs: (id) => {
    return axios.patch(`/krs/${id}`, {
      status: "submitted",
      submitted_at: new Date().toISOString(),
    });
  },
};

export default KrsApi;
