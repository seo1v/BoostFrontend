import React, { useState } from 'react';
import BigModal from './BigModal';
import "../styles/EditMemoryModal.css";

function EditMemoryModal({ isOpen, onClose, postId }) {
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState("");
  const [memoryDate, setMemoryDate] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const requestBody = {
      nickname,
      title,
      content,
      postPassword: password,
      imageUrl: image ? URL.createObjectURL(image) : "",
      tags,
      location,
      moment: memoryDate,
      isPublic,
    };

    try {
      const response = await fetch(`https://demo-boost-a.onrender.com/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('게시글 수정 성공:', result);
        onClose();  
      } else {
        console.error('게시글 수정 실패:', response.statusText);
      }
    } catch (error) {
      console.error('서버 연결 실패:', error);
    }
  };

  return (
    <BigModal isOpen={isOpen} onClose={onClose}>
      <div className="editmemory-page">
          <div className="editmemory-pagetitle">추억 수정</div>
          <div className="editmemory-container">
            <div className="editmemory-left-section">
              <div className="editmemory-nick">닉네임</div>
              <div className="editmemory-nick-container">
                <input className="editmemory-nickinput"
                  type="text" 
                  value={nickname} 
                  onChange={(e) => setNickname(e.target.value)} 
                  placeholder="닉네임을 입력해 주세요"
                />
              </div>
              
              <div className="editmemory-title">제목</div>
              <div className="editmemory-title-container">
                <input className="editmemory-titleinput"
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="제목을 입력해 주세요"
                />
              </div>
              
              <div className="editmemory-img">이미지</div>
              <div className="editmemory-img-container">
                <input className="editmemory-imginput"
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              
              <div className="editmemory-content">본문</div>
              <div className="editmemory-content-container">
                <textarea className="editmemory-contentinput"
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="본문 내용을 입력해 주세요"
                ></textarea>
              </div>
            </div>
            <div className="editmemory-right-section">
              <div className="editmemory-tag">태그</div>
              <div className="editmemory-tag-container">
                <input className="editmemory-taginput"
                  type="text" 
                  value={tags.join(', ')} 
                  onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                  placeholder="태그를 입력해 주세요 (쉼표로 구분)"
                />
              </div>
              <div className="editmemory-place">장소</div>
              <div className="editmemory-place-container">
                <input className="editmemory-placeinput"
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="장소를 입력해 주세요"
                />
              </div>
              
              <div className="editmemory-time">추억의 순간</div>
              <div className="editmemory-time-container">
                <input className="editmemory-timeinput"
                  type="date" 
                  value={memoryDate} 
                  onChange={(e) => setMemoryDate(e.target.value)} 
                />
              </div>
              
              <div className="editmemory-select">추억 공개 선택</div>
              <div className="editmemory-select-container">
                <input className="editmemory-selectinput"
                  type="checkbox" 
                  checked={isPublic} 
                  onChange={() => setIsPublic(!isPublic)} 
                /> 공개
              </div>
              
              <div className="editmemory-pwd">비밀번호 생성</div>
              <div className="editmemory-pwd-container">
                <input className="editmemory-pwdinput"
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="추억 비밀번호를 생성해 주세요"
                />
              </div>
            </div>
          </div>
          <div className="editmemory-button-contatiner">
            <button className="editmemory-button" onClick={handleSubmit}>올리기</button>
          </div>
        </div>
    </BigModal>
  );
}

export default EditMemoryModal;