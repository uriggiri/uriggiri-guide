import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '우리끼리 시스템',
  description: '우리끼리 서비스 사용 가이드 문서',
  lang: 'ko-KR',
  
  // 커스텀 도메인 사용 시 base는 '/'로 설정
  base: '/',
  
  // 데드 링크 무시 (개발 중)
  ignoreDeadLinks: true,
  
  themeConfig: {
    logo: '/logo.svg',
    
    // 네비게이션 메뉴
    nav: [
      { text: '홈', link: '/' },
      { text: '대시보드', link: '/guide/getting-started' },
      { text: '무인 공간 솔루션', link: '/guide/unmanned-space/' },
      { text: '무인 공간 관리', link: '/guide/muinspace-control/' },
      { text: '반오토', link: '/banauto/' },
      { text: '스탬프 이벤트', link: '/stamp/' },
      { text: 'API 문서', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/uriggiri/uriggiri-guide' }
    ],
    
    // 사이드바 설정 - 경로별로 다른 사이드바 표시
    sidebar: {
      // 스탬프 이벤트 (고객 리텐션 프로그램)
      '/stamp/': [
        {
          text: '스탬프 이벤트',
          items: [
            { text: '개요', link: '/stamp/' },
            { text: '고객 화면', link: '/stamp/customer' },
            { text: '관리자 화면', link: '/stamp/admin' }
          ]
        },
        {
          text: '운영',
          items: [
            { text: '알림톡', link: '/stamp/alrimtalk' },
            { text: '자동화 스케줄', link: '/stamp/cron' }
          ]
        },
        {
          text: '개발팀',
          items: [
            { text: '운영 노트', link: '/stamp/ops' }
          ]
        }
      ],

      // 반오토 (무인매장 위탁관리)
      '/banauto/': [
        {
          text: '반오토',
          items: [
            { text: '개요', link: '/banauto/' },
            { text: '디자인 시스템', link: '/banauto/design-system' }
          ]
        },
        {
          text: '통합관리',
          items: [
            { text: '개요 · 공통 규칙', link: '/banauto/admin/' },
            { text: '통합 대시보드', link: '/banauto/admin/dashboard' },
            { text: '출퇴근 관리', link: '/banauto/admin/attendance' },
            { text: '재고 관리', link: '/banauto/admin/expiry' },
            { text: '발주·정산 관리', link: '/banauto/admin/purchases' },
            { text: '게시판', link: '/banauto/admin/board' },
            { text: '매장 현황', link: '/banauto/admin/stores' },
            { text: '조직관리', link: '/banauto/admin/org' },
            { text: '영업관리', link: '/banauto/admin/sales' },
            { text: '환경설정', link: '/banauto/admin/settings' },
            { text: '무료 트라이얼', link: '/banauto/admin/trial' }
          ]
        },
        {
          text: '개발팀',
          items: [
            { text: '운영 노트', link: '/banauto/ops' },
            { text: '접수 API (홈페이지 → 영업관리)', link: '/banauto/api-leads' }
          ]
        }
      ],

      // 홈 및 일반 가이드 섹션
      '/guide/': [
        {
          text: '시작하기',
          items: [
            { text: '로그인', link: '/guide/getting-started' },
            { text: '대시보드 구조', link: '/guide/structure' }
          ]
        },
        {
          text: '기본 사용법',
          items: [
            { text: '회원가입 및 로그인', link: '/guide/auth' },
            { text: '프로필 설정', link: '/guide/profile' },
            { text: '기본 기능', link: '/guide/basic-features' }
          ]
        },
        {
          text: '고급 기능',
          items: [
            { text: '그룹 관리', link: '/guide/groups' },
            { text: '권한 설정', link: '/guide/permissions' },
            { text: '알림 설정', link: '/guide/notifications' }
          ]
        },
        {
          text: '문제 해결',
          items: [
            { text: 'FAQ', link: '/guide/faq' },
            { text: '문제 해결 가이드', link: '/guide/troubleshooting' },
            { text: '문의하기', link: '/guide/contact' }
          ]
        }
      ],
      
      // 대시보드 섹션
      '/guide/dashboard/': [
        {
          text: '대시보드',
          items: [
            { text: '솔루션 개요', link: '/guide/dashboard/' },
            { text: '출입통제 시스템', link: '/guide/dashboard/access-control' },
            { text: '전기/전열 제어', link: '/guide/dashboard/electrical-control' },
            { text: '보안 시스템', link: '/guide/dashboard/security-system' },
            { text: '방송/알림 시스템', link: '/guide/dashboard/broadcast-notification' }
          ]
        },
        {
          text: '빠른 링크',
          items: [
            { text: '← 메인 가이드로', link: '/guide/getting-started' },
            { text: '무인 공간 솔루션 →', link: '/guide/unmanned-space/' }
          ]
        }
      ],
      
      // 무인 공간 관리 섹션
      '/guide/muinspace-control/': [
        {
          text: '무인 공간 관리',
          items: [
            { text: '대시보드 가이드', link: '/guide/muinspace-control/' },
            { text: '설정 가이드', link: '/guide/muinspace-control/settings' }
          ]
        },
        {
          text: '빠른 링크',
          items: [
            { text: '← 메인 가이드로', link: '/guide/getting-started' },
            { text: '무인 공간 솔루션 →', link: '/guide/unmanned-space/' }
          ]
        }
      ],

      // 무인 공간 솔루션 섹션
      '/guide/unmanned-space/': [
        {
          text: '무인 공간 솔루션',
          items: [
            { text: '솔루션 개요', link: '/guide/unmanned-space/' },
            { text: '출입통제 시스템', link: '/guide/unmanned-space/access-control' },
            { text: '전기/전열 제어', link: '/guide/unmanned-space/electrical-control' },
            { text: '보안 시스템', link: '/guide/unmanned-space/security-system' },
            { text: '방송/알림 시스템', link: '/guide/unmanned-space/broadcast-notification' }
          ]
        },
        {
          text: '빠른 링크',
          items: [
            { text: '← 메인 가이드로', link: '/guide/getting-started' },
            { text: '대시보드 →', link: '/guide/dashboard/' }
          ]
        }
      ]
    },
    
    // 소셜 링크
    socialLinks: [
      { icon: 'github', link: 'https://github.com/uriggiri/uriggiri-guide' }
    ],
    
    // 검색 기능
    search: {
      provider: 'local'
    },
    
    // 푸터
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 우리끼리'
    }
  }
})