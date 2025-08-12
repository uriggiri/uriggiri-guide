# 보안 시스템

## 시스템 개요

무인 공간의 안전을 위한 통합 보안 시스템으로, 영상 감시, 침입 감지, 비상 대응을 포함한 종합적인 보안 솔루션을 제공합니다.

## 영상 보안 시스템

### CCTV 구성

#### 카메라 사양
| 구분 | 사양 | 용도 |
|------|------|------|
| **실내 돔 카메라** | 4K, 360도 회전 | 넓은 실내 공간 |
| **실내 고정형** | FHD, 적외선 | 출입구, 복도 |
| **실외 방수형** | 4K, IP67, 야간 | 주차장, 외부 |
| **PTZ 카메라** | 4K, 30배 줌 | 중요 구역 |

#### 최대 16채널 구성
```
┌─────────────────────────────────────────────┐
│           CCTV 채널 배치도                  │
├─────────────────────────────────────────────┤
│  CH1: 정문      CH2: 후문      CH3: 로비    │
│  CH4: 복도1     CH5: 복도2     CH6: 사무실1 │
│  CH7: 사무실2   CH8: 회의실    CH9: 창고    │
│  CH10: 주차장1  CH11: 주차장2  CH12: 엘리베이터│
│  CH13: 계단1    CH14: 계단2    CH15: 서버실  │
│  CH16: 비상구                               │
└─────────────────────────────────────────────┘
```

### 통합 관제 시스템

#### 멀티뷰 디스플레이
```javascript
// 화면 분할 모드 설정
const displayModes = {
  single: 1,      // 1화면 (전체화면)
  quad: 4,        // 4분할
  nine: 9,        // 9분할
  sixteen: 16     // 16분할
};

// 우선순위별 자동 전환
const priorityDisplay = {
  motion: ["CH1", "CH2", "CH8"],  // 움직임 감지 시
  alert: ["CH15", "CH16"],        // 경보 발생 시
  schedule: {                      // 시간대별
    day: ["CH1", "CH3", "CH6", "CH8"],
    night: ["CH1", "CH2", "CH10", "CH11"]
  }
};
```

#### 전체 매장 통합 뷰
- **실시간 모니터링**: 모든 카메라 동시 감시
- **이벤트 알림**: 움직임, 소리 감지 시 자동 포커스
- **히트맵 분석**: 동선 분석 및 체류 시간 측정

### 권한별 접근 관리

#### 사용자 권한 등급
| 등급 | 실시간 보기 | 녹화 재생 | 설정 변경 | 영상 다운로드 |
|------|------------|-----------|-----------|--------------|
| **최고 관리자** | ✅ 전체 | ✅ 무제한 | ✅ 가능 | ✅ 가능 |
| **관리자** | ✅ 전체 | ✅ 30일 | ⚠️ 일부 | ✅ 가능 |
| **운영자** | ✅ 지정 구역 | ✅ 7일 | ❌ 불가 | ⚠️ 승인 필요 |
| **직원** | ⚠️ 공용 구역 | ❌ 불가 | ❌ 불가 | ❌ 불가 |

#### 접근 제어 설정
```yaml
access_control:
  admin:
    - view: all_cameras
    - playback: unlimited
    - export: allowed
    - delete: allowed
    
  manager:
    - view: all_cameras
    - playback: 30_days
    - export: with_watermark
    - delete: not_allowed
    
  operator:
    - view: [CH1, CH3, CH6, CH8]
    - playback: 7_days
    - export: with_approval
    - delete: not_allowed
```

## 녹화 시스템

### NVR(Network Video Recorder) 사양

#### 저장 용량 계산
```javascript
// 저장 용량 계산기
function calculateStorage(cameras, quality, days) {
  const bitrates = {
    "4K": 8,    // Mbps
    "FHD": 4,   // Mbps
    "HD": 2     // Mbps
  };
  
  const dailyGB = (cameras * bitrates[quality] * 86400) / 8000;
  const totalTB = (dailyGB * days) / 1000;
  
  return {
    daily: `${dailyGB.toFixed(2)} GB`,
    total: `${totalTB.toFixed(2)} TB`
  };
}

// 예시: 16대 카메라, FHD, 30일 저장
// 결과: 일일 691.2GB, 총 20.74TB 필요
```

### 녹화 모드

| 모드 | 설명 | 저장 공간 |
|------|------|----------|
| **연속 녹화** | 24시간 연속 | 100% |
| **모션 녹화** | 움직임 감지 시 | 30-40% |
| **스케줄 녹화** | 지정 시간대 | 50-70% |
| **이벤트 녹화** | 알람 발생 시 | 10-20% |

## 지능형 영상 분석

### AI 기반 분석 기능

