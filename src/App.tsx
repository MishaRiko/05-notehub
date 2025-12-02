import { useState } from 'react';
import NoteList from './components/noteList/NoteList';
import SearchBox from './components/searchBox/SearchBox';
import Pagination from './components/pagination/Pagination';
import Modal from './components/modal/Modal';
import NoteForm from './components/noteForm/NoteForm';
import css from './App.module.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearch} />
        <Pagination page={page} setPage={setPage} />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <NoteList page={page} search={search} />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
