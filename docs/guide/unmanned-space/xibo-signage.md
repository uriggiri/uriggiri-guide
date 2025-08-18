# Xibo 디지털 사이니지 시스템

## 시스템 소개

Xibo는 오픈소스 디지털 사이니지 플랫폼으로, 무인 공간에서 효과적인 정보 전달과 광고 표시를 위한 강력한 솔루션입니다. 완전 무료로 사용 가능하며, 엔터프라이즈급 기능을 제공합니다.

### 주요 특징

| 특징 | 설명 |
|------|------|
| **오픈소스** | 완전 무료, 소스코드 공개 |
| **웹 기반 관리** | 어디서나 브라우저로 관리 |
| **다중 디스플레이** | 무제한 디스플레이 지원 |
| **스케줄링** | 시간대별 콘텐츠 예약 |
| **실시간 업데이트** | 즉시 콘텐츠 변경 가능 |
| **통계 및 리포트** | 재생 기록 및 성능 분석 |

## 시스템 구성요소

### 1. Xibo CMS (Content Management System)
```yaml
xibo_cms:
  description: "중앙 관리 서버"
  functions:
    - 콘텐츠 업로드 및 관리
    - 레이아웃 디자인
    - 스케줄 설정
    - 디스플레이 관리
    - 사용자 권한 관리
    
  requirements:
    - PHP 7.4 이상
    - MySQL 5.6 이상
    - Apache/Nginx 웹서버
    - 최소 2GB RAM
```

### 2. Xibo Player (디스플레이 클라이언트)
```yaml
xibo_player:
  platforms:
    windows: "Windows 8.1 이상"
    android: "Android 4.4 이상"
    linux: "Ubuntu 18.04 이상"
    webos: "LG webOS 3.0 이상"
    tizen: "Samsung Tizen 3.0 이상"
    
  hardware_requirements:
    min_ram: "2GB"
    min_storage: "8GB"
    network: "안정적인 인터넷 연결"
```

## 설치 가이드

### Docker를 이용한 CMS 설치 (권장)

#### 1. Docker 및 Docker Compose 설치
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# CentOS/RHEL
sudo yum install docker docker-compose

# Docker 서비스 시작
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. Xibo CMS 다운로드 및 설치
```bash
# Xibo CMS 다운로드
wget https://github.com/xibosignage/xibo-cms/releases/download/3.3.0/xibo-docker.tar.gz

# 압축 해제
tar -xvf xibo-docker.tar.gz
cd xibo-docker

# 설정 파일 복사
cp config.env.template config.env

# CMS 시작
sudo docker-compose up -d
```

#### 3. 초기 설정
```yaml
# config.env 파일 수정
MYSQL_PASSWORD: "secure_password_here"
CMS_KEY: "generate_random_key_here"
MYSQL_ROOT_PASSWORD: "root_password_here"

# 시간대 설정
CMS_TIMEZONE: "Asia/Seoul"

# 파일 업로드 크기
CMS_PHP_POST_MAX_SIZE: "2000M"
CMS_PHP_UPLOAD_MAX_FILESIZE: "2000M"
```

### 웹 설치 마법사

1. 브라우저에서 `http://서버IP` 접속
2. 설치 마법사 시작
3. 데이터베이스 정보 입력
4. 관리자 계정 생성
5. 라이브러리 경로 설정
6. 설치 완료

## CMS 기본 사용법

### 대시보드 인터페이스

```javascript
// 대시보드 주요 메뉴
const dashboard = {
  status: {
    displays: "연결된 디스플레이 상태",
    content: "콘텐츠 사용량",
    bandwidth: "네트워크 사용량",
    alerts: "시스템 알림"
  },
  
  quickActions: [
    "새 레이아웃 만들기",
    "미디어 업로드",
    "스케줄 설정",
    "디스플레이 추가"
  ]
};
```

### 미디어 라이브러리 관리

