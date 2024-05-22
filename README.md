# 팀프로젝트 - bamyanggang
스프링부트 + 리액트를 활용한 Rest API 화상채팅 마피아게임 구현

<br>
<p align="center">
  <img src="https://github.com/bamyanggang-project/bamyanggang-BE/assets/151708233/742e773e-2a98-44e6-9d78-0528f8ebf3f3">
</p>

# 1. 프로젝트 소개
- 화상채팅을 이용한 마피아 게임 구현
- Websoket으로 실시간 채팅 구현.
<br>

## 2. 개발기간 
![Group 19 (1)](https://github.com/bamyanggang-project/bamyanggang-FE/assets/153510536/4dd943b4-cb46-4dd5-b73b-2ddf6e536c98)



### 3. 멤버구성

<div align="center">

| **팀장 김동규** | **팀원 조하영** | **팀원 김현식** | **팀원 김솔지** |  **팀원 남영하** | 
| :------: |  :------: | :------: | :------: | :------: |

</div>
<br>


### 4. 개발 환경

#### 프론트엔드
- HTML, CSS, JavaScript, React(vite)
#### 백엔드
- Spring Boot, JDK 17, MyBatis, MySQL , JPA
#### 버전 및 이슈 관리
- GitHub + SourceTree
#### 디자인
- 피그마
<br>

### 5. 시스템 구성도

![image](https://github.com/bamyanggang-project/bamyanggang-FE/assets/153510536/994e81dd-78ac-4fc9-96c5-8a1fef93371d)





<br>

## 6. 역할분담 

###  🍊팀장 김동규(FE,BE)
- **UI**
  - 마이페이지 초기(회원가입, 회원수정, 로그인, 로그아웃, 회원탈퇴) 
- **기능**
  - 유효성 검사를 활용한 회원가입 (CRUD)
  - JWT 활용한 로그인,로그아웃 구현
  - AWS + nginx 배포 

###  🍊조하영(FE)

- **UI 및 기능**
  - 메인페이지 구현
  - 커뮤니티 페이지 구현 (글작성)
  - 공지사항 페이지 구현 (무한 스크롤 적용)
  - 마이페이지 수정(회원가입,회원수정,로그인, 로그아웃, 회원탈퇴)

###  🍊김현식(BE)

- **기능**
  - webSocket을 이용한 실시간 채팅 구현
  - 게임 방생성 back 로직 구현
  - 게임 목록 back 로직 구현
  - 게임 대기방 back 로직 구현
  - 게임진행 back 로직 구현

###  🍊김솔지(FE)

- **UI 및 기능**
  - 게임방 방생성
  - 게임 목록 / 게임검색 구현 / 게임 참여 유효성 검사
  - 실시간 유저 입퇴장이 반영되는 게임 대기방 구현
  - 게임진행 (webRTC) 구현
    
###  🍊남영하(BE)

- **기능**
  - 커뮤니티 페이지 back 로직 구현
  - 커뮤니티 페이지 구현 (댓글작성)
  - 공지사항 페이지 back 로직 구현
  
