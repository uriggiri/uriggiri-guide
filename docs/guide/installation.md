# 설치 가이드

## 시스템 요구사항

### 웹 브라우저

우리끼리는 다음 브라우저를 지원합니다:

- Chrome 90 이상
- Firefox 88 이상
- Safari 14 이상
- Edge 90 이상

### 모바일 앱

#### iOS
- iOS 14.0 이상
- iPhone 6s 이상
- 저장 공간: 100MB 이상

#### Android
- Android 8.0 (API 26) 이상
- RAM: 2GB 이상
- 저장 공간: 150MB 이상

## 데스크톱 앱 설치

### Windows

1. [다운로드 페이지](https://uriggiri.com/download)에서 Windows 설치 파일 다운로드
2. `UriggiriSetup.exe` 실행
3. 설치 마법사 지시에 따라 진행

```powershell
# PowerShell을 통한 설치 (관리자 권한 필요)
Invoke-WebRequest -Uri "https://download.uriggiri.com/windows/latest" -OutFile "UriggiriSetup.exe"
Start-Process -FilePath "UriggiriSetup.exe" -Wait
```

### macOS

1. [다운로드 페이지](https://uriggiri.com/download)에서 macOS 설치 파일 다운로드
2. `Uriggiri.dmg` 파일 열기
3. Uriggiri 앱을 Applications 폴더로 드래그

```bash
# Homebrew를 통한 설치
brew install --cask uriggiri
```

### Linux

#### Ubuntu/Debian

```bash
# APT 저장소 추가
curl -fsSL https://download.uriggiri.com/linux/uriggiri.gpg | sudo apt-key add -
sudo add-apt-repository "deb https://download.uriggiri.com/linux/apt stable main"

# 설치
sudo apt update
sudo apt install uriggiri
```

#### Fedora/RHEL

```bash
# YUM 저장소 추가
sudo rpm --import https://download.uriggiri.com/linux/uriggiri.gpg
sudo yum-config-manager --add-repo https://download.uriggiri.com/linux/yum/uriggiri.repo

# 설치
sudo yum install uriggiri
```

## 모바일 앱 설치

### iOS 설치

1. App Store 열기
2. "우리끼리" 검색
3. **받기** 버튼 탭
4. Face ID/Touch ID 또는 Apple ID 비밀번호로 인증

또는 [직접 링크](https://apps.apple.com/app/uriggiri)

### Android 설치

1. Google Play Store 열기
2. "우리끼리" 검색
3. **설치** 버튼 탭
4. 권한 요청 승인

또는 [직접 링크](https://play.google.com/store/apps/details?id=com.uriggiri)

## 초기 설정

### 1. 앱 실행 및 로그인

설치 완료 후:
1. 우리끼리 앱 실행
2. 이메일과 비밀번호로 로그인
3. 2단계 인증 설정 (선택사항)

### 2. 알림 권한 설정

원활한 소통을 위해 알림 권한을 허용해주세요:

- **Windows**: 시스템 설정 → 알림 → 우리끼리 허용
- **macOS**: 시스템 환경설정 → 알림 → 우리끼리 허용
- **iOS**: 설정 → 알림 → 우리끼리 → 알림 허용
- **Android**: 설정 → 앱 → 우리끼리 → 알림 → 모든 알림 허용

### 3. 기본 설정

#### 일반 설정
- 언어 선택
- 테마 설정 (밝게/어둡게/시스템 설정 따름)
- 시작 시 자동 실행

#### 알림 설정
- 메시지 알림
- 멘션 알림
- 프로젝트 업데이트 알림

## 문제 해결

### 설치 실패 시

#### Windows
- 관리자 권한으로 실행
- Windows Defender 일시 중지
- 이전 버전 완전 제거 후 재설치

#### macOS
- 보안 및 개인 정보 보호에서 앱 허용
- Gatekeeper 임시 비활성화: `sudo spctl --master-disable`

### 로그인 문제

1. 인터넷 연결 확인
2. 방화벽/프록시 설정 확인
3. 캐시 삭제 후 재시도

::: info 도움말
설치 관련 문제가 지속되는 경우 [기술 지원팀](mailto:tech@uriggiri.com)에 문의하세요.
:::