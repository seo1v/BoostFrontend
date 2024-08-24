import React, { useState } from 'react';
import Modal from './Modal';

function EditCommentModal({ isOpen, onClose, commentId }) {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (nickname && content && password) {
      const requestBody = {
        nickname,
        content,
        password
      };

      try {
        const response = await fetch(`https://demo-boost-a.onrender.com/api/comments/${commentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('댓글 수정 성공:', result);
          onClose(); // 모달 닫기
        } else {
          console.error('댓글 수정 실패:', response.statusText);
        }
      } catch (error) {
        console.error('서버 연결 실패:', error);
      }
    } else {
      alert("모든 필드를 입력해 주세요.");
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="comment-modal">
        <div className="comment-title">댓글 수정</div>
        <div className="comment-nickname">닉네임</div>
        <input className="comment-nicknameinput"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <div className="comment-content">댓글</div>
        <input className="comment-contentinput"
          type="text"
          placeholder="댓글을 입력해 주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="comment-pwd">수정 권한</div>
        <input className="comment-pwdinput" 
          type="password" 
          placeholder="댓글 비밀번호를 입력해 주세요" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="comment-button" onClick={handleSubmit}>등록하기</button>
      </div>
    </Modal>
  );
}

export default EditCommentModal;