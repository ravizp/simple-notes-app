import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat note baru' })
  @ApiBody({
    schema: { example: { title: 'Meeting', content: 'Diskusi proyek' } },
  })
  create(@Body('title') title: string, @Body('content') content: string) {
    return this.notesService.create(title, content);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua note aktif' })
  findAll() {
    return this.notesService.findAll();
  }

  @Get('trash')
  @ApiOperation({ summary: 'Mengambil semua note di trash' })
  findTrashed() {
    return this.notesService.findTrashed();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil note berdasarkan ID' })
  @ApiParam({ name: 'id', example: 1 })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mengedit note' })
  @ApiBody({ schema: { example: { title: 'Update', content: 'Isi update' } } })
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.notesService.update(+id, title, content);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus note (soft delete)' })
  delete(@Param('id') id: string) {
    this.notesService.delete(+id);
    return { message: `Note ${id} dipindahkan ke trash` };
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Mengembalikan note dari trash' })
  restore(@Param('id') id: string) {
    this.notesService.restore(+id);
    return { message: `Note ${id} dikembalikan` };
  }
}
