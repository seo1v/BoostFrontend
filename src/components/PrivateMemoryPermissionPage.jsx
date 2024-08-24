import React, { useState } from 'react';
import "../styles/PrivateMemoryPermissionPage.css"
import logo from "../assets/logo.svg";

function PrivateMemoryPermissionPage({ postId, onAuthorized }) {
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://demo-boost-a.onrender.com/api/posts/${postId}/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: inputPassword }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.isAuthorized) {
          onAuthorized(); 
        } else {
          setErrorMessage("비밀번호가 틀렸습니다. 다시 시도해 주세요.");
        }
      } else {
        setErrorMessage("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    } catch (error) {
      setErrorMessage("서버 연결에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="page-container">
      <div className="logo-content">
        <img src={logo} />
      </div>
      <div className="privatepermission-title">
        비공개 추억
      </div>
      <div className="privatepermission-description">
        비공개 추억에 접근하기 위해 권한 확인이 필요합니다.
      </div>
      <div className="privatepermission-pwd">
          비밀번호 입력
      </div>
      <div className="privatepermission-password">
        <input className="privatepermission-pwdinput"
          type="password"
          placeholder="추억 비밀번호를 입력해 주세요"
          value={inputPassword}
          onChange={handlePasswordChange}
        />
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="privatepermission-button-container">
        <button className="privatepermission-button" onClick={handleSubmit}>제출하기</button>
      </div>
    </div>
  )
}

export default PrivateMemoryPermissionPage