#### 미디어 업로드
```javascript
// 지원 미디어 형식
const supportedMedia = {
  images: ["jpg", "jpeg", "png", "gif", "bmp", "svg"],
  videos: ["mp4", "avi", "webm", "mkv", "mov"],
  audio: ["mp3", "wav", "ogg"],
  documents: ["pdf", "ppt", "pptx"],
  web: ["html", "url"]
};

// 미디어 업로드 설정
const uploadSettings = {
  maxFileSize: "2GB",
  batchUpload: true,
  autoTag: true,
  thumbnail: "auto-generate"
};
```

#### 미디어 구성 및 태그
```yaml
media_organization:
  folders:
    - /광고
    - /공지사항
    - /이벤트
    - /날씨정보
    - /뉴스피드
    
  tags:
    - seasonal: "계절별 콘텐츠"
    - promotional: "프로모션"
    - emergency: "긴급 공지"
    - informational: "정보성 콘텐츠"
```

## 레이아웃 디자인

### 레이아웃 구조

```javascript
// 레이아웃 템플릿
const layoutTemplate = {
  name: "무인매장 기본 레이아웃",
  resolution: {
    width: 1920,
    height: 1080
  },
  
  regions: [
    {
      name: "메인 콘텐츠",
      position: { x: 0, y: 0 },
      size: { width: 1920, height: 900 },
      widgets: ["이미지 슬라이드", "비디오"]
    },
    {
      name: "하단 정보바",
      position: { x: 0, y: 900 },
      size: { width: 1920, height: 180 },
      widgets: ["시계", "날씨", "텍스트 스크롤"]
    }
  ]
};
```

### 위젯 활용

#### 1. 텍스트 위젯
```html
<!-- HTML 텍스트 위젯 예제 -->
<div style="font-family: 'Noto Sans KR'; padding: 20px;">
  <h1 style="color: #2196F3;">오늘의 공지사항</h1>
  <marquee behavior="scroll" direction="left">
    무인 공간 이용 시간: 24시간 연중무휴 | 
    고객센터: 1588-0000 | 
    긴급 시 비상벨을 눌러주세요
  </marquee>
</div>
```

#### 2. 시계 위젯
```javascript
// 디지털 시계 설정
const clockWidget = {
  format: "HH:mm:ss",
  timezone: "Asia/Seoul",
  font: {
    family: "Digital",
    size: "72px",
    color: "#FFFFFF"
  },
  showDate: true,
  dateFormat: "YYYY년 MM월 DD일 dddd"
};
```

#### 3. 날씨 위젯
```yaml
weather_widget:
  provider: "OpenWeatherMap"
  api_key: "your_api_key_here"
  location: "Seoul,KR"
  
  display:
    - current_temp: true
    - weather_icon: true
    - humidity: true
    - forecast_3days: true
    
  update_interval: "30min"
```

#### 4. RSS/뉴스 피드
```javascript
// RSS 피드 설정
const rssFeed = {
  url: "https://news.example.com/rss",
  items: 5,
  updateInterval: 600, // 10분
  
  template: `
    <div class="news-item">
      <h3>[Title]</h3>
      <p>[Description]</p>
      <span class="date">[Date]</span>
    </div>
  `,
  
  animation: {
    type: "fade",
    duration: 5000
  }
};
```

## 플레이어 설정 및 관리

### Android 플레이어 설정

#### 1. APK 설치
```bash
# ADB를 통한 설치
adb install xibo-player.apk

# 또는 Google Play Store에서 설치
# "Xibo for Android" 검색
```

#### 2. 플레이어 구성
```javascript
// 플레이어 설정
const playerConfig = {
  cmsAddress: "http://192.168.1.100",
  cmsKey: "your_cms_key",
  displayName: "1층 로비 디스플레이",
  
  settings: {
    orientation: "landscape",
    preventSleep: true,
    startOnBoot: true,
    collectInterval: 300, // 5분
    screenshotInterval: 0, // 비활성화
  },
  
  hardware: {
    displayId: 1,
    blacklistVideo: false,
    useSurfaceVideoView: true,
    videoDecoderHardwareAccelerated: true
  }
};
```

### Windows 플레이어 설정

#### 1. 설치 및 구성
```powershell
# Windows Player 설치
# 다운로드: https://xibosignage.com/downloads

# 설정 파일 위치
C:\Users\[Username]\Documents\Xibo Library\

# 자동 시작 설정
shell:startup # 시작 프로그램 폴더에 바로가기 추가
```

