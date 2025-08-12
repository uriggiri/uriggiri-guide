# 방송/알림 시스템

## 시스템 개요

무인 공간 내 효과적인 정보 전달과 비상 상황 대응을 위한 통합 방송 및 알림 시스템입니다.

## 방송 시스템

### 구성 요소

#### 음향 장비
| 장비 | 사양 | 설치 위치 |
|------|------|----------|
| **천장 스피커** | 30W, 양방향 | 사무실, 복도 |
| **혼 스피커** | 50W, 고출력 | 주차장, 창고 |
| **앰프** | 240W, 6채널 | 방송실 |
| **마이크** | 무선/유선 | 관리실 |

### 방송 구역 설정

```yaml
broadcast_zones:
  all: "전체 방송"
  
  floor_1:
    - zone_1: "로비"
    - zone_2: "사무실 A"
    - zone_3: "회의실"
    
  floor_2:
    - zone_4: "사무실 B"
    - zone_5: "휴게실"
    - zone_6: "창고"
    
  outdoor:
    - zone_7: "주차장"
    - zone_8: "정문"
```

### 방송 모드

#### 1. 일반 방송
```javascript
// 일반 안내 방송
const announcement = {
  type: "general",
  zones: ["all"],
  message: "안녕하세요. 금일 6시에 시스템 점검이 있을 예정입니다.",
  volume: 60,
  repeat: 2,
  interval: 30 // 초
};
```

#### 2. 비상 방송
```javascript
// 비상 상황 방송
const emergency = {
  type: "emergency",
  priority: "highest",
  zones: ["all"],
  preSignal: "siren",
  message: "비상 상황입니다. 침착하게 대피해 주시기 바랍니다.",
  volume: 100,
  repeat: "continuous",
  override: true // 다른 모든 방송 중단
};
```

#### 3. 스케줄 방송
```yaml
scheduled_broadcasts:
  daily:
    09:00: "업무 시작 안내"
    12:00: "점심 시간 안내"
    18:00: "업무 종료 안내"
    
  weekly:
    monday_09:00: "주간 공지사항"
    friday_17:00: "주말 운영 안내"
    
  special:
    event_day: "이벤트 안내"
    maintenance: "시설 점검 안내"
```

## 알림 시스템

### 알림 유형

#### 1. 푸시 알림
```javascript
// 모바일 앱 푸시 알림
const pushNotification = {
  title: "출입 알림",
  body: "정문에 방문객이 도착했습니다.",
  icon: "door_icon.png",
  sound: "default",
  badge: 1,
  data: {
    type: "visitor",
    location: "main_gate",
    timestamp: Date.now()
  }
};
```

#### 2. SMS 알림
```javascript
// SMS 발송 설정
const smsAlert = {
  recipients: [
    { name: "관리자", phone: "010-1234-5678" },
    { name: "보안팀", phone: "010-8765-4321" }
  ],
  template: {
    visitor: "[우리끼리] {time} 방문객 도착: {location}",
    security: "[긴급] 보안 이벤트 발생: {event_type}",
    system: "[시스템] {component} 점검 필요"
  }
};
```

#### 3. 이메일 알림
```yaml
email_notifications:
  daily_report:
    to: ["admin@company.com"]
    subject: "일일 운영 리포트"
    attachments:
      - access_log.pdf
      - energy_usage.xlsx
      
  weekly_summary:
    to: ["management@company.com"]
    subject: "주간 운영 현황"
    include:
      - visitor_statistics
      - incident_reports
      - maintenance_schedule
```

### 알림 우선순위

| 우선순위 | 유형 | 알림 방식 | 응답 시간 |
|---------|------|----------|----------|
| **긴급** | 화재, 침입 | 방송+SMS+전화 | 즉시 |
| **높음** | 시스템 오류 | 푸시+SMS | 5분 내 |
| **보통** | 정기 점검 | 푸시+이메일 | 30분 내 |
| **낮음** | 일반 안내 | 이메일 | 1시간 내 |

## 통합 시나리오

### 출입 관련 알림

```javascript
// 방문객 도착 시나리오
async function visitorArrival(visitor) {
  // 1. 인터폰으로 확인
  await intercom.call(visitor);
  
  // 2. 관리자에게 알림
  await sendPushNotification({
    title: "방문객 도착",
    body: `${visitor.name}님이 도착했습니다`,
    image: visitor.photo
  });
  
  // 3. 음성 안내
  await broadcast.announce({
    zone: "lobby",
    message: "방문객이 도착했습니다"
  });
  
  // 4. 출입 승인 후 안내
  if (visitor.approved) {
    await doorLock.unlock("main_gate");
    await broadcast.announce({
      zone: "lobby",
      message: `${visitor.destination}으로 이동해 주세요`
    });
  }
}
```

