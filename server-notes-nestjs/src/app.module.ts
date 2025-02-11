import { Module } from '@nestjs/common';
import { NoteController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';

@Module({
  imports: [],
  controllers: [NoteController],
  providers: [NotesService],
})
export class AppModule {}