#### 2. 플레이어 옵션
```xml
<!-- XiboClient.config.xml -->
<configuration>
  <cmsAddress>http://192.168.1.100</cmsAddress>
  <key>display_secret_key</key>
  <localLibrary>C:\XiboLibrary</localLibrary>
  <splashOverride>false</splashOverride>
  <preventSleep>true</preventSleep>
  <logLevel>error</logLevel>
</configuration>
```

## 스케줄링 및 캠페인

### 스케줄 생성

```javascript
// 시간대별 스케줄 설정
const schedule = {
  name: "평일 운영 스케줄",
  
  campaigns: [
    {
      name: "아침 인사",
      time: "07:00-09:00",
      days: ["mon", "tue", "wed", "thu", "fri"],
      layouts: ["morning_welcome.xml"],
      priority: 1
    },
    {
      name: "점심 프로모션",
      time: "11:30-13:30",
      days: ["mon", "tue", "wed", "thu", "fri"],
      layouts: ["lunch_promotion.xml"],
      priority: 2
    },
    {
      name: "저녁 안내",
      time: "17:00-19:00",
      days: ["mon", "tue", "wed", "thu", "fri"],
      layouts: ["evening_info.xml"],
      priority: 1
    }
  ],
  
  defaultLayout: "default_content.xml"
};
```

### 캠페인 관리

```yaml
campaign_structure:
  seasonal_campaigns:
    spring:
      start: "2024-03-01"
      end: "2024-05-31"
      layouts:
        - spring_promotion.xml
        - flower_festival.xml
        
    summer:
      start: "2024-06-01"
      end: "2024-08-31"
      layouts:
        - summer_sale.xml
        - vacation_info.xml
        
  event_campaigns:
    black_friday:
      date: "2024-11-29"
      priority: 10
      override_all: true
      
    christmas:
      start: "2024-12-20"
      end: "2024-12-25"
      priority: 5
```

### 우선순위 및 충돌 해결

```javascript
// 스케줄 우선순위 규칙
const priorityRules = {
  levels: {
    emergency: 100,  // 최우선
    event: 50,       // 이벤트
    promotional: 30, // 프로모션
    regular: 10,     // 일반
    default: 0       // 기본
  },
  
  conflictResolution: {
    method: "priority", // priority, round-robin, percentage
    tieBreaker: "newest" // newest, oldest, random
  }
};
```

## 무인 공간 통합 활용

### 시나리오 1: 무인 카페

```javascript
// 무인 카페 디지털 메뉴보드
const cafeSignage = {
  displays: [
    {
      location: "입구",
      content: "환영 메시지, 프로모션",
      schedule: "항시"
    },
    {
      location: "주문 키오스크 상단",
      content: "메뉴, 가격, 추천 음료",
      schedule: "운영시간"
    },
    {
      location: "픽업 대기 구역",
      content: "주문 번호, 대기 시간",
      integration: "POS 시스템 연동"
    }
  ],
  
  dynamicContent: {
    weatherBased: {
      hot: ["아이스 음료 프로모션"],
      cold: ["따뜻한 음료 추천"],
      rainy: ["테이크아웃 할인"]
    },
    
    timeBased: {
      morning: ["모닝 세트 메뉴"],
      afternoon: ["디저트 콤보"],
      evening: ["테이크아웃 특가"]
    }
  }
};
```

### 시나리오 2: 무인 편의점

```yaml
convenience_store_signage:
  entrance_display:
    content:
      - welcome_message
      - store_hours
      - today_promotion
      - payment_methods
      
  product_displays:
    fresh_food:
      update: "every_4_hours"
      content:
        - expiry_alerts
        - discount_items
        
    seasonal:
      update: "weekly"
      content:
        - new_arrivals
        - seasonal_products
        
  checkout_display:
    content:
      - payment_guide
      - membership_benefits
      - customer_service
```

### 시나리오 3: 공유 오피스

