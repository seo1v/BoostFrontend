import React, { useState, useRef } from 'react';
import "../styles/createGroupPage.css";
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

function CreateGroupPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true); // 성공 여부를 기본값으로 설정
  const [fileName, setFileName] = useState('파일을 선택하세요'); // 선택된 파일 이름 상태

  // 파일 input 참조를 위한 useRef
  const fileInputRef = useRef(null);

  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 폼 검증과 API 제출을 처리할 수 있습니다
    const isValid = true; // 폼 검증을 시뮬레이션

    if (isValid) {
      setIsSuccess(true);  // 성공 시
    } else {
      setIsSuccess(false); // 실패 시
    }

    setModalVisible(true); // 모달 표시
  };

  const closeModal = () => {
    setModalVisible(false); // 모달 닫기
    navigate('/group'); // '/group' 페이지로 이동
  };

  // 파일 선택 버튼 클릭 핸들러
  const handleFileSelectClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 시 파일 이름 업데이트
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('파일을 선택하세요');
    }
  };

  return (
    <div className="create">
      <div className="page-container">
        <div className="logo-content">
          <img src={logo} alt="logo" />
        </div>

        <div className="form-container">
          <h3>그룹 만들기</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="group-name">그룹명</label>
              <input type="text" id="group-name" placeholder="그룹명을 입력하세요." />
            </div>

            <div className="form-group">
              <label htmlFor="group-image">대표 이미지</label>
              <div className="image-upload">
                <span className="file-label">{fileName}</span>
                <input 
                  type="file" 
                  id="group-image" 
                  ref={fileInputRef}
                  style={{ display: 'none' }} 
                  onChange={handleFileChange} // 파일 변경 이벤트 핸들러 추가
                />
                <button type="button" onClick={handleFileSelectClick}>파일 선택</button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="group-description">그룹 소개</label>
              <textarea id="group-description" placeholder="그룹 소개를 입력하세요."></textarea>
            </div>

            <div className="form-group">
              <label>그룹 선택 여부</label>
              <div className="visibility-options">
                <label>
                  <input type="radio" name="visibility" value="public" />
                  공개
                </label>
                <label>
                  <input type="radio" name="visibility" value="private" />
                  비공개
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" placeholder="비밀번호를 입력하세요." />
            </div>

            <button type="submit" className="create-group">만들기</button>
          </form>
        </div>

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h3>{isSuccess ? '그룹 만들기 성공' : '그룹 만들기 실패'}</h3>
              <p>{isSuccess ? '그룹이 성공적으로 등록되었습니다.' : '그룹 등록에 실패했습니다.'}</p>
              <button onClick={closeModal}>확인</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateGroupPage;

