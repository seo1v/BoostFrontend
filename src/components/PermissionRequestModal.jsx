import React, { useState } from 'react';
import Modal from "./Modal"
import "../styles/PermissionRequestModal.css";
import { Link } from 'react-router-dom';

function PermissionRequestModal({ isOpen, onClose }) {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = () => {
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="permission-modal">
          <div className="permission-title">추억 올리기</div>
          <label className="permission-input">올리기 권한 인증</label>
          <div className="permission-input-container">
            <input className="permission-inputtext"
              type="password" 
              placeholder="그룹 비밀번호를 입력해 주세요" 
              value={password} 
              onChange={handlePasswordChange} 
            />
          </div>
          <div className="permission-button-container">
            <Link to="/memorydetail">
            <button className="permission-button" onClick={handleSubmit}>제출하기</button>
            </Link>
          </div>
        </div>
    </Modal> 
  );
}

export default PermissionRequestModal;