```javascript
// 공유 오피스 정보 시스템
const sharedOfficeSignage = {
  lobby: {
    widgets: [
      "회사 로고 롤링",
      "회의실 예약 현황",
      "오늘의 이벤트",
      "교통 정보"
    ]
  },
  
  meetingRooms: {
    doorDisplay: {
      size: "10.1 inch",
      content: [
        "현재 예약 상태",
        "다음 예약 정보",
        "QR 체크인"
      ]
    }
  },
  
  commonArea: {
    content: [
      "공지사항",
      "날씨 정보",
      "뉴스 피드",
      "시설 이용 안내"
    ]
  }
};
```

## API 연동

### REST API 활용

```javascript
// Xibo API 인증
const xiboAPI = {
  baseURL: "http://your-cms-url/api",
  
  auth: async function() {
    const response = await fetch(`${this.baseURL}/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&client_id=YOUR_ID&client_secret=YOUR_SECRET'
    });
    
    return response.json();
  },
  
  // 디스플레이 상태 조회
  getDisplayStatus: async function(displayId, token) {
    const response = await fetch(`${this.baseURL}/display/${displayId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.json();
  },
  
  // 레이아웃 변경
  changeLayout: async function(displayId, layoutId, token) {
    const response = await fetch(`${this.baseURL}/displaygroup/${displayId}/action/changeLayout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `layoutId=${layoutId}&duration=0`
    });
    
    return response.json();
  }
};
```

### 외부 시스템 연동

```javascript
// POS 시스템 연동
const posIntegration = {
  // 실시간 매출 데이터 표시
  salesData: async function() {
    const sales = await fetchPOSData();
    
    return {
      widget: "dataSet",
      data: {
        todaySales: sales.today,
        bestSeller: sales.topProduct,
        customerCount: sales.customers
      },
      updateInterval: 300 // 5분
    };
  },
  
  // 재고 알림
  inventoryAlert: async function() {
    const inventory = await fetchInventory();
    const lowStock = inventory.filter(item => item.quantity < 10);
    
    return {
      widget: "ticker",
      text: lowStock.map(item => `${item.name} 재고 부족`).join(' | '),
      speed: "medium",
      backgroundColor: "#FF5722"
    };
  }
};

// IoT 센서 연동
const iotIntegration = {
  // 실내 환경 정보
  environmentData: {
    temperature: "23°C",
    humidity: "45%",
    airQuality: "좋음",
    co2Level: "450ppm"
  },
  
  // 혼잡도 표시
  crowdLevel: {
    current: 15,
    capacity: 50,
    status: "여유",
    color: "#4CAF50"
  }
};
```

## 모니터링 및 관리

### 시스템 모니터링

```yaml
monitoring:
  display_health:
    check_interval: "5min"
    alerts:
      - offline: "디스플레이 연결 끊김"
      - storage_full: "저장 공간 부족"
      - content_error: "콘텐츠 재생 오류"
      
  performance_metrics:
    - cpu_usage
    - memory_usage
    - network_bandwidth
    - content_download_speed
    
  reporting:
    daily_report:
      - total_playtime
      - content_statistics
      - error_logs
      
    monthly_report:
      - display_uptime
      - content_performance
      - maintenance_schedule
