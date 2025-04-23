import axios from "axios";
import {TOKEN, BASE_URL} from "./token"

export const listJobPosting = async () => {
    const response = await axios.get(`${BASE_URL}company/me`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
    })
    console.log('공고 조회 API 호출====')
    console.log(response.data.data)
    return response.data.data
}

export const createJobPosting = async (formData) => {
    const response = await axios.post(`${BASE_URL}posting/`, formData, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`  
        }
    })
    console.log('공고 생성 API 호출====')
    console.log(response.data.data)
    return response.data.data
}

export const updateJobPosting = async (jobId, formData) => {
    const response = await axios.patch(`${BASE_URL}posting/${jobId}`, formData, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
        }
    })
    console.log('공고 수정 API 호출====')
    console.log(response.data.data)
    return response.data.data
}

export const deleteJobPosting = async (jobId) => {
    const response = await axios.delete(`${BASE_URL}posting/${jobId}`, {
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${TOKEN}`
        }
    })
    console.log('공고 삭제 API 호출====')
    console.log(response.data.data)
    return response.data.data
}
