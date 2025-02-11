import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiBody({ schema: { example: { title: 'New Note', content: 'Isi Note' } } })
  create(@Body('title') title: string, @Body('content') content: string) {
    return this.noteService.create(title, content);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Notes' })
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific note by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Note ID' })
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit an existing note' })
  @ApiParam({ name: 'id', example: 1, description: 'Note ID' })
  @ApiBody({
    schema: { example: { title: 'Updated Title', content: 'Updated content' } },
  })
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.noteService.update(+id, title, content);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Move a note to trash' })
  @ApiParam({ name: 'id', example: 1, description: 'Note ID' })
  delete(@Param('id') id: string) {
    this.noteService.delete(+id);
    return { message: `Note ${id} moved to trash` };
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restore a note from trash' })
  @ApiParam({ name: 'id', example: 1, description: 'Note ID' })
  restore(@Param('id') id: string) {
    this.noteService.restore(+id);
    return { message: `Note ${id} restored` };
  }

  @Get('/trash')
  @ApiOperation({ summary: 'Get all notes in trash' })
  findTrashed() {
    return this.noteService.findTrashed();
  }
}
