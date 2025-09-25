# 우리끼리 - 동아피엠 API 문서

## 개요

우리끼리 스마트오피스 API는 RESTful 및 WebSocket 방식으로 설계되었으며, JSON 형식으로 데이터를 주고받습니다.

## API 목록

### 📋 전체 API 요약

| 카테고리 | 메소드 | 엔드포인트 | 설명 |
|---------|--------|------------|------|
| **출입통제** | | | |
| | POST | `/access-control/door/open` | 문 열기 |
| | GET | `/access-control/door/status/:door_id` | 문 상태 확인 |
| | PUT | `/access-control/door/:door_id/always-open` | 상시 열림 설정 |
| | PUT | `/access-control/door/:door_id/always-locked` | 상시 닫힘 설정 |
| **스마트 사물함** | | | |
| | GET | `/lockers/status` | 전체 사물함 예약 상태 확인 |
| | POST | `/lockers/reserve` | 사물함 예약 |
| | DELETE | `/lockers/reservation/:reservation_id` | 예약 취소 |
| **전등 제어** | | | |
| | POST | `/lights/:zone_id/on` | 구역별 전등 켜기 |
| | POST | `/lights/:zone_id/off` | 구역별 전등 끄기 |
| | GET | `/lights/:zone_id/status` | 전등 상태 확인 |
| | GET | `/lights/:zone_id/usage` | 전기 사용량 확인 |
| **전열 제어** | | | |
| | POST | `/heating/:zone_id/on` | 구역별 난방 켜기 |
| | POST | `/heating/:zone_id/off` | 구역별 난방 끄기 |
| | GET | `/heating/:zone_id/status` | 난방 상태 확인 |
| | GET | `/heating/:zone_id/usage` | 전기 사용량 확인 |
| **회의실 예약** | | | |
| | GET | `/meeting-rooms/:room_id/reservations` | 예약 현황 조회 |
| | POST | `/meeting-rooms/:room_id/reserve` | 회의실 예약 |
| | DELETE | `/meeting-rooms/reservation/:reservation_id` | 예약 취소 |
| **전기제품** | | | |
| | POST | `/appliances/:device_id/control` | 제품 제어 (ON/OFF) |
| | GET | `/appliances/:device_id/status` | 제품 상태 확인 |
| **전자명패** | | | |
| | GET | `/nameplates/:nameplate_id/status` | 명패 상태 확인 |
| | PUT | `/nameplates/:nameplate_id/display` | 디스플레이 변경 |
| **OA(사무자동화)** | | | |
| | GET | `/oa/status` | 사무기기 상태 확인 |

### 🔌 WebSocket 이벤트

| 이벤트 타입 | 설명 | 발생 조건 |
|------------|------|----------|
| `door_opened` | 문 열림 알림 | 출입문이 열릴 때 |
| `door_closed` | 문 닫힘 알림 | 출입문이 닫힐 때 |
| `locker_reserved` | 사물함 예약 알림 | 사물함이 예약될 때 |
| `locker_released` | 사물함 반납 알림 | 사물함이 반납될 때 |
| `meeting_room_reserved` | 회의실 예약 알림 | 회의실이 예약될 때 |
| `appliance_status_changed` | 전기제품 상태 변경 | 제품 상태가 변경될 때 |
| `power_usage_alert` | 전력 사용량 경고 | 임계값 초과 시 |

## 기본 URL

```
REST API: https://api.uriggiri.com/v1
WebSocket: wss://api.uriggiri.com/ws
```

## 인증

