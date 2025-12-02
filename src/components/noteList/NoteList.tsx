import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import css from './NoteList.module.css';
import type { Note } from '../../types/note';

interface NoteListProps {
  page: number;
  search: string;
}

export default function NoteList({ page, search }: NoteListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, 12, search),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data?.items?.length) return <p>No notes found</p>;

  return (
    <ul className={css.list}>
      {data.items.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
