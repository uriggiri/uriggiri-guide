---
title: 접수 API (홈페이지 → 영업관리)
description: bahnauto.kr 폼이 반오토 영업관리로 문의를 넣는 API — 키 발급·필드·응답·운영
---

# 접수 API — 홈페이지 문의를 영업관리로

홈페이지(bahnauto.kr)의 무료체험 · 매장매니저 지원 · 도입 상담 폼이 반오토 [영업관리](./admin/sales) 로 신청을 넣는 API 입니다.
필드 표·오류 코드·예시가 담긴 **정식 문서는 앱 안에 있습니다**: <https://app.bahnauto.kr/developers/leads-api>
(코드의 필드 정의에서 그려지므로 문서와 검증이 갈라지지 않습니다.)

## 한눈에

| 항목 | 값 |
|---|---|
| 주소 | `POST https://app.bahnauto.kr/api/v1/public/leads` |
| 인증 | `Authorization: Bearer bao_pub_…`(브라우저 · 공개키) 또는 `bao_live_…`(서버 · 비밀키) |
| 키 발급 | 반오토 `환경설정 › API 관리` (관리자) — 원문은 발급 직후 **한 번만** 보임 |
| 호출 위치 | 공개키는 허용 출처의 브라우저(CORS 그 출처만) · 비밀키는 서버(CORS 없음) |
| 제한 | 키당 분당 30회 · 공개키는 IP 당 분당 5회 · 같은 번호·같은 유형 10분 안 재요청은 기존 건 반환(200 duplicate) · 허니팟 `website` |
| 기록 | 모든 호출(거절 포함)이 `API 관리 › 최근 요청 기록` 에 남음. 이름·연락처는 기록하지 않음 |

## 최소 본문

```json
{ "type": "trial", "name": "정하늘", "phone": "010-4423-9987", "company": "별빛키즈랜드 판교점", "agreePrivacy": true }
```

`type` 은 `trial`(무료체험신청) · `careers`(매니저지원) · `contact`(도입상담신청) · `other`. 유형별 필드는 앱 문서를 보세요.

## 키 두 종류 — 어디서 부르느냐로 고른다

| 종류 | 접두어 | 어디서 | 보호 장치 |
|---|---|---|---|
| **공개키** (publishable) | `bao_pub_` | GitHub Pages 같은 정적 사이트의 **브라우저**. bahnauto.kr 이 이것을 쓴다 | 허용 출처(Origin) 일치 · IP 당 분당 5회 · 키당 분당 30회 · 허니팟 · 권한은 「문의 한 건 넣기」뿐 |
| 비밀키 (secret) | `bao_live_` | 서버(서버 액션·백엔드·크론) | 키 자체가 비밀. 브라우저·저장소에 두지 않음 |

bahnauto.kr 은 **GitHub Pages(정적)** 라 서버가 없다. 비밀키를 둘 곳이 없으므로 공개키를 쓴다 —
HTML 에 실리는 키라 비밀이 아니고, 대신 반오토 쪽이 `https://bahnauto.kr` 출처에서만 받는다.
누가 키를 베껴 curl 로 불러도 할 수 있는 일은 문의를 넣는 것뿐이고, IP 상한과 허니팟이 막는다.

## 홈페이지 쪽 설정 (bahnauto 저장소 · GitHub Pages)

정적 빌드에서는 `src/lib/form-submit.static.ts` 가 브라우저에서 이 API 를 직접 부른다
(서버 액션 `crm-intake.ts` 는 서버 있는 배포로 옮길 때를 위해 남겨 둔 것).
GitHub **Settings → Secrets and variables → Actions → Variables** 에 둘 다 넣고 재배포한다. 하나라도 없으면 폼이 「온라인 접수 준비 중」 안내로 떨어지고 받은 척하지 않는다.

| Repository variable | 값 |
|---|---|
| `NEXT_PUBLIC_CRM_INTAKE_URL` | `https://app.bahnauto.kr/api/v1/public/leads` |
| `NEXT_PUBLIC_CRM_PUBLIC_KEY` | API 관리에서 발급한 **공개키** `bao_pub_…` |

Secrets 가 아니라 Variables 인 이유: 값이 HTML 에 그대로 실리는 공개키라 숨길 것이 아니고, 로그에 가려질 필요도 없다.

## 운영 체크리스트

1. 반오토 `환경설정 › API 관리` 에서 「브라우저용 공개키」 · 허용 출처 `https://bahnauto.kr` · 이름 「홈페이지 bahnauto.kr」로 발급 → 복사.
2. bahnauto 저장소 Actions Variables 에 `NEXT_PUBLIC_CRM_INTAKE_URL` · `NEXT_PUBLIC_CRM_PUBLIC_KEY` 등록 → Actions 「Run workflow」로 재배포.
3. 홈페이지 `/trial/` 에서 테스트 신청 → 영업관리 목록에 `T-xxxx` 로 뜨는지, `API 관리 › 최근 요청 기록` 에 `접수됨(201)` 이 남는지 확인.
4. 키가 새면 즉시 **폐기** → 새 키 발급 → 홈페이지 환경변수 교체. 폐기된 키의 호출은 401 로 거절되고 기록에 남습니다.

## 개인정보

- 접수 항목·목적·보유기간은 홈페이지 개인정보처리방침 제1·2·3조에 적혀 있습니다(2026-09-12 시행 개정판).
- 파기는 영업관리 상세 패널의 「삭제」(관리자). 완료 후 보유기간: 상담 1년 · 체험 신청 6개월(계정 개설 시 계정정보로 이관) · 채용 미채용자 90일.