#### 1. 객체 인식
```python
# AI 객체 인식 설정
detection_settings = {
    "person": {
        "enabled": True,
        "confidence": 0.8,
        "alert": True
    },
    "vehicle": {
        "enabled": True,
        "types": ["car", "truck", "motorcycle"],
        "alert": True
    },
    "face": {
        "enabled": True,
        "recognition": True,
        "database": "employees.db"
    }
}
```

#### 2. 행동 분석
- **침입 감지**: 제한 구역 진입 감지
- **배회 감지**: 일정 시간 이상 머무름
- **유기 감지**: 물건 방치 감지
- **도난 감지**: 물건 이동/제거 감지

#### 3. 카운팅 기능
```javascript
// 출입 인원 카운팅
const peopleCounting = {
  entrance: {
    in: 0,
    out: 0,
    current: 0
  },
  zones: {
    lobby: 0,
    office: 0,
    meeting: 0
  },
  maxOccupancy: 50,
  alert: function() {
    if (this.entrance.current > this.maxOccupancy) {
      sendAlert("최대 수용 인원 초과");
    }
  }
};
```

## 비상 대응 시스템

### 알람 연동

#### 센서 통합
| 센서 종류 | 기능 | 대응 |
|---------|------|------|
| **침입 감지** | 문/창문 센서 | 경보 + 녹화 |
| **화재 감지** | 연기/열 센서 | 대피 방송 + 119 |
| **가스 누출** | 가스 센서 | 환기 + 차단 |
| **수위 감지** | 누수 센서 | 차단 + 알림 |

#### 비상 시나리오
```yaml
emergency_scenarios:
  intrusion:
    - action: activate_siren
    - action: lock_all_doors
    - action: record_all_cameras
    - action: notify_security
    - action: call_police
    
  fire:
    - action: unlock_all_doors
    - action: broadcast_evacuation
    - action: stop_hvac
    - action: notify_fire_department
    
  medical:
    - action: unlock_main_door
    - action: guide_emergency_team
    - action: record_incident
```

### 실시간 알림

#### 알림 채널
```javascript
// 다중 채널 알림 시스템
const notificationChannels = {
  push: {
    app: "UriggiriSecurity",
    priority: "high",
    sound: true
  },
  sms: {
    recipients: ["+82-10-1234-5678"],
    template: "긴급: {location}에서 {event} 발생"
  },
  email: {
    to: ["security@company.com"],
    subject: "보안 알림",
    attachments: ["snapshot.jpg", "video_clip.mp4"]
  },
  call: {
    numbers: ["119", "112"],
    autoMessage: true
  }
};
```

## 프라이버시 보호

### 마스킹 기능

#### 프라이버시 존 설정
- **자동 마스킹**: 화장실, 탈의실 입구
- **동적 마스킹**: 개인정보 화면 자동 블러
- **시간대별 마스킹**: 업무 외 시간 특정 구역

### GDPR/개인정보보호법 준수

#### 데이터 관리
```yaml
privacy_compliance:
  retention:
    general: 30_days
    incident: 90_days
    authorized_only: true
    
  access_log:
    track_all_access: true
    require_reason: true
    audit_trail: enabled
    
  data_protection:
    encryption: AES-256
    secure_transmission: TLS_1.3
    watermark: enabled
```

## 백업 및 복구

### 영상 백업

#### 자동 백업 설정
| 구분 | 주기 | 보관 기간 | 저장 위치 |
|------|------|-----------|----------|
| **중요 영상** | 실시간 | 1년 | 클라우드 + 로컬 |
| **이벤트 영상** | 일일 | 90일 | 클라우드 |
| **일반 영상** | 주간 | 30일 | 로컬 NAS |

### 시스템 이중화

```
┌────────────────────────────────────┐
│         이중화 구성도               │
├────────────────────────────────────┤
│  [주 NVR] ←→ [백업 NVR]            │
│      ↓           ↓                 │
│  [로컬 저장]  [클라우드]           │
│      ↓           ↓                 │
│  [실시간 모니터링 센터]            │
└────────────────────────────────────┘
```

## 유지보수

### 정기 점검 항목

#### 월간 점검
- [ ] 카메라 렌즈 청소
- [ ] 녹화 상태 확인
- [ ] 저장 공간 확인
- [ ] 네트워크 상태 점검

#### 분기 점검
- [ ] 카메라 각도 조정
- [ ] 백업 시스템 테스트
- [ ] 비상 시나리오 훈련
- [ ] 펌웨어 업데이트

::: warning 보안 주의사항
- 기본 비밀번호는 반드시 변경하세요
- 정기적으로 접근 로그를 검토하세요
- 영상 데이터는 암호화하여 저장하세요
- 네트워크는 격리된 VLAN을 사용하세요
:::