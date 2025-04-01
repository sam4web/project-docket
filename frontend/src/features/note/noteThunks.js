import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axiosInstance.js";


export const fetchNotesQuery = createAsyncThunk("notes/fetchAllNotes", async (_, { getState, rejectWithValue }) => {
  try {
    const response = await api.get("/notes", {
      headers: {
        Authorization: `Bearer ${getState().user?.token}`,
      },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateNoteRecord = createAsyncThunk("notes/editNote", async (note, { getState, rejectWithValue }) => {
  try {
    const response = await api.patch(`/notes/${note.id}`, note, {
      headers: {
        Authorization: `Bearer ${getState().user?.token}`,
      },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteNoteRequest = createAsyncThunk("notes/deleteNote", async (noteId, { getState, rejectWithValue }) => {
  try {
    await api.delete(`/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${getState().user?.token}`,
      },
    });
    return noteId;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createNoteEntry = createAsyncThunk("notes/createNote", async (newNote, { getState, rejectWithValue }) => {
  try {
    const response = await api.post("/notes", newNote, {
      headers: {
        Authorization: `Bearer ${getState().user?.token}`,
      },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});