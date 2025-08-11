import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '우리끼리 가이드',
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
      { text: '가이드', link: '/guide/getting-started' },
      { text: 'API 문서', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/uriggiri/uriggiri-guide' }
    ],
    
    // 사이드바 설정
    sidebar: [
      {
        text: '시작하기',
        items: [
          { text: '소개', link: '/guide/introduction' },
          { text: '빠른 시작', link: '/guide/getting-started' },
          { text: '설치 가이드', link: '/guide/installation' }
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