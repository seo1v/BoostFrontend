import React, { useState } from 'react';
import Modal from './Modal';
import "../styles/EditGroupModal.css";

function EditGroupModal({ isOpen, onClose, groupId }) {
  const [groupName, setGroupName] = useState("달봉이네 가족");
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [imageUrl, setImageUrl] = useState("");  

  const handleGroupNameChange = (e) => setGroupName(e.target.value);
  const handlePublicChange = () => setIsPublic(!isPublic);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleIntroductionChange = (e) => setIntroduction(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.files[0]); 

  const handleSubmit = async () => {
    const requestBody = {
      name: groupName,
      password: password,
      imageUrl: imageUrl ? URL.createObjectURL(imageUrl) : "",  
      isPublic: isPublic,
      introduction: introduction
    };

    try {
      const response = await fetch(`https://demo-boost-a.onrender.com/api/groups/${groupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('그룹 정보 수정 성공:', result);
        onClose();  
      } else {
        console.error('그룹 정보 수정 실패:', response.statusText);
      }
    } catch (error) {
      console.error('서버 연결 실패:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="edit-modal">
        <div className="edit-title">그룹 정보 수정</div>
        <div className="edit-input">그룹명</div>
        <div className="edit-input-container">
          <input className="edit-inputtext"
            type="text" 
            placeholder="부스트 A팀"
          />
        </div>
        
        <div className="edit-img">대표 이미지</div>
        <div className="edit-img-container">
          <input 
          className="edit-inputimg" 
          type="file"
          onChange={handleImageUrlChange} 
          />
        </div>

        <div className="edit-group">그룹 소개</div>
        <div className="edit-group-container">
          <textarea 
          className="edit-inputgroup" 
          placeholder="안녕하세요 저희는 코드잇 부스트 A팀입니다."
          value={introduction}
          onChange={handleIntroductionChange}
          ></textarea>
        </div>

        <div className="edit-private">그룹 공개 선택</div>
        <div className="edit-select-container">
          <input className="edit-select"
            type="checkbox" 
            checked={isPublic} 
            onChange={handlePublicChange} 
          /> 공개
        </div>
        
        <div className="edit-pwd">수정 권한 인증</div>
        <div className="edit-pwd-container">
          <input className="edit-inputpwd"
            type="password" 
            placeholder="그룹 비밀번호를 입력해 주세요" 
            value={password} 
            onChange={handlePasswordChange} 
          />
        </div>
        
        <div className="edit-button-container">
          <button className="edit-button" onClick={handleSubmit}>수정하기</button>
        </div>
      </div>
      
    </Modal>
  );
}

export default EditGroupModal;