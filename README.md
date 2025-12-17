# 🍽️ 단디온나 (Dandi-Onna)

> 예약 노쇼로 발생한 신선식품 손실을 즉시 판매해 손실을 최소화하는 플랫폼

## 📱 프로젝트 개요

**"단디온나"** - 사장님과 함께 상생하는 좋은 만남의 시작 🍽️✨
<br/> <br/>  
예약 노쇼로 폐기될 뻔한 신선한 음식을 할인된 가격에 만날 수 있는 플랫폼입니다.
사업자는 손실을 최소화하고, 소비자는 합리적인 가격에 맛있는 음식을 즐길 수 있어
모두가 **win-win**하는 서비스를 제공합니다.
<br/>  
**핵심 가치**
<br/>  
**🌱 환경 보호**: 음식물 폐기로 인한 환경 오염 방지 <br/>
**💰 경제적 효과**: 사업자 손실 감소 + 소비자 비용 절약 <br/>
**🤝 상생 문화**: 지역 상권과 고객 간 신뢰 관계 구축 <br/>
**⏰ 즉시성**: 실시간 노쇼 발생 시 바로 판매 연결 <br/><br/>

## 🛠️ 기술 스택

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Icons**: Lucide React

## 🚀 시작하기

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### PC 테스트

크롬(Chrome) 브라우저로 테스트 권장

### 모바일 테스트

개발자 도구에서 390px 해상도로 테스트 권장

## 📦 주요 컴포넌트

### 레이아웃

- `Header` - 로고 + 알림 (반응형)
- `BottomNav` - 5개 메뉴 모바일 네비게이션
- `Footer` - 400px 기준 반응형 푸터

### UI 컴포넌트

- `Card` - 가게/예약 정보 표시 (타입별 분기)
- `Alarm` - 4가지 타입 알림 컴포넌트
- `NoticeSummary` - 공지사항 (모바일: 아이콘, PC: 텍스트)

## 🎨 디자인 시스템

- **Primary Color**: 브랜드 컬러
- **Breakpoints**: 390px (모바일), 1024px+ (데스크톱)
- **Container**: 최대 1280px
- **Typography**: Pretendard 폰트

## 🔧 개발 정보

### 폴더 구조

```
📦public             # 정적 파일들
 ┗ 📂icons
 ┣ 📂images
 ┣ 📜file.svg
 ┣ 📜globe.svg
 ┣ 📜next.svg
 ┣ 📜vercel.svg
 ┗ 📜window.svg
📦app
 ┣ 📂seller
 ┣ 📂customer
 ┣ 📜favicon.ico
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┗ 📜page.tsx
📦components
 ┣ 📂features
 ┣ 📂forms
 ┣ 📂layout
 ┗ 📂ui
📦hooks              # 커스텀 훅
📦styles             # 스타일 파일들
📦types              # Typescript 정의
📦libs               # 유틸리티 함수들
📦constant           # 정적 데이터
📦mock               # 목데이터
📜next-nev.d.ts
📜next.config.ts
📜.gitignore
📜eslint.config.mjs
📜package-lock.json
📜package.json
📜postcss.config.mjs
📜README.md
📜tsconfig.json
```

> 자세한 구조 Wiki 작성

### API 엔드포인트

> wiki 작성

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.
