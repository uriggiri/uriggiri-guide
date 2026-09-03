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
| 인증 | `Authorization: Bearer bao_live_…` (또는 `X-Api-Key`) |
| 키 발급 | 반오토 `환경설정 › API 관리` (관리자) — 원문은 발급 직후 **한 번만** 보임 |
| 호출 위치 | **서버에서만**(홈페이지 서버 액션). CORS 를 열지 않아 브라우저에서 직접 부를 수 없음 |
| 제한 | 키 하나당 분당 30회 · 같은 번호·같은 유형 10분 안 재요청은 기존 건 반환(200 duplicate) |
| 기록 | 모든 호출(거절 포함)이 `API 관리 › 최근 요청 기록` 에 남음. 이름·연락처는 기록하지 않음 |

## 최소 본문

```json
{ "type": "trial", "name": "정하늘", "phone": "010-4423-9987", "company": "별빛키즈랜드 판교점", "agreePrivacy": true }
```

`type` 은 `trial`(무료체험신청) · `careers`(매니저지원) · `contact`(도입상담신청) · `other`. 유형별 필드는 앱 문서를 보세요.

## 홈페이지 쪽 설정 (bahnauto 저장소)

서버 액션 3개(`trial/actions.ts` · `careers/actions.ts` · `contact/actions.ts`)가 `lib/crm-intake.ts` 를 통해 이 API 를 부릅니다.
서버 환경변수 둘이 **모두** 있어야 접수가 켜집니다. 하나라도 없으면 「온라인 접수 준비 중」 안내로 떨어지고 받은 척하지 않습니다.

| 환경변수 | 값 |
|---|---|
| `CRM_INTAKE_URL` | `https://app.bahnauto.kr/api/v1/public/leads` |
| `CRM_API_KEY` | API 관리에서 발급한 `bao_live_…` |

Cloudflare Workers 배포에서는 `wrangler secret put CRM_API_KEY` 로 넣습니다. **정적 내보내기(Pages) 빌드는 서버가 없어 접수가 되지 않습니다** — 화면 검토용입니다.

## 운영 체크리스트

1. 반오토 `환경설정 › API 관리` 에서 「홈페이지 bahnauto.kr」 이름으로 키 발급 → 복사.
2. 홈페이지 배포 환경에 `CRM_INTAKE_URL` · `CRM_API_KEY` 등록 → 재배포.
3. 홈페이지 `/trial/` 에서 테스트 신청 → 영업관리 목록에 `T-xxxx` 로 뜨는지, `API 관리 › 최근 요청 기록` 에 `접수됨(201)` 이 남는지 확인.
4. 키가 새면 즉시 **폐기** → 새 키 발급 → 홈페이지 환경변수 교체. 폐기된 키의 호출은 401 로 거절되고 기록에 남습니다.

## 개인정보

- 접수 항목·목적·보유기간은 홈페이지 개인정보처리방침 제1·2·3조에 적혀 있습니다(2026-09-12 시행 개정판).
- 파기는 영업관리 상세 패널의 「삭제」(관리자). 완료 후 보유기간: 상담 1년 · 체험 신청 6개월(계정 개설 시 계정정보로 이관) · 채용 미채용자 90일.
