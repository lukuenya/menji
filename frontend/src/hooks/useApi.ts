import { useQuery, useMutation } from 'react-query';
import { fetchPosts, fetchPost, fetchTeamMembers, fetchPartners, submitContact } from '../api/client';
import type { ContactForm } from '../types';

export const usePosts = () => {
  return useQuery('posts', fetchPosts);
};

export const usePost = (slug: string) => {
  return useQuery(['post', slug], () => fetchPost(slug), {
    enabled: !!slug,
  });
};

export const useTeamMembers = () => {
  return useQuery('team', fetchTeamMembers);
};

export const usePartners = () => {
  return useQuery('partners', fetchPartners);
};

export const useContactSubmit = () => {
  return useMutation((data: ContactForm) => submitContact(data));
};