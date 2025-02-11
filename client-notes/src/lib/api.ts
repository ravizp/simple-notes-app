import type { Note } from "@/types/note";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${API_URL}/notes`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function fetchTrashedNotes(): Promise<Note[]> {
  const res = await fetch(`${API_URL}/notes/trash`);
  if (!res.ok) throw new Error("Failed to fetch trashed notes");
  return res.json();
}

export async function fetchNoteById(id: number): Promise<Note> {
  const res = await fetch(`${API_URL}/notes/${id}`);
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
}

export async function createNote(
  title: string,
  content: string
): Promise<Note> {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(
  id: number,
  title: string,
  content: string
): Promise<Note> {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNote(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
}

export async function restoreNote(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/notes/${id}/restore`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to restore note");
}
