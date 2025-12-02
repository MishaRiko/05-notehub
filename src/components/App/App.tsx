import { useState } from 'react';
import NoteList from '../NoteLists/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modals/Modal';
import NoteForm from '../NoteForms/NoteForm';
import css from './App.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';

function App() {
  const queryClient = useQueryClient();
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  // const [totalPages, setTotalPages] = useState(1);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearch} />
        <Pagination page={page} setPage={setPage} pageCount={1} />

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <NoteList page={page} search={search} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSubmit={values => {
              createNoteMutation.mutate(values, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['notes'] });
                  setIsModalOpen(false);
                },
              });
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
