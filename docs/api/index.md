# API 문서

## 개요

우리끼리 API는 RESTful 방식으로 설계되었으며, JSON 형식으로 데이터를 주고받습니다.

## 기본 URL

```
https://api.uriggiri.com/v1
```

## 인증

API 요청 시 Bearer 토큰을 사용한 인증이 필요합니다:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json'
}
```

## 주요 엔드포인트

### 사용자 관련

- `GET /users/me` - 현재 사용자 정보
- `PUT /users/me` - 사용자 정보 수정
- `POST /users/avatar` - 프로필 사진 업로드

### 프로젝트 관련

- `GET /projects` - 프로젝트 목록
- `POST /projects` - 새 프로젝트 생성
- `GET /projects/:id` - 프로젝트 상세 정보
- `PUT /projects/:id` - 프로젝트 수정
- `DELETE /projects/:id` - 프로젝트 삭제

## 에러 처리

API는 표준 HTTP 상태 코드를 사용합니다:

- `200 OK` - 요청 성공
- `201 Created` - 리소스 생성 성공
- `400 Bad Request` - 잘못된 요청
- `401 Unauthorized` - 인증 실패
- `404 Not Found` - 리소스를 찾을 수 없음
- `500 Internal Server Error` - 서버 오류