```

### 원격 관리

```javascript
// 원격 명령 실행
const remoteCommands = {
  // 스크린샷 캡처
  screenshot: {
    command: "screenShot",
    params: {
      displayId: 1
    }
  },
  
  // 재부팅
  reboot: {
    command: "reboot",
    params: {
      displayId: 1,
      delay: 60 // 60초 후 재부팅
    }
  },
  
  // 캐시 삭제
  clearCache: {
    command: "clearCache",
    params: {
      displayId: 1
    }
  },
  
  // 콘텐츠 강제 업데이트
  forceRefresh: {
    command: "collectNow",
    params: {
      displayId: 1
    }
  }
};
```

## 문제 해결 가이드

### 일반적인 문제와 해결방법

| 문제 | 원인 | 해결방법 |
|------|------|----------|
| **디스플레이 오프라인** | 네트워크 연결 문제 | 네트워크 설정 확인, 방화벽 규칙 검토 |
| **콘텐츠 미표시** | 스케줄 설정 오류 | 스케줄 시간대 및 우선순위 확인 |
| **동영상 재생 안됨** | 코덱 미지원 | H.264 코덱으로 인코딩, 하드웨어 가속 활성화 |
| **레이아웃 깨짐** | 해상도 불일치 | 디스플레이 해상도와 레이아웃 해상도 맞춤 |
| **업데이트 지연** | 수집 주기 설정 | Collection Interval 단축 (최소 60초) |

### 성능 최적화

```javascript
// 성능 최적화 설정
const optimization = {
  media: {
    imageFormat: "webp", // 용량 절감
    videoCodec: "h264",
    videoBitrate: "5000k",
    resolution: "1920x1080"
  },
  
  player: {
    memoryLimit: "1024MB",
    downloadThreads: 2,
    renderingMode: "hardware",
    cacheSize: "500MB"
  },
  
  network: {
    downloadDuringPlayback: false,
    bandwidthLimit: "10mbps",
    retryCount: 3,
    timeout: 30
  }
};
```

## 보안 설정

### CMS 보안

```yaml
security_settings:
  authentication:
    two_factor: enabled
    password_policy:
      min_length: 12
      require_special: true
      expiry_days: 90
      
  access_control:
    ip_whitelist:
      - "192.168.1.0/24"
      - "10.0.0.0/8"
      
    user_roles:
      - super_admin: "모든 권한"
      - content_manager: "콘텐츠 관리"
      - viewer: "읽기 전용"
      
  encryption:
    api_ssl: required
    database: encrypted
    media_files: optional
```

### 플레이어 보안

```javascript
// 플레이어 보안 설정
const playerSecurity = {
  // 화면 보호
  screenLock: {
    enabled: true,
    pin: "1234",
    autoLockMinutes: 30
  },
  
  // 콘텐츠 보호
  contentProtection: {
    preventScreenshot: true,
    watermark: false,
    encryptedStorage: true
  },
  
  // 네트워크 보안
  network: {
    useHttps: true,
    certificateValidation: true,
    vpnOnly: false
  }
};
```

## 백업 및 복구

### 백업 전략

```bash
#!/bin/bash
# Xibo CMS 백업 스크립트

# 데이터베이스 백업
mysqldump -u xibo -p xibo_db > /backup/xibo_db_$(date +%Y%m%d).sql

# 미디어 파일 백업
tar -czf /backup/xibo_media_$(date +%Y%m%d).tar.gz /var/www/xibo/library/

# 설정 파일 백업
cp -r /var/www/xibo/settings.php /backup/
cp -r /var/www/xibo/web/settings.php /backup/

# 오래된 백업 삭제 (30일 이상)
find /backup -mtime +30 -delete
```

### 복구 절차

```bash
# 데이터베이스 복구
mysql -u xibo -p xibo_db < /backup/xibo_db_20240101.sql

# 미디어 파일 복구
tar -xzf /backup/xibo_media_20240101.tar.gz -C /

# 권한 설정
chown -R www-data:www-data /var/www/xibo/
chmod -R 755 /var/www/xibo/

# 캐시 클리어
php /var/www/xibo/bin/xtr.php cache:clear
```

## 고급 기능

### 대화형 콘텐츠

```html
<!-- 터치스크린 대화형 메뉴 -->
<div id="interactive-menu">
  <script>
    function showCategory(category) {
      // 카테고리별 콘텐츠 표시
      document.querySelectorAll('.category').forEach(el => {
        el.style.display = 'none';
      });
      document.getElementById(category).style.display = 'block';
      
      // Xibo에 이벤트 전송
      xiboIC.trigger('categorySelected', category);
    }
  </script>
  
  <button onclick="showCategory('food')">음식</button>
  <button onclick="showCategory('drinks')">음료</button>
  <button onclick="showCategory('desserts')">디저트</button>
  
  <div id="food" class="category">
    <!-- 음식 메뉴 -->
  </div>
</div>
```

### 데이터셋 활용

```sql
-- 동적 콘텐츠를 위한 데이터셋
CREATE TABLE product_info (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  description TEXT,
  image_url VARCHAR(255),
  stock_quantity INT,
  promotion BOOLEAN
);

