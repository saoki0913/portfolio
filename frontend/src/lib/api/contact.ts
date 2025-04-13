import apiClient from './client';
import { ContactRequest, ContactResponse } from '@/lib/types/contact';


export const sendContactMessage = async (data: ContactRequest): Promise<ContactResponse> => {
    const response = await apiClient.post<ContactResponse>('/contact', data);
    return response.data;
}; 
