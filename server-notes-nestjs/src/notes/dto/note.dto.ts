import { ApiProperty } from '@nestjs/swagger';

export class NoteDto {
  @ApiProperty({ example: 1, description: 'Uniqe ID' })
  id: number;

  @ApiProperty({ example: 'Meeting', description: 'Tittle Note' })
  title: string;

  @ApiProperty({ example: 'Disscuss bla bla', description: 'isi content' })
  content: string;

  @ApiProperty({ example: false, description: 'In Trash' })
  isDeleted: boolean;
}
