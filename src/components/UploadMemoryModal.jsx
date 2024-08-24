import React, { useState } from 'react';
// import Modal from './Modal';
import PermissionRequestModal from './PermissionRequestModal';
import '../styles/UploadMemoryModal.css';

function UploadMemoryModal({ isOpen, onClose, groupPassword }) {
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState("");
  const [memoryDate, setMemoryDate] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [isPermissionModalOpen, setPermissionModalOpen] = useState(false); 
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleSubmit = () => {
    setPermissionModalOpen(true);
  };

  const closePermissionModal = () => {
    setPermissionModalOpen(false);
    if (isAuthorized) {
      uploadMemory();
    }
  };

  const handlePasswordSubmit = (submittedPassword) => {
    if (submittedPassword === groupPassword) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      alert('비밀번호가 일치하지 않습니다.');
    }
    closePermissionModal();
  };

  const uploadMemory = async () => {
    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("postPassword", password);
      formData.append("groupPassword", groupPassword); 
      if (image) {
        formData.append("imageUrl", image);
      }
      formData.append("tags", JSON.stringify(tags));
      formData.append("location", location);
      formData.append("moment", memoryDate);
      formData.append("isPublic", isPublic);

      const response = await fetch(`https://demo-boost-a.onrender.com/api/groups/${groupId}/posts`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('게시물 등록 성공:', result);
        onClose(); 
      } else {
        console.error('게시물 등록 실패:', response.statusText);
      }
    } catch (error) {
      console.error('서버 연결 실패:', error);
    }
  };

  return (
    <>
      {/* <Modal isOpen={isOpen} onClose={onClose}> */}
        <div className="uploadmemory-page">
          <div className="uploadmemory-pagetitle">추억 올리기</div>
          <div className="uploadmemory-container">
            <div className="left-section">
              <div className="uploadmemory-nick">닉네임</div>
              <div className="uploadmemory-nick-container">
                <input className="uploadmemory-nickinput"
                  type="text" 
                  value={nickname} 
                  onChange={(e) => setNickname(e.target.value)} 
                  placeholder="닉네임을 입력해 주세요"
                />
              </div>
              
              <div className="uploadmemory-title">제목</div>
              <div className="uploadmemory-title-container">
                <input className="uploadmemory-titleinput"
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="제목을 입력해 주세요"
                />
              </div>
              
              <div className="uploadmemory-img">이미지</div>
              <div className="uploadmemory-img-container">
                <input className="uploadmemory-imginput"
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              
              <div className="uploadmemory-content">본문</div>
              <div className="uploadmemory-content-container">
                <textarea className="uploadmemory-contentinput"
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="본문 내용을 입력해 주세요"
                ></textarea>
              </div>
            </div>
            <div className="right-section">
              <div className="uploadmemory-tag">태그</div>
              <div className="uploadmemory-tag-container">
                <input className="uploadmemory-taginput"
                  type="text" 
                  value={tags.join(', ')} 
                  onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                  placeholder="태그를 입력해 주세요 (쉼표로 구분)"
                />
              </div>
              <div className="uploadmemory-place">장소</div>
              <div className="uploadmemory-place-container">
                <input className="uploadmemory-placeinput"
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="장소를 입력해 주세요"
                />
              </div>
              
              <div className="uploadmemory-time">추억의 순간</div>
              <div className="uploadmemory-time-container">
                <input className="uploadmemory-timeinput"
                  type="date" 
                  value={memoryDate} 
                  onChange={(e) => setMemoryDate(e.target.value)} 
                />
              </div>
              
              <div className="uploadmemory-select">추억 공개 선택</div>
              <div className="uploadmemory-select-container">
                <input className="uploadmemory-selectinput"
                  type="checkbox" 
                  checked={isPublic} 
                  onChange={() => setIsPublic(!isPublic)} 
                /> 공개
              </div>
              
              <div className="uploadmemory-pwd">비밀번호 생성</div>
              <div className="uploadmemory-pwd-container">
                <input className="uploadmemory-pwdinput"
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="추억 비밀번호를 생성해 주세요"
                />
              </div>
            </div>
          </div>
          <div className="uploadmemory-button-contatiner">
            <button className="uploadmemory-button" onClick={handleSubmit}>올리기</button>
          </div>
        </div>
      {/* </Modal> */}

      <PermissionRequestModal 
        isOpen={isPermissionModalOpen} 
        onClose={closePermissionModal} 
        onPasswordSubmit={handlePasswordSubmit} 
      />
    </>
  );
}

export default UploadMemoryModal;