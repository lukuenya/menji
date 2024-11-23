import axios from 'axios';
import type { Post, TeamMember, Partner, ContactForm } from '../types';

const API_URL = 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await apiClient.get('/posts/');
  return data;
};

export const fetchPost = async (slug: string): Promise<Post> => {
  const { data } = await apiClient.get(`/posts/${slug}/`);
  return data;
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const { data } = await apiClient.get('/team/');
  return data;
};

export const fetchPartners = async (): Promise<Partner[]> => {
  const { data } = await apiClient.get('/partners/');
  return data;
};

export const submitContact = async (formData: ContactForm) => {
  const { data } = await apiClient.post('/contact/', formData);
  return data;
};