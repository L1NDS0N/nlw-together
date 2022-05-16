import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../services/firebase';
import { get, ref } from 'firebase/database';

import googleIconImg from '../../assets/images/google-icon.svg';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import '../../styles/auth.scss';

export default function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();
    navigate('/rooms/new');
  }

  async function handleJoinRoom(event: React.FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === '') return;

    const roomRef = ref(db, `rooms/${roomCode}`);
    const roomExists = (await get(roomRef)).exists();
    if (!roomExists) {
      alert("Room doesn't exists.");
      return;
    }

  if ((await get(roomRef)).val().endedAt) {
    alert('Room already closed')
    return;
  }
    
    navigate(`/rooms/${roomCode}`);
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              onChange={e => setRoomCode(e.target.value)}
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
