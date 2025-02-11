"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { NoteCard } from "@/components/note-card";
import { NoteFormDialog } from "@/components/note-form-dialog";
import type { Note } from "@/types/note";
import * as api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(false); // Update 1
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const data = await api.fetchNotes();
      setNotes(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate(title: string, content: string) {
    try {
      const newNote = await api.createNote(title, content);
      setNotes((prev) => [...prev, newNote]);
      toast({
        title: "Success",
        description: "Note created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  }

  async function handleEdit(note: Note) {
    // Update 2
    setIsLoadingNote(true);
    try {
      const fullNote = await api.fetchNoteById(note.id);
      setEditingNote(fullNote);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load note details",
        variant: "destructive",
      });
    } finally {
      setIsLoadingNote(false);
    }
  }

  async function handleUpdate(title: string, content: string) {
    if (!editingNote) return;
    try {
      const updatedNote = await api.updateNote(editingNote.id, title, content);
      setNotes((prev) =>
        prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
      setEditingNote(null);
      toast({
        title: "Success",
        description: "Note updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast({
        title: "Success",
        description: "Note moved to trash",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Notes</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push("/trash")}>
            <Trash className="h-4 w-4 mr-2" />
            Trash
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No notes yet. Create one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            /> // Update 3
          ))}
        </div>
      )}

      <NoteFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
      />

      <NoteFormDialog // Update 4
        open={!!editingNote}
        onOpenChange={(open) => !open && setEditingNote(null)}
        onSubmit={handleUpdate}
        initialData={editingNote}
        isLoading={isLoadingNote}
      />
    </div>
  );
}
