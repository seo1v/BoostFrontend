import React, { useState, useEffect } from 'react';
import "../styles/GroupPage.css";
import logo from "../assets/logo.svg";
import groupimg from "../assets/groupimg.svg";
import favicon from "../assets/favicon.svg";
import publicimg from "../assets/public.svg";
import privateimg from "../assets/private0.svg";
import nomemory from "../assets/nomemory.svg";
import boost from "../assets/boosta.svg";
import EditGroupModal from './EditGroupModal';
import DeleteGroupModal from './DeleteGroupModal';
import { Link } from 'react-router-dom';

function GroupPage() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isPublic, setIsPublic] = useState(true);
  const [likes, setLikes] = useState(0); 

  // useEffect(() => {
  //   fetchPosts();
  // }, [keyword, sortBy, page, isPublic]);

  // const fetchPosts = async () => {
  //   try {
  //     const response = await fetch(`https://demo-boost-a.onrender.com/api/groups/${groupId}/posts?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&keyword=${keyword}&isPublic=${isPublic}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       setPosts(result.data);
  //       setTotalPages(result.totalPages);
  //     } else {
  //       console.error('게시물 목록 조회 실패:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('서버 연결 실패:', error);
  //   }
  // };

  const handleEditClick = () => setEditModalOpen(true);
  const handleDeleteClick = () => setDeleteModalOpen(true);

  const closeEditModal = () => setEditModalOpen(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // const likeGroup = async () => {
  //   try {
  //     const response = await fetch(`https://demo-boost-a.onrender.com/api/groups/${groupId}/like`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log('그룹 공감하기 성공:', result.message);
  //       setLikeCount(prevCount => prevCount + 1); 
  //     } else {
  //       console.error('그룹 공감하기 실패:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('서버 연결 실패:', error);
  //   }
  // };

  const handleLikeClick = () => {
    setLikes(prevLikes => prevLikes + 1); 
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPage(1); 
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1); 
  };

  const handleFilterChange = (filter) => {
    setIsPublic(filter === '공개');
    setPage(1); 
  };

  return (
    <div className="mypage-container">
      <div className="mylogo-content">
        <img src={logo} />
      </div>

      <div className="group-content">
        <div className="group-img">
          <img src={boost} />
        </div>

        <div className="group-info">

          <div className="group-button">
            <button className="button-fix" onClick={handleEditClick}>그룹 정보 수정하기</button>
            <button className="button-delete" onClick={handleDeleteClick}>그룹 삭제하기</button>
          </div>

          <div className="group-header">
            <div className="group-dday">D+100</div>
            <div className="group-status">공개</div>
          </div>
          
          <div className="group-title-header">
            <div className="group-title">부스트 A팀</div>
            <div className="group-stats">추억 0 | 그룹 공감 {likes}</div>
          </div>

          <div className="group-description">
            안녕하세요 저희는 코드잇 부스트 A팀입니다.
          </div>

          <div className="group-badge">획득 배지</div>
            <div className="badges">
              <div className="badge">👾   7일 연속 추억 등록</div>
              <div className="badge">🌼   그룹 공감 1만 개 이상 받기</div>
              <div className="badge">💖   추억 공감 1만 개 이상 받기</div>
            </div>

            <div className="group-actions">
              <button className="button-empathy" onClick={handleLikeClick}>
                <img src={favicon} className="favicon" />
                공감 보내기
              </button>
            </div>
          </div>

        </div>

      <div className="memory-list">
        <div className="memory-header">
          <div className="memory-title">추억 목록</div>
          <Link to="/uploadmemory">
          <div className="last-button">
            <button className="memory-button" 
            >추억 올리기</button>
          </div>
          </Link>
        </div>
        <div className="memory-search">
          
          <div className="privacy-select">
            <button 
              onClick={() => handleFilterChange('공개')} 
              className={`privacy-select-public ${isPublic ? 'active' : ''}`}
            >
              <img src={publicimg} alt="공개" />
            </button>
            <button 
              onClick={() => handleFilterChange('비공개')} 
              className={`privacy-select-private ${!isPublic ? 'active' : ''}`}
            >
              <img src={privateimg} alt="비공개" />
            </button>
          </div>
        
          <div className="input-container">
            <input 
            type="text" 
            className="inputtext" 
            placeholder="태그 혹은 제목을 입력해 주세요" 
            value={keyword}
            onChange={handleSearchChange}
            />
          </div>

          <select className="memory-order" value={sortBy} onChange={handleSortChange}>
            <option value="latest">최신순</option>
            <option value="mostCommented">댓글순</option>
            <option value="mostLiked">공감순</option>
          </select>

        </div>

        <div className="memory-items">
          {posts.length === 0 ? (
            <div className="no-memory">
              <img src={nomemory} />
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="memory-item">
                <img src={post.imageUrl} alt={post.title} />
                <div className="memory-info">
                  <h3>{post.title}</h3>
                  <p>{post.nickname}</p>
                  <p>{post.moment}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <Link to="/uploadmemory">
          <div className="last-button">
            <button className="memory-button" 
            >추억 올리기</button>
          </div>
        </Link>

        <div className="pagination">
          <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>
            이전
          </button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))} disabled={page === totalPages}>
            다음
          </button>
        </div>
        
      </div>

      <EditGroupModal isOpen={isEditModalOpen} onClose={closeEditModal} />
      <DeleteGroupModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
    </div>
  );
}

export default GroupPage;