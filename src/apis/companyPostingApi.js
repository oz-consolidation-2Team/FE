import axiosFormInstance from './axiosFormInstance'
import axiosInstance from "./axiosInstance";

const TOKEN = import.meta.env.VITE_TOKEN;

export const companyMe = async () => {
    const response = await axiosInstance.get(`/company/me`)
    return response.data.data
}

export const JobPosting = async (id) => {
    const response = await axiosInstance.get(`/posting/${id}`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
    })
    return response.data
}

export const createJobPosting = async (formData) => {
    const response = await axiosFormInstance.post(`/posting/`, formData)
    return response.data
}

export const updateJobPosting = async (jobId, formData) => {
    const response = await axiosFormInstance.patch(`/posting/${jobId}`, formData)
    return response.data
}

export const deleteJobPosting = async (jobId) => {
    const response = await axiosInstance.delete(`/posting/${jobId}`);
    return response.data;
};
