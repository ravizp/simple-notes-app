import type { Note } from "@/types/note";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, RotateCcw } from "lucide-react";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onRestore?: (id: number) => void;
}

export function NoteCard({ note, onEdit, onDelete, onRestore }: NoteCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {note.content}
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        {!note.isDeleted ? (
          <>
            <Button variant="outline" size="sm" onClick={() => onEdit(note)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(note.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </>
        ) : (
          onRestore && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRestore(note.id)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restore
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}