API 요청 시 Bearer 토큰을 사용한 인증이 필요합니다:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  'Content-Type': 'application/json'
}
```

## API 엔드포인트

### 1. 출입통제 API

#### 문 열기
```http
POST /access-control/door/open
```

**Request Body:**
```json
{
  "door_id": "string",
  "user_id": "string",
  "reason": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "문이 열렸습니다",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### 상태 확인
```http
GET /access-control/door/status/:door_id
```

**Response:**
```json
{
  "door_id": "string",
  "status": "open|closed|locked",
  "last_opened": "2024-01-01T12:00:00Z",
  "last_opened_by": "user_id"
}
```

#### 상시 열림 설정
```http
PUT /access-control/door/:door_id/always-open
```

**Request Body:**
```json
{
  "enabled": true,
  "start_time": "09:00",
  "end_time": "18:00"
}
```

#### 상시 닫힘 설정
```http
PUT /access-control/door/:door_id/always-locked
```

**Request Body:**
```json
{
  "enabled": true,
  "reason": "string"
}
```

### 2. 스마트 사물함 API

#### 예약 상태 확인
```http
GET /lockers/status
```

**Response:**
```json
{
  "lockers": [
    {
      "locker_id": "L01",
      "status": "available|reserved|occupied",
      "reserved_by": "user_id (optional)",
      "reserved_until": "2024-01-01T18:00:00Z (optional)"
    }
  ]
}
```

#### 예약하기
```http
POST /lockers/reserve
```

**Request Body:**
```json
{
  "locker_id": "L01",
  "user_id": "string",
  "duration_hours": 4
}
```

**Response:**
```json
{
  "success": true,
  "reservation_id": "string",
  "locker_id": "L01",
  "reserved_until": "2024-01-01T18:00:00Z",
  "access_code": "1234"
}
```

#### 예약 취소
```http
DELETE /lockers/reservation/:reservation_id
```

**Response:**
```json
{
  "success": true,
  "message": "예약이 취소되었습니다"
}
```

### 3. 전등 제어 API

#### 전등 ON
```http
POST /lights/:zone_id/on
```

**Response:**
```json
{
  "success": true,
  "zone_id": "zone1",
  "status": "on",
  "brightness": 100
}
```

#### 전등 OFF
```http
POST /lights/:zone_id/off
```

#### 상태 확인
```http
GET /lights/:zone_id/status
```

**Response:**
```json
{
  "zone_id": "zone1",
  "status": "on|off",
  "brightness": 0-100,
  "last_changed": "2024-01-01T12:00:00Z"
}
```

#### 전기 사용량 확인
```http
GET /lights/:zone_id/usage
```

**Response:**
```json
{
  "zone_id": "zone1",
  "current_power": 50.5,
  "unit": "watts",
  "daily_usage": 1.2,
  "monthly_usage": 36.5,
  "usage_unit": "kWh"
}
```

### 4. 전열 제어 API

#### 전열 ON
```http
POST /heating/:zone_id/on
```

**Request Body:**
```json
{
  "temperature": 22
}
```

#### 전열 OFF
```http
POST /heating/:zone_id/off
```

#### 상태 확인
```http
GET /heating/:zone_id/status
```

**Response:**
```json
{
  "zone_id": "zone1",
  "status": "on|off",
  "current_temperature": 21.5,
  "target_temperature": 22,
  "unit": "celsius"
}
```

#### 전기 사용량 확인
```http
GET /heating/:zone_id/usage
```

### 5. 회의실 예약 API

#### 예약 확인
```http
GET /meeting-rooms/:room_id/reservations
```

**Query Parameters:**
- `date`: YYYY-MM-DD (optional, default: today)

**Response:**
```json
{
  "room_id": "meeting1",
  "date": "2024-01-01",
  "reservations": [
    {
      "reservation_id": "string",
      "start_time": "09:00",
      "end_time": "10:00",
      "reserved_by": "user_name",
      "title": "주간 회의",
      "participants": 5
    }
  ]
}
```

#### 예약하기
```http
POST /meeting-rooms/:room_id/reserve
```

**Request Body:**
```json
{
  "date": "2024-01-01",
  "start_time": "14:00",
  "end_time": "15:00",
  "title": "프로젝트 회의",
  "participants": 5,
  "send_notification": true,
  "notification_type": "kakao|email"
}
```

**Response:**
```json
{
  "success": true,
  "reservation_id": "string",
  "room_id": "meeting1",
  "notification_sent": true
}
```

#### 예약 취소
```http
DELETE /meeting-rooms/reservation/:reservation_id
```

### 6. 전기 제품 제어 API

#### 제품 ON/OFF
```http
POST /appliances/:device_id/control
```

**Request Body:**
```json
{
  "action": "on|off",
  "settings": {
    "temperature": 24,
    "mode": "cooling|heating|fan|auto",
    "fan_speed": "low|medium|high|auto"
  }
}
```

**Supported Devices:**
- `airconditioner`: 에어컨
- `air_purifier`: 공기청정기
- `ventilator`: 환풍기

#### 상태 확인
```http
GET /appliances/:device_id/status
```

**Response:**
```json
{
  "device_id": "airconditioner_1",
  "device_type": "airconditioner",
  "status": "on|off",
  "settings": {
    "temperature": 24,
    "mode": "cooling",
    "fan_speed": "medium"
  },
  "power_consumption": 1.5,
  "unit": "kW"
}
```

### 7. 전자 명패 API

#### 상태 확인
```http
GET /nameplates/:nameplate_id/status
```

**Response:**
```json
{
  "nameplate_id": "NP01",
  "current_display": {
    "name": "홍길동",
    "title": "과장",
    "department": "개발팀",
    "status": "재실|부재|회의중",
    "message": "오후 3시까지 회의중"
  },
  "battery_level": 85,
  "last_updated": "2024-01-01T12:00:00Z"
}
```

#### 디스플레이 변경
```http
PUT /nameplates/:nameplate_id/display
```

**Request Body:**
```json
{
  "name": "홍길동",
  "title": "과장",
  "department": "개발팀",
  "status": "재실|부재|회의중",
  "message": "string (optional)",
  "background_color": "#ffffff (optional)"
}
```

### 8. OA(사무자동화) API

#### 상태 확인
```http
GET /oa/status
```

**Response:**
```json
{
  "devices": [
    {
      "device_id": "printer_1",
      "device_type": "printer",
      "status": "ready|printing|error|offline",
      "details": {
        "toner_level": 45,
        "paper_level": 80,
        "queue_count": 2
      }
    },
    {
      "device_id": "copier_1",
      "device_type": "copier",
      "status": "ready",
      "details": {
        "total_copies_today": 150
      }
    }
  ]
}
```

## WebSocket 실시간 이벤트

### 연결
```javascript
const ws = new WebSocket('wss://api.uriggiri.com/ws');
ws.send(JSON.stringify({
  type: 'auth',
  token: 'YOUR_ACCESS_TOKEN'
}));
```

### 이벤트 구독
```javascript
ws.send(JSON.stringify({
  type: 'subscribe',
  channels: ['door_status', 'locker_status', 'meeting_room']
}));
```

### 실시간 이벤트 수신
```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Event type:', data.type);
  console.log('Event data:', data.payload);
};
```

#### 이벤트 타입
- `door_opened`: 문 열림 이벤트
- `door_closed`: 문 닫힘 이벤트
- `locker_reserved`: 사물함 예약 이벤트
- `locker_released`: 사물함 반납 이벤트
- `meeting_room_reserved`: 회의실 예약 이벤트
- `appliance_status_changed`: 전기제품 상태 변경
- `power_usage_alert`: 전력 사용량 알림

## 에러 처리

API는 표준 HTTP 상태 코드를 사용합니다:

- `200 OK` - 요청 성공
- `201 Created` - 리소스 생성 성공
- `400 Bad Request` - 잘못된 요청
- `401 Unauthorized` - 인증 실패
- `403 Forbidden` - 권한 없음
- `404 Not Found` - 리소스를 찾을 수 없음
- `409 Conflict` - 리소스 충돌 (예: 이미 예약됨)
- `500 Internal Server Error` - 서버 오류

**에러 응답 형식:**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "요청 파라미터가 올바르지 않습니다",
    "details": {
      "field": "door_id",
      "reason": "필수 항목입니다"
    }
  }
}
```

## Rate Limiting

API 호출은 다음과 같이 제한됩니다:
- 일반 API: 분당 60회
- 제어 API (문열기, 전등 등): 분당 30회
- WebSocket 메시지: 초당 10회

제한 초과 시 `429 Too Many Requests` 응답을 받게 됩니다.

## SDK 및 예제 코드

### JavaScript/Node.js
```javascript
const UriggiriAPI = require('@uriggiri/sdk');

const client = new UriggiriAPI({
  apiKey: 'YOUR_API_KEY'
});

// 문 열기
await client.accessControl.openDoor('main_door');

// 회의실 예약
await client.meetingRooms.reserve('meeting1', {
  date: '2024-01-01',
  startTime: '14:00',
  endTime: '15:00',
  title: '프로젝트 회의'
});
```

### Python
```python
from uriggiri import UriggiriClient

client = UriggiriClient(api_key='YOUR_API_KEY')

# 전등 켜기
client.lights.turn_on('zone1')

# 사물함 예약
reservation = client.lockers.reserve(
    locker_id='L01',
    duration_hours=4
)
print(f"Access code: {reservation['access_code']}")
```