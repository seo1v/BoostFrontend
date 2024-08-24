import React, { useState } from 'react';
import Modal from './Modal';
import "../styles/DeleteGroupModal.css";

function DeleteGroupModal({ isOpen, onClose, postId }) {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleDelete = async () => {
    const requestBody = {
      postPassword: password,
    };

    try {
      const response = await fetch(`https://demo-boost-a.onrender.com/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('게시글 삭제 성공:', result.message);
        onClose();  
      } else {
        console.error('게시글 삭제 실패:', response.statusText);
      }
    } catch (error) {
      console.error('서버 연결 실패:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-modal">
        <div className="delete-title">추억 삭제</div>
        <div className="delete-input">삭제 권한 인증</div>
        <input className="delete-inputtext" 
          type="password" 
          placeholder="추억 비밀번호를 입력해 주세요" 
          value={password} 
          onChange={handlePasswordChange} 
        />
        <button className="delete-button" onClick={handleDelete}>삭제하기</button>
      </div>
    </Modal>
  );
}

export default DeleteGroupModal;