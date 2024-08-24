import React, { useState } from 'react';
import Modal from './Modal';
import "../styles/CommentModal.css";

function CommentModal({ isOpen, onClose, onSubmit }) {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (nickname && content && password) {
      onSubmit(nickname, content);
      setNickname('');
      setContent('');
      setPassword('');
    } else {
      alert("모든 필드를 입력해 주세요.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="comment-modal">
        <div className="comment-title">댓글 등록</div>
        <div className="comment-nickname">닉네임</div>
        <div className="comment-nickname-container">
          <input className="comment-nicknameinput"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="comment-content">댓글</div>
        <div className="comment-content-container">
          <input className="comment-contentinput"
            type="text"
            placeholder="댓글을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="comment-pwd">비밀번호 생성</div>
        <div className="comment-pwd-container">
          <input className="comment-pwdinput" 
            type="password" 
            placeholder="댓글 비밀번호를 생성해 주세요" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="comment-button-container">
          <button className="comment-button" onClick={handleSubmit}>등록하기</button>
        </div>
      </div>
    </Modal>
  );
}

export default CommentModal;
// import React, { useState } from 'react';
// import Modal from './Modal';
// import "../styles/CommentModal.css";

// function CommentModal({ isOpen, onClose, onSubmit }) {
//   const [nickname, setNickname] = useState('');
//   const [content, setContent] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async () => {
//     if (nickname && content && password) {
//       const requestBody = {
//         nickname,
//         content,
//         password
//       };

//       // try {
//       //   const response = await fetch(`https://demo-boost-a.onrender.com/api/posts/${postId}/comments`, {
//       //     method: 'POST',
//       //     headers: {
//       //       'Content-Type': 'application/json',
//       //     },
//       //     body: JSON.stringify(requestBody),
//       //   });

//       //   if (response.ok) {
//       //     const result = await response.json();
//       //     console.log('댓글 등록 성공:', result);
//       //     onSubmit(result);
//       //     setNickname('');
//       //     setContent('');
//       //     setPassword('');
//       //     onClose(); 
//       //   } else {
//       //     console.error('댓글 등록 실패:', response.statusText);
//       //   }
//       // } catch (error) {
//       //   console.error('서버 연결 실패:', error);
//       // }
//     } else {
//       alert("모든 필드를 입력해 주세요.");
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="comment-modal">
//         <div className="comment-title">댓글 등록</div>
//         <div className="comment-nickname">닉네임</div>
//         <div className="comment-nickname-container">
//           <input className="comment-nicknameinput"
//             type="text"
//             placeholder="닉네임을 입력해 주세요"
//             value={nickname}
//             onChange={(e) => setNickname(e.target.value)}
//           />
//         </div>
//         <div className="comment-content">댓글</div>
//         <div className="comment-content-container">
//           <input className="comment-contentinput"
//             type="text"
//             placeholder="댓글을 입력해 주세요"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </div>
//         <div className="comment-pwd">비밀번호 생성</div>
//         <div className="comment-pwd-container">
//           <input className="comment-pwdinput" 
//             type="password" 
//             placeholder="댓글 비밀번호를 생성해 주세요" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="comment-button-container">
//           <button className="comment-button" onClick={handleSubmit}>등록하기</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default CommentModal;