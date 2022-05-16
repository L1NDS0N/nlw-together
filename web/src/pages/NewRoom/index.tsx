import { Database } from 'firebase/database';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../services/firebase';
import { ref as dbRef, push as dbPush } from 'firebase/database';
import '../../styles/auth.scss';

export default function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const navigate = useNavigate();

  async function handleCreateRoom(event: React.FormEvent) {
    event.preventDefault();
    if (!user) return;
    if (newRoom.trim() === '') return;

    const roomRef = dbRef(db, `rooms`);
    const firebaseRoom = await dbPush(roomRef, {
      title: newRoom,
      authorId: user?.id,
      createdAt: new Date().toISOString(),
    });

    navigate(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              onChange={e => setNewRoom(e.target.value)}
              placeholder="Nome da sala"
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente?{' '}
            <Link to={'/'}> Clique aqui</Link>{' '}
          </p>
        </div>
      </main>
    </div>
  );
}