-- 실시간 업데이트 트리거
CREATE TRIGGER update_signage
AFTER UPDATE ON product_info
FOR EACH ROW
BEGIN
  -- Xibo API 호출하여 디스플레이 업데이트
  CALL xibo_update_dataset('product_display', NEW.id);
END;
```

### 맞춤형 위젯 개발

```javascript
// 커스텀 위젯 예제: 대기 번호 표시
class QueueDisplay extends XiboWidget {
  constructor(options) {
    super(options);
    this.queueAPI = options.queueAPI;
    this.updateInterval = options.updateInterval || 5000;
  }
  
  async render() {
    const queueData = await this.fetchQueueData();
    
    return `
      <div class="queue-display">
        <h1>현재 대기 번호</h1>
        <div class="current-number">${queueData.current}</div>
        <div class="waiting-count">대기: ${queueData.waiting}명</div>
        <div class="estimated-time">예상 대기 시간: ${queueData.estimatedTime}분</div>
      </div>
    `;
  }
  
  async fetchQueueData() {
    const response = await fetch(this.queueAPI);
    return response.json();
  }
  
  start() {
    this.interval = setInterval(() => {
      this.update();
    }, this.updateInterval);
  }
  
  stop() {
    clearInterval(this.interval);
  }
}
```

## 모범 사례

### 콘텐츠 제작 가이드라인

```yaml
content_guidelines:
  visual:
    resolution: "1920x1080 (Full HD)"
    aspect_ratio: "16:9"
    file_format: "PNG, JPG (이미지), MP4 (비디오)"
    color_profile: "sRGB"
    
  text:
    font_size: "최소 24pt (원거리 시청)"
    contrast: "WCAG AA 기준 (4.5:1)"
    line_height: "1.5배"
    reading_time: "7초/화면"
    
  animation:
    duration: "5-10초"
    transition: "0.5초 이내"
    loop: "자연스러운 연결"
    
  audio:
    format: "MP3, AAC"
    bitrate: "128kbps 이상"
    volume: "정규화 (-16 LUFS)"
```

### 운영 체크리스트

```markdown
## 일일 점검
- [ ] 모든 디스플레이 온라인 상태 확인
- [ ] 콘텐츠 정상 재생 확인
- [ ] 오류 로그 확인
- [ ] 저장 공간 확인 (80% 미만)

## 주간 점검
- [ ] 콘텐츠 업데이트
- [ ] 스케줄 검토 및 수정
- [ ] 플레이어 소프트웨어 업데이트 확인
- [ ] 백업 실행

## 월간 점검
- [ ] 사용 통계 분석
- [ ] 하드웨어 점검 (먼지 제거 등)
- [ ] 보안 패치 적용
- [ ] 라이선스 갱신 확인 (클라우드 서비스 사용 시)
```

## 추가 리소스

### 공식 문서 및 커뮤니티
- [Xibo 공식 사이트](https://xibosignage.com)
- [Xibo 사용자 매뉴얼](https://xibo.org.uk/manual)
- [Xibo 커뮤니티 포럼](https://community.xibo.org.uk)
- [GitHub 저장소](https://github.com/xibosignage)

### 유용한 도구
- **Xibo Layout Designer**: 웹 기반 레이아웃 디자이너
- **Xibo API Postman Collection**: API 테스트 도구
- **Xibo Android Management**: MDM 솔루션
- **Content Creation Tools**: Canva, Adobe Creative Suite

::: tip 💡 Pro Tip
Xibo는 강력한 오픈소스 솔루션이지만, 초기 설정과 최적화가 중요합니다. 
작은 규모로 시작하여 점진적으로 확장하는 것을 권장합니다.
:::

::: warning ⚠️ 주의사항
- 정기적인 백업은 필수입니다
- 네트워크 대역폭을 고려한 콘텐츠 크기 최적화
- 디스플레이 하드웨어 사양에 맞는 콘텐츠 제작
- 저작권이 있는 콘텐츠 사용 시 라이선스 확인
:::