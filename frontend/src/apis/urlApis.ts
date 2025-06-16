import axiosInstance from "./axiosInstance"

export const createShortUrlApi = async(originalUrl: string) => {
    const response = await axiosInstance.post('/api/url/shorten', {originalUrl})
    return response.data
}

export const getUserShortUrlsApi = async() => {
    const response = await axiosInstance.get('/api/url/my-urls')
    return response.data
}

export const redirectToOriginalUrlApi = async(shortCode: string) => {
    await axiosInstance.get(`/api/url/${shortCode}`)
}

export const deleteShortUrlApi = async(shortCode: string) => {
    const response = await axiosInstance.delete(`/api/url/${shortCode}`)
    return response.data
}