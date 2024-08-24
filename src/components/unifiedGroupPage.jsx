import React, { useState } from 'react';
import "../styles/unifiedGroupPage.css";
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/nogroup.svg';
import flowerIcon from '../assets/flower-icon.svg'; // 꽃모양 아이콘 이미지 경로

const initialMemoryData = [ /*
    // 초기 메모리 데이터
    {
        id: 1,
        date: "D+265",
        visibility: "공개",
        title: "에델바이스",
        description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
        badges: 2,
        memories: 8,
        likes: "1.5K",
        imageUrl: "your-image-url-1.jpg"
    },
    {
        id: 2,
        date: "D+265",
        visibility: "공개",
        title: "달봉이네 가족",
        description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
        badges: 2,
        memories: 8,
        likes: "1.5K",
        imageUrl: "your-image-url-2.jpg"
    },
    {
        id: 3,
        date: "D+266",
        visibility: "비공개",
        title: "가족 여행",
        description: "즐거운 가족 여행을 떠났습니다.",
        badges: 3,
        memories: 10,
        likes: "2K",
        imageUrl: "your-image-url-3.jpg"
    },
    {
        id: 4,
        date: "D+267",
        visibility: "공개",
        title: "주말 모임",
        description: "주말에 함께한 즐거운 시간.",
        badges: 1,
        memories: 5,
        likes: "800",
        imageUrl: ""
    },
    {
        id: 5,
        date: "D+268",
        visibility: "비공개",
        title: "학교 행사",
        description: "아이들과 함께한 학교 행사.",
        badges: 4,
        memories: 12,
        likes: "2.5K",
        imageUrl: "your-image-url-5.jpg"
    },
    {
        id: 6,
        date: "D+269",
        visibility: "공개",
        title: "친구들과의 모임",
        description: "오랜만에 친구들과의 만남.",
        badges: 2,
        memories: 7,
        likes: "1.2K",
        imageUrl: "your-image-url-6.jpg"
    },
    {
        id: 7,
        date: "D+270",
        visibility: "공개",
        title: "기념일",
        description: "특별한 기념일을 함께했습니다.",
        badges: 5,
        memories: 15,
        likes: "3K",
        imageUrl: "your-image-url-7.jpg"
    },
    {
        id: 8,
        date: "D+271",
        visibility: "비공개",
        title: "일상",
        description: "평범한 일상 속에서의 행복.",
        badges: 1,
        memories: 3,
        likes: "500",
        imageUrl: ""
    },
    {
        id: 9,
        date: "D+272",
        visibility: "공개",
        title: "새로운 시작",
        description: "새로운 출발을 응원합니다.",
        badges: 3,
        memories: 9,
        likes: "1.8K",
        imageUrl: "your-image-url-9.jpg"
    },
    {
        id: 10,
        date: "D+273",
        visibility: "공개",
        title: "가족 식사",
        description: "가족들과의 저녁 식사.",
        badges: 2,
        memories: 6,
        likes: "1K",
        imageUrl: "your-image-url-10.jpg"
    },
    {
        id: 11,
        date: "D+274",
        visibility: "비공개",
        title: "캠핑 여행",
        description: "자연 속에서의 여유로운 캠핑.",
        badges: 4,
        memories: 11,
        likes: "2.2K",
        imageUrl: "your-image-url-11.jpg"
    }
    // ... 더 많은 초기 데이터 */
];