### 비상 상황 대응

```yaml
emergency_response:
  fire_detected:
    - action: broadcast_evacuation
      zones: all
      message: "화재가 감지되었습니다. 즉시 대피하세요"
      
    - action: unlock_all_doors
      priority: immediate
      
    - action: notify_fire_department
      method: auto_call
      
    - action: send_alerts
      channels: [sms, push, email]
      recipients: all_emergency_contacts
      
    - action: activate_sprinklers
      zones: affected_area
```

## 디지털 사이니지 연동

### 화면 표시 콘텐츠

```javascript
// 디지털 사이니지 콘텐츠 관리
const signageContent = {
  normal: {
    layout: "split_screen",
    contents: [
      { type: "welcome", duration: 10 },
      { type: "announcements", duration: 15 },
      { type: "weather", duration: 5 },
      { type: "news", duration: 20 }
    ]
  },
  
  emergency: {
    layout: "full_screen",
    content: {
      type: "emergency_guide",
      message: "비상구 위치",
      map: "evacuation_route.png",
      blink: true
    }
  }
};
```

### 콘텐츠 스케줄링

```yaml
content_schedule:
  weekday:
    07:00-09:00:
      - welcome_message
      - today_schedule
      - weather_info
      
    09:00-18:00:
      - company_news
      - announcements
      - promotional_content
      
    18:00-22:00:
      - tomorrow_schedule
      - facility_info
      
  weekend:
    09:00-18:00:
      - weekend_notice
      - emergency_contacts
```

## 음성 인식 시스템

### 음성 명령

```javascript
// 음성 명령 처리
const voiceCommands = {
  "긴급 상황": () => emergencyProtocol.activate(),
  "조명 켜기": () => lights.turnOn("all"),
  "방송 시작": () => broadcast.startRecording(),
  "도움 요청": () => callSupport.initiate(),
  "상태 확인": () => systemStatus.report()
};

// 음성 인식 설정
const speechRecognition = {
  language: "ko-KR",
  continuous: true,
  interimResults: false,
  maxAlternatives: 3,
  confidenceThreshold: 0.7
};
```

## 다국어 지원

### 언어별 안내

```yaml
multilingual_support:
  languages:
    - ko: "한국어"
    - en: "English"
    - zh: "中文"
    - ja: "日本語"
    
  announcements:
    ko: "안녕하세요. 우리끼리 무인 공간입니다."
    en: "Welcome to Uriggiri unmanned space."
    zh: "欢迎来到 Uriggiri 无人空间。"
    ja: "ウリッキリ無人空間へようこそ。"
    
  emergency:
    ko: "비상구는 오른쪽에 있습니다."
    en: "Emergency exit is on the right."
    zh: "紧急出口在右边。"
    ja: "非常口は右側にあります。"
```

## 로그 및 기록

### 방송 이력 관리

```sql
-- 방송 이력 조회
SELECT 
  timestamp,
  broadcast_type,
  zones,
  message,
  duration,
  operator
FROM broadcast_log
WHERE date BETWEEN '2024-01-01' AND '2024-01-31'
ORDER BY timestamp DESC;
```

### 알림 전송 통계

```javascript
// 알림 통계 대시보드
const notificationStats = {
  daily: {
    total: 156,
    delivered: 152,
    failed: 4,
    channels: {
      push: 89,
      sms: 45,
      email: 22
    }
  },
  
  monthly: {
    total: 4680,
    byType: {
      security: 234,
      visitor: 1560,
      system: 886,
      general: 2000
    }
  }
};
```

## 시스템 연동

### API 연동

```javascript
// 외부 시스템 연동 API
const integrationAPI = {
  // 날씨 정보
  weather: {
    endpoint: "https://api.weather.com/",
    update: "hourly"
  },
  
  // 뉴스 피드
  news: {
    endpoint: "https://api.news.com/",
    categories: ["business", "technology"],
    update: "30min"
  },
  
  // 교통 정보
  traffic: {
    endpoint: "https://api.traffic.com/",
    location: "gangnam",
    update: "10min"
  }
};
```

::: tip 효과적인 방송 팁
- 명확하고 간결한 메시지 작성
- 적절한 음량과 속도 설정
- 정기적인 시스템 테스트
- 다국어 안내 준비
:::