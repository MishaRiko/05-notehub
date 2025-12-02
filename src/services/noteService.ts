import axios from 'axios';
import type { Note } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}
export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string
): Promise<FetchNotesResponse> => {
  const response = await axios.get(`${API_URL}/notes`, {
    params: { page, perPage, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: Note['tag'];
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await axios.post(`${API_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const response = await axios.delete(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
