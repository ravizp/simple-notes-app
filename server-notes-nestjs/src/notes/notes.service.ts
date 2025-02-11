import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  private notes: NoteDto[] = [];
  private idCounter = 1;

  create(title: string, content: string): NoteDto {
    const note: NoteDto = {
      id: this.idCounter++,
      title,
      content,
      isDeleted: false,
    };
    this.notes.push(note);
    return note;
  }

  findAll(): NoteDto[] {
    return this.notes.filter((note) => !note.isDeleted);
  }

  findOne(id: number): NoteDto {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new NotFoundException(`Note dengan ID ${id} tidak ditemukan`);
    }
    return note;
  }

  update(id: number, title: string, content: string): NoteDto {
    const note = this.findOne(id);
    note.title = title;
    note.content = content;
    return note;
  }

  delete(id: number): void {
    const note = this.findOne(id);
    if (!note.isDeleted) {
      note.isDeleted = true; // Tandai sebagai terhapus
    } else {
      throw new NotFoundException(`Note dengan ID ${id} sudah dihapus`);
    }
  }

  restore(id: number): void {
    const note = this.findOne(id);
    if (note.isDeleted) {
      note.isDeleted = false;
    } else {
      throw new NotFoundException(`Note dengan ID ${id} tidak ada di trash`);
    }
  }

  /**
   * Mengambil semua note yang ada di trash (isDeleted = true)
   * Memastikan hanya menampilkan yang benar-benar terhapus.
   */
  findTrashed(): NoteDto[] {
    return this.notes.filter((note) => note.isDeleted === true);
  }
}
