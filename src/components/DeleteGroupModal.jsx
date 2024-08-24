import React, { useState } from 'react';
import Modal from './Modal';
import "../styles/DeleteGroupModal.css";

function DeleteGroupModal({ isOpen, onClose, groupId }) {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleDelete = async () => {
    const requestBody = {
      password: password,
    };

    try {
      const response = await fetch(`https://demo-boost-a.onrender.com/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('그룹 삭제 성공:', result.message);
        onClose();  
      } else {
        console.error('그룹 삭제 실패:', response.statusText);
      }
    } catch (error) {
      console.error('서버 연결 실패:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-modal">
        <div className="delete-title">그룹 삭제</div>
        <div className="delete-input">삭제 권한 인증</div>
        <div className="delete-input-container">
          <input className="delete-inputtext" 
            type="password" 
            placeholder="그룹 비밀번호를 입력해 주세요" 
            value={password} 
            onChange={handlePasswordChange} 
          />
        </div>
        <div className="delete-button-container">
          <button className="delete-button" onClick={handleDelete}>삭제하기</button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteGroupModal;