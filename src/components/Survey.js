import React, { useState } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';
import './survey.css';

const Survey = () => {
  const [page, setPage] = useState(1);
  const [iconType, setIconType] = useState('');
  const [iconMood, setIconMood] = useState('');
  const [iconColor, setIconColor] = useState('');
  const [iconTypeAnimal, setIconTypeAnimal] = useState('');
  const [iconTypeCharacter, setIconTypeCharacter] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDataComplete()) {
    const surveyData = {
      iconType,
      iconMood,
      iconColor
    };
    await dbService.collection('surveys').doc(authService.currentUser.uid).set(surveyData);
    history.push('/');
  } else {
    alert("모든 항목을 완료해주세요.");
  }
  };
  const isDataComplete = () => {
    return iconType !== '' && iconMood !== '' && iconColor !== '';
  };

  const handleAnimalChange = (e) => {
    setIconTypeAnimal(e.target.value);
    setIconTypeCharacter('');  // 캐릭터 선택 초기화
    setIconType(e.target.value);
  };
  
  const handleCharacterChange = (e) => {
    setIconTypeCharacter(e.target.value);
    setIconTypeAnimal(''); // 동물 선택 초기화
    setIconType(e.target.value);
  };
  
  const handleNext = () => {
    if (page < 3) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderPageContent = () => {
    const survey = (child) => {
      // survey 클래스로 감싸기
      const surveyWrapper = document.createElement('div');
      surveyWrapper.className = 'survey';
      surveyWrapper.appendChild(child);
      return surveyWrapper;
    };
    switch (page) {
      case 1:
        return (
          <div className="survey1">
          <h2>선호하시는 이모티콘의 종류는 무엇인가요?</h2>
          <label>
          동물
          <select value={iconTypeAnimal} onChange={handleAnimalChange}>
            <option value="" disabled>밑의 항목 중에서 선택해주세요</option>
              <option value="강아지">강아지</option>
              <option value="고양이">고양이</option>
              <option value="토끼">토끼</option>
              <option value="곰">곰</option>
              <option value="펭귄">펭귄</option>
            </select>
            </label>
            <br />
            <label>
          캐릭터
          <select value={iconTypeCharacter} onChange={handleCharacterChange}>
            <option value="" disabled>밑의 항목 중에서 선택해주세요</option>
              <option value="학생">학생</option>
              <option value="직장인">직장인</option>
              <option value="아줌마">아줌마</option>
              <option value="아저씨">아저씨</option>
              <option value="공주">공주</option>
              <option value="왕자">왕자</option>
              <option value="상남자">상남자</option>
              <option value="상여자">상여자</option>
            </select>
            </label>
            </div>
        );
      case 2:
        return (
          <div className="survey2">
            <h2>선호하는 이모티콘의 분위기는 어떤 것인가요?</h2>
            <select value={iconMood} onChange={(e) => setIconMood(e.target.value)}>
            <option value="" disabled>밑의 항목 중에서 선택해주세요</option>
              <option value="귀여운">귀여운</option>
              <option value="재밌는">재밌는</option>
              <option value="시크한">시크한</option>
              <option value="동화 같은">동화 같은</option>
              <option value="사진 같은">사진 같은</option>
              <option value="단순한">단순한</option>
              <option value="못생긴">못생긴</option>
            </select>
            </div>
        );
      case 3:
        return (
          <>
            <h2>이모티콘이 가지는 색감은 어떠한 것을 좋아하시나요?</h2>
            <select value={iconColor} onChange={(e) => setIconColor(e.target.value)}>
            <option value="" disabled>밑의 항목 중에서 선택해주세요</option>
              <option value="파스텔">파스텔</option>
              <option value="비비드">비비드</option>
              <option value="흑백">흑백</option>
            </select>
          </>
        );
      default:
        return <p>잘못된 페이지입니다.</p>;
    }
  };

  return (
    <div className="survey3">
      <h1>이모티콘 취향 설문 조사 ({page}/3)</h1>
      <form onSubmit={handleSubmit}>
        {renderPageContent()}
        <div>
          {page > 1 && <button type="button" onClick={handlePrevious}>이전</button>}
          {page < 3 && <button type="button" onClick={handleNext}>다음</button>}
          {page === 3 && <input type="submit" value="결과 제출" />}
        </div>
      </form>
    </div>
  );
};

export default Survey;