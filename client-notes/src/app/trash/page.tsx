"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { NoteCard } from "@/components/note-card";
import type { Note } from "@/types/note";
import * as api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export default function TrashPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    loadTrashedNotes();
  }, []);

  async function loadTrashedNotes() {
    try {
      const data = await api.fetchTrashedNotes();
      setNotes(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load trashed notes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRestore(id: number) {
    try {
      await api.restoreNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast({
        title: "Success",
        description: "Note restored successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore note",
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
        <h1 className="text-3xl font-bold">Trash</h1>
        <Button variant="outline" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Notes
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No notes in trash
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => {}}
              onDelete={() => {}}
              onRestore={handleRestore}
            />
          ))}
        </div>
      )}
    </div>
  );
}