function UnifiedGroupPage() {
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(6);
    const [data] = useState(initialMemoryData);
    const [filter, setFilter] = useState('공개');
    const [sortOption, setSortOption] = useState('공감순');

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };

    // 필터링된 데이터
    const filteredData = data.filter(memory => filter === '' || memory.visibility === filter);

    // 공감수를 숫자로 변환하는 함수
    const convertLikesToNumber = (likes) => {
        if (likes.endsWith('K')) {
            return parseFloat(likes) * 1000; // 'K'가 붙은 경우
        }
        return parseFloat(likes); // 'K'가 없는 경우
    };

    // 정렬된 데이터
    const sortedData = filteredData.sort((a, b) => {
        if (sortOption === '공감순') {
            return convertLikesToNumber(b.likes) - convertLikesToNumber(a.likes);
        } else if (sortOption === '최신순') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortOption === '배지순') {
            return b.badges - a.badges;
        } else if (sortOption === '추억순') {
            return b.memories - a.memories;
        }
        return 0;
    });

    const hasMemories = sortedData.length > 0;
    const gridContainerStyle = {
        marginTop: filter === '공개' ? '20px' : '20px'
    };

    // D-Day 계산 함수
    const calculateDday = (date) => {
        const days = parseInt(date.replace('D+', ''), 10);
        const today = new Date();
        const targetDate = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
        const diffTime = today - targetDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return `D+${diffDays}`;
    };

    return ( <div className="unified">
        <div className="page-container">
            {/* 로고 콘텐츠 */}
            <div className="logo-content">
                <img src={logo} alt="logo" />
                <button className="make-group" onClick={() => navigate('/creategroup')}>그룹 만들기</button>
            </div>

            {/* 검색 및 필터 섹션 */}
            <div className="search-container">
                <div className="menu">
                    <button 
                        onClick={() => setFilter('공개')} 
                        className={filter === '공개' ? 'active' : ''}
                    >
                        공개
                    </button>
                    <button 
                        onClick={() => setFilter('비공개')} 
                        className={filter === '비공개' ? 'active' : ''}
                    >
                        비공개
                    </button>
                </div>
                <input type="text" placeholder="그룹명을 입력하세요." className="search-bar" />
                <select 
                    className="sort-dropdown"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="공감순">공감순</option>
                    <option value="최신순">최신순</option>
                    <option value="배지순">배지순</option>
                    <option value="추억순">추억순</option>
                </select>
            </div>

            {hasMemories ? (
                <>
                    {/* 메모리 카드 그리드 */}
                    <div className="memory-grid-container" style={gridContainerStyle}>
                        <div className="memory-grid">
                            {sortedData.slice(0, visibleCount).map((memory) => (
                                <div className="memory-card" key={memory.id}>
                                    {memory.imageUrl ? (
                                        <img src={memory.imageUrl} alt={memory.title} className="memory-image" />
                                    ) : null}
                                    <div className="memory-info">
                                        <div className="memory-header">
                                            <div className="memory-details">
                                                <span>{calculateDday(memory.date)}</span> | <span>{memory.visibility}</span>
                                            </div>
                                        </div>
                                        <h3>{memory.title}</h3>
                                        <p>{memory.description}</p>
                                        <div className="memory-footer">
                                            <div className="badge-section">
                                                <span>획득 배지</span>
                                                <span>{memory.badges}</span>
                                            </div>
                                            <div className="memory-section">
                                                <span>추억</span>
                                                <span>{memory.memories}</span>
                                            </div>
                                            <div className="likes-section">
                                                <span className="likes-header">그룹 공감</span>
                                                <div className="likes-details">
                                                    <img src={flowerIcon} alt="Flower Icon" className="flower-icon" />
                                                    <span className="likes-count">{memory.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 더보기 버튼 */}
                    {visibleCount < sortedData.length && (
                        <button className="more-memory" onClick={handleLoadMore}>
                            더보기
                        </button>
                    )}
                </>
            ) : (
                <div className="main-content">
                    <div className="message">
                        <img src={icon} alt="Empty Icon" />
                    </div>
                    <button className="make-group" onClick={() => navigate('/creategroup')}>
                        그룹 만들기
                    </button>
                    <button className="secondary-make-group" onClick={() => navigate('/creategroup')}>
                        그룹 만들기
                    </button>
                </div>
            )}
        </div>
        </div> );
}

export default UnifiedGroupPage;
