import { push, ref, remove, update } from 'firebase/database';
import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import Question from '../../components/Question';
import RoomCode from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { db } from '../../services/firebase';

import '../Room/styles.scss';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

type RoomParams = {
  id: string;
};

export default function AdminRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id || '';
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    if (confirm('Tem certeza que deseja deletar a sala?')) {
      const dbRef = ref(db, `rooms/${roomId}`);
      await update(dbRef, {
        endedAt: new Date(),
      });
      navigate('/');
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (confirm('Tem certeza que deseja excluir esta pergunta?')) {
      const questionRef = ref(db, `rooms/${roomId}/questions/${questionId}`);
      await remove(questionRef);
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    if (confirm('Marcar como respondida?')) {
      const questionRef = ref(db, `rooms/${roomId}/questions/${questionId}`);
      await update(questionRef, { isAnswered: true });
    }
  }

  async function handleHighlighQuestion(questionId: string) {
    if (confirm('Deseja destacar esta pergunta?')) {
      const questionRef = ref(db, `rooms/${roomId}/questions/${questionId}`);
      await update(questionRef, { isHighlighted: true });
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                        title="Marcar pergunta como respondida"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlighQuestion(question.id)}
                    >
                      <img
                        src={answerImg}
                        alt="Dar destaque à pergunta"
                        title="Dar destaque à pergunta"
                      />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img
                    src={deleteImg}
                    alt="Remover pergunta"
                    title="Remover pergunta"
                  />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
