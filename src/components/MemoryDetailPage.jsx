import React, { useState } from 'react';
import "../styles/MemoryDetailPage.css";
import logo from "../assets/logo.svg";
import favicon from "../assets/favicon.svg";
import memoryimg from "../assets/memoryimg.svg";
import editIcon from "../assets/editicon.svg"; 
import deleteIcon from "../assets/deleteicon.svg";
import flowerIcon from "../assets/flower-icon.svg";  
import commentIcon from "../assets/comment-icon.svg";
import boost from "../assets/boosta.svg";
import EditMemoryModal from './EditMemoryModal';
import DeleteMemoryModal from './DeleteMemoryModal';
import CommentModal from './CommentModal';
import EditCommentModal from './EditCommentModal';
import DeleteCommentModal from './DeleteCommentModal';

function MemoryDetailPage() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isEditCommentModalOpen, setEditCommentModalOpen] = useState(false);
  const [isDeleteCommentModalOpen, setDeleteCommentModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedCommentId, setSelectedCommentId] = useState(null); 
  const [likes, setLikes] = useState(0); 

  const handleEditClick = () => setEditModalOpen(true);
  const handleDeleteClick = () => setDeleteModalOpen(true);
  const handleCommentClick = () => setCommentModalOpen(true);
  const handleEditCommentClick = (commentId) => {
    setSelectedCommentId(commentId);
    setEditCommentModalOpen(true);
  };
  const handleDeleteCommentClick = (commentId) => {
    setSelectedCommentId(commentId);
    setDeleteCommentModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const closeCommentModal = () => setCommentModalOpen(false);
  const closeEditCommentModal = () => setEditCommentModalOpen(false);
  const closeDeleteCommentModal = () => setDeleteCommentModalOpen(false);

  // const addComment = (newComment) => {
  //   setComments(prevComments => [...prevComments, newComment]);
  //   setCommentModalOpen(false);
  // };

  const addComment = (nickname, content) => {
    const newComment = {
      nickname,
      content,
      date: new Date().toLocaleString(), 
    };
    setComments(prevComments => [...prevComments, newComment]);
    setCommentModalOpen(false);
  };

  const handleLikeClick = () => {
    setLikes(prevLikes => prevLikes + 1); 
  };

  return (
    <div className="mypage-container">
      <div className="mylogo-content">
        <img src={logo} alt="logo" />
      </div>

      <div className="memorydetail-header">
        <div className="memorydetail-info">
          <div className="memorydetail-button">
            <button className="memorydetail-button-fix" onClick={handleEditClick}>추억 수정하기</button>
            <button className="memorydetail-button-delete" onClick={handleDeleteClick}>추억 삭제하기</button>
          </div>

          <div className="memorydetail-header-nickstatus">
            <div className="memorydetail-nick">부스트 A팀</div>
            <div className="memorydetail-status">공개</div>
          </div>
          
          <div className="memorydetail-title">데모데이</div>
          <div className="memorydetail-tag">#공부 #프로젝트</div>

          <div className="memorydetail-actions">
            <div className="memorydetail-placedate">
              <div className="memorydetail-place">
                숙명여대
              </div>
              <div className="memorydetail-date">
                2024-08-25
              </div>
            </div>
            <div className="memorydetail-icons">
              <img src={flowerIcon} className="flower-icon" alt="공감" />
              <span className="icon-count">{likes}</span> 
              <img src={commentIcon} className="comment-icon" alt="댓글" />
              <span className="icon-count">{comments.length}</span> 
            </div>
            <div className="group-actions">
              <button className="button-empathy" onClick={handleLikeClick}>
                <img src={favicon} className="favicon" alt="favicon" />
                공감 보내기
              </button>
            </div>
          </div>
            
        </div>
        <div className="memorydetail-content">
          <div className="content-img">
            <img src={boost} alt="memory" />
          </div>
          <div className="content-description">
            오늘은 데모데이 당일이다!
          </div>
          <div className="content-button">
            <button className="comment-button" onClick={handleCommentClick}>댓글 등록하기</button>
          </div>
        </div>

        <div className="memorydetail-comment">
          <div className="comment-status">댓글 {comments.length}</div>
          {comments.length === 0 ? (
            <div className="memorydetail-nocomment">
              <div className="nocomment-one">등록된 댓글이 없습니다.</div>
              <div className="nocomment-two">가장 먼저 댓글을 등록해 보세요!</div>
            </div>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="memorydetail-comment-container">
                <div>
                  <div className="memorydetail-comment-nickname">{comment.nickname}</div>
                  <div className="memorydetail-comment-date">{comment.date}</div>
                </div>
                <div className="memorydetail-comment-content">{comment.content}</div>
                <div className="memorydetail-comment-actions">
                  <img src={editIcon} alt="edit" />
                  <img src={deleteIcon} alt="delete" />
                  {/* <img src={editIcon} alt="edit" onClick={() => handleEditCommentClick(comment.id)} />
                  <img src={deleteIcon} alt="delete" onClick={() => handleDeleteCommentClick(comment.id)} /> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <EditMemoryModal isOpen={isEditModalOpen} onClose={closeEditModal} />
      <DeleteMemoryModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
      <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} onSubmit={addComment} />
      <EditCommentModal isOpen={isEditCommentModalOpen} onClose={closeEditCommentModal} commentId={selectedCommentId} />
      <DeleteCommentModal isOpen={isDeleteCommentModalOpen} onClose={closeDeleteCommentModal} commentId={selectedCommentId} />
    </div>
  );
}

export default MemoryDetailPage;