import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  private notes: NoteDto[] = [];
  private idCount = 1;

  //add a new note
  create(title: string, content: string): NoteDto {
    const note: NoteDto = {
      id: this.idCount++,
      title,
      content,
      isDeleted: false,
    };
    this.notes.push(note);
    return note;
  }

  //find all note
  findAll(): NoteDto[] {
    return this.notes.filter((note) => !note.isDeleted);
  }

  // Retrieve a specific note by ID
  findOne(id: number): NoteDto {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  // Edit an existing note
  update(id: number, title: string, content: string): NoteDto {
    const note = this.findOne(id);
    note.title = title;
    note.content = content;
    return note;
  }

  // delete - move to trash
  delete(id: number): void {
    const note = this.findOne(id);
    note.isDeleted = true;
  }

  // Restore a note from trash
  restore(id: number): void {
    const note = this.findOne(id);
    note.isDeleted = false;
  }

  // Retrieve all notes in trash
  findTrashed(): NoteDto[] {
    return this.notes.filter((note) => note.isDeleted === true);
  }
}
