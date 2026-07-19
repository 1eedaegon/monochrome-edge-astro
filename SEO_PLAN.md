# SEO 및 기술 블로그 최적화 계획

## 현재 상태 ✅

### 이미 구현된 항목
- [x] 메타 태그 (title, description, author)
- [x] Open Graph 태그 (Facebook)
- [x] Twitter Card 태그
- [x] Canonical URL
- [x] 사이트맵 및 RSS 피드
- [x] Google Analytics (GA4)
- [x] 내부 링크 (관련 글 + 백링크)
- [x] 읽기 시간 및 단어 수
- [x] 제목 앵커 (rehype-autolink-headings)
- [x] 모바일 반응형 디자인
- [x] SPA 방식 네비게이션을 위한 View Transitions
- [x] **우선순위 1: 필수 SEO** (구조화된 데이터, 브레드크럼, Google 번역, 레이아웃 재구성)
- [x] **우선순위 2: 성능 및 UX** (DNS 프리페치, 코드 블록 개선, 듀얼 테마 지원)
- [x] **우선순위 3: 발견 및 참여** (추적 기능이 포함된 소셜 공유 버튼)
- [x] **우선순위 4: 모니터링 및 분석** (커스텀 분석 이벤트, 추적 유틸리티)
- [x] **우선순위 5: 보안 및 접근성** (콘텐츠 바로가기, ARIA 라벨, 포커스 스타일)
- [x] **우선순위 6: 날짜 표시 개선** (아이콘, 인라인 업데이트, 단어 수 제거)
- [x] **우선순위 7: 자동 H1 렌더링** (SEO 최적화, H1 중복 제거)
- [x] **우선순위 8: Monochrome Edge UI 통합** (Card, Badge 컴포넌트)
- [x] **우선순위 9: 외부 서비스 연동 시스템** (댓글, 검색, 분석, 모니터링 프로바이더)

## 계획된 개선 사항

### 우선순위 1: 필수 SEO 🚀

#### 1.1 구조화된 데이터 (JSON-LD)
**영향**: 높음 - 검색엔진이 콘텐츠 구조를 이해하는 데 도움
**파일**: `src/layouts/BaseLayout.astro`, `src/pages/articles/[slug].astro`

- [ ] BaseLayout에 WebSite 스키마 추가
  - 사이트명, URL, 설명
  - 작성자 정보

- [ ] 글 페이지에 BlogPosting 스키마 추가
  - 제목, 설명
  - 게시일, 수정일
  - 작성자, 발행자, 로고
  - 이미지, 키워드, 카테고리
  - 단어 수, 소요 시간
  - 본문

#### 1.2 브레드크럼 네비게이션
**영향**: 중상 - 네비게이션 및 SEO 개선
**파일**: `src/pages/articles/[slug].astro`, `src/components/Breadcrumb.astro`

- [ ] 브레드크럼 컴포넌트 생성
- [ ] BreadcrumbList 스키마 추가
- [ ] 글 페이지에 추가: 홈 → 글 → 카테고리 → 현재 글

#### 1.3 Google 번역 최적화
**영향**: 높음 - 코드를 보존하면서 국제적 접근성 향상
**파일**: `src/layouts/BaseLayout.astro`, `astro.config.mjs`, `src/utils/rehype-notranslate.ts`

**목표**: 코드 블록과 기술 용어를 유지하면서 빠른 Google 번역 활성화

**구현 단계:**

- [ ] **HTML lang 속성 설정**
  ```astro
  <!-- BaseLayout.astro -->
  <html lang={SITE.locale} data-theme-variant="warm" data-mode="light">
  ```
  - 한국어 페이지에는 `lang="ko"` 사용
  - 영어 페이지에는 `lang="en"` 사용
  - Google 번역이 소스 언어를 감지하는 데 도움

- [ ] **번역 허용 메타 태그 추가**
  ```html
  <meta name="google" content="translate" />
  ```
  - Google 번역 작동을 명시적으로 허용
  - 이 태그 없이는 일부 설정에서 번역이 차단될 수 있음

- [ ] **코드 블록용 rehype 플러그인 생성**
  ```typescript
  // src/utils/rehype-notranslate.ts
  import { visit } from 'unist-util-visit';

  export function rehypeNoTranslate() {
    return (tree) => {
      visit(tree, 'element', (node) => {
        // 모든 <pre>와 <code> 요소에 translate="no" 추가
        if (node.tagName === 'pre' || node.tagName === 'code') {
          node.properties = node.properties || {};
          node.properties.translate = 'no';
        }
      });
    };
  }
  ```

- [ ] **astro.config.mjs에 플러그인 추가**
  ```javascript
  import { rehypeNoTranslate } from './src/utils/rehype-notranslate';

  export default defineConfig({
    markdown: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { /* ... */ }],
        rehypeNoTranslate, // 추가
      ],
    },
  });
  ```

- [ ] **기술 용어에 notranslate 클래스 추가**
  - 콘텐츠 파일에서 기술 용어 래핑:
    ```markdown
    <span class="notranslate">React</span> 훅인
    <span class="notranslate">useState</span>와
    <span class="notranslate">useEffect</span>를 사용하세요.
    ```
  - 일관성을 위한 CSS 추가:
    ```css
    .notranslate {
      /* 선택사항: 기술 용어 스타일링 */
      font-family: 'Monaco', 'Courier New', monospace;
    }
    ```

- [ ] **브랜드명 및 API 보호**
  - `<span class="notranslate">`으로 래핑:
    - 라이브러리/프레임워크명: React, Vue, TypeScript 등
    - API명: fetch, async/await, Promise 등
    - 명령어명: npm, git, docker 등
    - 본문 내 파일명/변수명

- [ ] **테스트**
  - Chrome 자동 번역 기능으로 테스트
  - URL 파라미터로 테스트: `?googtrans=ko|en` 또는 `?googtrans=en|ko`
  - 확인 사항:
    - ✅ 일반 텍스트가 올바르게 번역됨
    - ✅ 코드 블록이 번역되지 않음
    - ✅ 기술 용어가 영어로 유지됨
    - ✅ 링크와 네비게이션이 정상 작동
  - 실제 모바일 기기(Android/iOS)에서 테스트

**예상 결과:**
- 일반 텍스트: ✅ 번역됨
- 코드 블록: ❌ 원본 언어 유지
- 기술 용어: ❌ 영어 유지
- 브랜드명: ❌ 원본 유지
- 빠른 번역: ✅ Google 번역이 빠르게 처리

#### 1.4 글 레이아웃 재구성
**영향**: 높음 - 개선된 콘텐츠 구조를 통한 UX 및 SEO 향상
**파일**: `src/pages/articles/[slug].astro`

**목표**: 관련 글을 글 푸터 위로 이동, 참고 자료만 아래에 유지

**현재 레이아웃:**
```
┌─────────────────────────┐
│ 글 본문 (prose)          │
└─────────────────────────┘
        ↓
┌─────────────────────────┐
│ 글 푸터                  │
│ ─────────────────────── │
│ 관련 글 (내부)           │
│ 참고 자료 (외부)         │
└─────────────────────────┘
        ↓
┌─────────────────────────┐
│ 댓글                     │
└─────────────────────────┘
```

**새 레이아웃:**
```
┌─────────────────────────┐
│ 글 본문 (prose)          │
└─────────────────────────┘
        ↓
┌─────────────────────────┐
│ 관련 글                  │
│ (내부 링크 + 백링크)      │
└─────────────────────────┘
        ↓
┌─────────────────────────┐
│ 글 푸터                  │
│ ─────────────────────── │
│ 참고 자료 (외부)         │
└─────────────────────────┘
        ↓
┌─────────────────────────┐
│ 댓글                     │
└─────────────────────────┘
```

**장점:**
- **UX 향상**: 읽은 직후 관련 글을 바로 확인 가능
- **참여율 증가**: 관련 글의 가시성이 높아져 클릭률 상승
- **SEO 개선**: HTML 구조 상 내부 링크가 더 앞에 위치
- **명확한 구분**: 내부 네비게이션 vs 외부 참고 자료
- **체류 시간 향상**: 더 많은 글을 읽도록 유도

**구현 단계:**

- [ ] **글 템플릿 재구성**
  - 관련 글 섹션을 `<footer class="article-footer">` 밖으로 이동
  - `<div class="prose"><Content /></div>` 바로 뒤에 배치
  - 푸터에는 참고 자료(외부 링크)만 유지
  - 새 구조에 맞게 스타일 업데이트

- [ ] **CSS 스타일 업데이트**
  ```css
  /* 관련 글 - 눈에 띄는 배치 */
  .related-posts {
    margin: 3rem 0 2rem 0;
    padding: 2rem;
    background-color: var(--bg-secondary);
    border-radius: 12px;
    border: 2px solid var(--border-primary);
  }

  /* 글 푸터 - 차분한 스타일 */
  .article-footer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-primary);
  }
  ```

- [ ] **시각적 구분 추가**
  - 관련 글: 카드 형태의 눈에 띄는 스타일
  - 참고 자료: 심플한 리스트의 차분한 스타일
  - 아이콘 추가 고려 (🔗 내부, 🌐 외부)

- [ ] **모바일 테스트**
  - 작은 화면에서 가독성 확인
  - 터치 대상 크기가 적절한지 확인
  - 간격과 계층 구조가 명확한지 확인

### 우선순위 2: 성능 및 UX ⚡

#### 2.1 리소스 최적화
**파일**: `src/layouts/BaseLayout.astro`

- [ ] 외부 도메인에 대한 DNS 프리페치 추가
  - Google Analytics
  - CDN (jsdelivr)

- [ ] 핵심 리소스에 대한 preconnect 추가
- [ ] 모바일용 `format-detection` 메타 추가

#### 2.2 코드 블록 개선
**파일**: `astro.config.mjs`, `src/scripts/copy-code.ts`

- [ ] 듀얼 테마 지원 추가 (라이트/다크)
  ```js
  themes: {
    light: 'github-light',
    dark: 'github-dark'
  }
  ```
- [ ] 코드 블록에 언어 라벨 추가
- [ ] 복사 성공 토스트 알림 추가
- [ ] 줄 번호 옵션 추가
- [ ] 줄 하이라이트 지원 추가

#### 2.3 이미지 최적화
**파일**: 각종 콘텐츠 파일

- [ ] Astro Image 컴포넌트 사용
- [ ] 모든 이미지에 적절한 alt 텍스트 추가
- [ ] 스크롤 아래 이미지에 loading="lazy" 추가
- [ ] 이미지 크기 최적화 (WebP 포맷)
- [ ] 블러 플레이스홀더 추가

### 우선순위 3: 발견 및 참여 🔍

#### 3.1 소셜 공유
**파일**: `src/components/ShareButtons.astro`

- [ ] ShareButtons 컴포넌트 생성
  - Twitter 공유
  - LinkedIn 공유
  - Facebook 공유 (선택)
  - 링크 복사

- [ ] 분석에 공유 추적 추가

#### 3.2 관련 콘텐츠 개선
**파일**: `src/pages/articles/[slug].astro`

- [ ] 관련 글에 썸네일 표시
- [ ] 발췌문 미리보기 추가
- [ ] 관련 글의 읽기 시간 표시
- [ ] "이 시리즈의 다른 글" 섹션 추가

#### 3.3 검색 개선
**파일**: `src/components/SearchModal.astro`

- [ ] 키보드 단축키 추가 (Cmd+K)
- [ ] 최근 검색 기록
- [ ] 검색 제안
- [ ] 인기 검색어 추적

### 우선순위 4: 모니터링 및 분석 📊

#### 4.1 커스텀 분석 이벤트
**파일**: `src/utils/analytics.ts`, 각종 컴포넌트

- [ ] 분석 유틸리티 생성
- [ ] 글 읽기 이벤트 추적
- [ ] 코드 복사 이벤트 추적
- [ ] 외부 링크 클릭 추적
- [ ] 검색 쿼리 추적
- [ ] 시리즈 네비게이션 추적

#### 4.2 오류 추적
**파일**: 새 연동

- [ ] Sentry 또는 유사 서비스 추가
- [ ] 404 오류 추적
- [ ] 깨진 링크 추적
- [ ] 성능 지표 모니터링

### 우선순위 5: 보안 및 접근성 ♿

#### 5.1 보안 헤더
**파일**: `astro.config.mjs` 또는 호스팅 설정

- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Content-Security-Policy (검토 필요)

#### 5.2 접근성
**파일**: 각종 컴포넌트

- [ ] 콘텐츠 바로가기 링크 추가
- [ ] 네비게이션에 ARIA 라벨 추가
- [ ] 인터랙티브 요소에 ARIA 라벨 추가
- [ ] 스크린 리더로 테스트
- [ ] 키보드 네비게이션 작동 확인
- [ ] 색상 대비 비율 확인

#### 5.3 추가 메타 태그
**파일**: `src/layouts/BaseLayout.astro`

- [ ] robots 메타 태그 추가
- [ ] 모바일 브라우저용 theme-color 추가
- [ ] 다국어 대안 추가 (다국어 지원 시)
- [ ] msapplication-TileColor 추가

### 우선순위 6: 날짜 표시 개선 📅

**영향**: 높음 - 깔끔한 UI, 사용자 집중도 향상
**파일**: `src/pages/articles/[slug].astro`

**현재 문제점:**
- 단어 수는 불필요한 기술 정보
- 날짜 소스 디버그 정보가 프로덕션을 어수선하게 만듦
- 별도 박스의 업데이트 날짜가 시각적으로 산만

**새 디자인:**
```
📅 2024-01-15 • ⏱️ 5분 • 🔄 업데이트: 2024-02-20
```

**구현:**

#### 6.1 불필요한 정보 제거
- [ ] 단어 수 표시 제거 (`{wordCount} words`)
- [ ] 날짜 소스 디버그 완전 제거 (DEV 모드만이 아닌)
- [ ] 유지 항목: 날짜, 읽기 시간, 업데이트 (있는 경우)

#### 6.2 날짜 아이콘 추가
- [ ] 날짜 앞에 캘린더 아이콘 (📅 또는 SVG) 추가
- [ ] 읽기 시간 앞에 시계 아이콘 (⏱️ 또는 SVG) 추가
- [ ] 업데이트 날짜 앞에 갱신 아이콘 (🔄 또는 SVG) 추가

#### 6.3 인라인 업데이트 날짜
- [ ] 업데이트 날짜를 별도 박스에서 날짜와 같은 줄로 이동
- [ ] 형식: `날짜 • 읽기 시간 • 업데이트: 날짜` (업데이트가 있는 경우)
- [ ] 부피 큰 업데이트 박스 스타일 제거

#### 6.4 날짜 소스 우선순위 (이미 구현됨, 확인 필요)
1. **프론트매터** `date:` → 사용자가 명시적으로 설정
2. **Git 첫 커밋** → `git log --reverse`
3. **파일 생성일** → `fs.statSync().birthtime`
4. **현재 날짜** → `new Date()`

**테스트:**
- [ ] 프론트매터 날짜로 테스트
- [ ] 프론트매터 없이 테스트 (git 폴백)
- [ ] 업데이트 날짜가 있는 경우 테스트
- [ ] 업데이트 날짜가 없는 경우 테스트
- [ ] 아이콘이 올바르게 표시되는지 확인
- [ ] 모바일 반응형 확인

---

### 우선순위 7: 자동 H1 렌더링 🎯

**영향**: 중간 - SEO 개선, H1 중복 방지
**파일**: `src/pages/articles/[slug].astro`

**현재 문제:**
```astro
<h1 class="article-title">{post.data.title}</h1>
```
마크다운에 `# 제목`이 있어도 항상 프론트매터의 H1을 렌더링

**SEO 문제:**
- 페이지당 H1이 여러 개 (SEO에 불리)
- H1은 페이지당 하나여야 함

**새 로직:**
```
마크다운에 H1(#)이 포함된 경우:
  → 자동 H1을 렌더링하지 않음
  → 마크다운의 H1 사용
아닌 경우:
  → 프론트매터 제목을 H1으로 렌더링
```

**구현:**

#### 7.1 마크다운에서 H1 감지
```typescript
const rendered = await render(post);
const headings = rendered.headings || [];
const hasH1 = headings.some(h => h.depth === 1);
```

#### 7.2 조건부 렌더링
```astro
{!hasH1 && (
  <h1 class="article-title">{post.data.title}</h1>
)}
```

#### 7.3 SEO 고려사항
- [ ] 페이지당 정확히 하나의 H1 보장
- [ ] 프론트매터 제목은 항상 meta/og 태그에 포함
- [ ] H1 내용이 제목과 일치하거나 관련되어야 함
- [ ] 필요 시 구조화된 데이터 업데이트

**테스트:**
- [ ] 마크다운에 H1이 없는 글 → 제목이 H1으로 렌더링
- [ ] 마크다운에 H1이 있는 글 → H1 중복 없음
- [ ] SEO 메타 태그가 항상 제목을 사용하는지 확인
- [ ] 제목 계층 구조 확인 (H1 → H2 → H3)

---

### 우선순위 8: Monochrome Edge UI 통합 🎨

**영향**: 높음 - 일관성 향상, 유지보수 용이
**파일**: 여러 컴포넌트

**현재 상태:**
- `@monochrome-edge/ui`: v1.9.12 설치됨
- Stepper만 monochrome-edge 사용 (CDN 경유)
- 나머지 컴포넌트는 커스텀 빌드

**목표:**
- 가능한 곳에 monochrome-edge/ui 컴포넌트 사용
- 커스텀 컴포넌트도 동일한 디자인 시스템 따르기
- 추후 구현 교체가 용이한 구조

**v1.9.12에서 사용 가능한 컴포넌트:**
1. 타이포그래피 (제목, 본문, 시맨틱 스타일)
2. 탭 (네비게이션, 콘텐츠 섹션)
3. TOC (호버 카드, 접이식 목록)
4. 검색 툴바 (퍼지 검색, 필터)
5. 아이콘 버튼 (테마/모드 토글)
6. 프로그레스 바 (로딩, 읽기 진행률)
7. 카드 (헤더, 콘텐츠, 액션)

**구현 전략:**

#### 8.1 1단계: 디자인 시스템 정렬 (1시간)
- [ ] 모든 컴포넌트가 monochrome-edge CSS 변수를 사용하는지 확인
- [ ] 일관된 간격 확인 (`--spacing-*`)
- [ ] 일관된 색상 확인 (`--text-*`, `--bg-*`, `--border-*`)
- [ ] 타이포그래피 확인 (`--font-*`, `--text-*`)

#### 8.2 2단계: 컴포넌트 추상화 (2-3시간)

**래퍼 컴포넌트 생성:**

**파일**: `src/components/ui/` (새 디렉토리)
- [ ] `Card.astro` - 카드 레이아웃 래퍼
- [ ] `TOC.astro` - monochrome TOC 스타일 사용
- [ ] `ProgressBar.astro` - monochrome 프로그레스 스타일 사용
- [ ] `Button.astro` - 표준 버튼 컴포넌트
- [ ] `Badge.astro` - 태그, 카테고리용

**예시 구조:**
```astro
<!-- src/components/ui/Card.astro -->
---
interface Props {
  variant?: 'default' | 'outlined' | 'elevated';
}
const { variant = 'default' } = Astro.props;
---
<div class="card" data-variant={variant}>
  <slot />
</div>

<style>
  /* monochrome-edge에서 임포트 또는 커스텀 */
  .card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    padding: 1.5rem;
  }
</style>
```

#### 8.3 3단계: 기존 컴포넌트 리팩토링 (2시간)

**TOC 컴포넌트:**
- [ ] monochrome-edge TOC 스타일 적용
- [ ] 데스크톱용 호버 카드 스타일 사용
- [ ] 모바일용 접이식 목록 사용

**읽기 진행률:**
- [ ] monochrome-edge 프로그레스 바 스타일 사용
- [ ] 부드러운 애니메이션 보장

**관련 글 및 시리즈:**
- [ ] Card 컴포넌트를 사용하도록 리팩토링
- [ ] 일관된 카드 스타일 적용

**태그 및 카테고리:**
- [ ] Badge 컴포넌트 생성
- [ ] 태그, 카테고리, 시리즈에 사용

#### 8.4 4단계: 문서화 (30분)
- [ ] monochrome-edge를 사용하는 컴포넌트 문서화
- [ ] 커스텀 컴포넌트 문서화
- [ ] 컴포넌트 사용 예시 추가
- [ ] 컴포넌트 마이그레이션 가이드 작성

**장점:**
- **일관성**: 모든 컴포넌트가 조화로운 모습
- **유지보수성**: 디자인 시스템 업데이트가 용이
- **유연성**: 구현 교체가 용이
- **미래 대비**: monochrome-edge 업데이트 준비 완료

**테스트:**
- [ ] 모든 컴포넌트가 올바르게 렌더링되는지 확인
- [ ] 테마 전환 확인 (warm/cold, light/dark)
- [ ] 반응형 동작 테스트
- [ ] 접근성 확인

---

### 우선순위 9: 외부 서비스 연동 시스템 🔌

**영향**: 높음 - 플러그 앤 플레이 외부 서비스
**파일**: `src/config.ts`, 여러 컴포넌트 파일

**현재 한계:**
- 댓글은 Giscus만 지원 (하드코딩)
- 검색은 로컬만 지원 (대안 없음)
- 모니터링 시스템 없음
- 새 서비스 추가가 어려움

**목표:**
유연한 연동 시스템을 만들어 사용자가:
1. `.env` 파일만 수정
2. 여러 서비스 프로바이더 중 선택
3. 서비스를 쉽게 활성화/비활성화
4. 코드 변경 없이 새 서비스 추가

**구현:**

#### 9.1 설정 시스템 리팩토링 (30분)

**파일**: `src/config.ts`, `.env.example`

**새 구조:**
```typescript
export const INTEGRATIONS = {
  comments: {
    provider: 'giscus', // 'none' | 'giscus' | 'utterances' | 'disqus' | 'cusdis'
    giscus: { /* 설정 */ },
    utterances: { /* 설정 */ },
    disqus: { /* 설정 */ },
    cusdis: { /* 설정 */ },
  },
  search: {
    provider: 'local', // 'local' | 'algolia' | 'none'
    algolia: { /* 설정 */ },
  },
  monitoring: {
    sentry: {
      enabled: false,
      dsn: '',
      environment: 'production',
    },
  },
  analytics: {
    ga4: { enabled: false, measurementId: '' },
    plausible: { enabled: false, domain: '' },
  },
}
```

**작업:**
- [ ] 새 INTEGRATIONS 구조 생성
- [ ] 기존 COMMENTS와 ANALYTICS 마이그레이션
- [ ] 모든 옵션이 포함된 `.env.example` 생성
- [ ] 필수 필드 유효성 검사 추가

#### 9.2 댓글 시스템 (1시간)

**파일**: `src/components/comments/`

**구조:**
```
src/components/comments/
├── Comments.astro            # 프로바이더 선택기
├── GiscusComments.astro
├── UtterancesComments.astro
├── DisqusComments.astro
└── CusdisComments.astro
```

**Comments.astro (메인):**
```astro
---
import { INTEGRATIONS } from '../../config';
const provider = INTEGRATIONS.comments.provider;
---

{provider === 'giscus' && <GiscusComments />}
{provider === 'utterances' && <UtterancesComments />}
{provider === 'disqus' && <DisqusComments />}
{provider === 'cusdis' && <CusdisComments />}
```

**작업:**
- [ ] 댓글 폴더 구조 생성
- [ ] 기존 Giscus 코드를 GiscusComments.astro로 이동
- [ ] UtterancesComments.astro 생성
- [ ] DisqusComments.astro 생성
- [ ] CusdisComments.astro 생성
- [ ] Comments.astro에 프로바이더 선택기 구현

#### 9.3 검색 시스템 (1시간)

**파일**: `src/components/search/`

**구조:**
```
src/components/search/
├── Search.astro           # 프로바이더 선택기
├── LocalSearch.astro      # 현재 Fuse.js
└── AlgoliaSearch.astro    # Algolia 연동
```

**작업:**
- [ ] 검색 폴더 구조 생성
- [ ] SearchModal을 LocalSearch.astro로 이동
- [ ] AlgoliaSearch.astro 생성 (선택, 플레이스홀더 가능)
- [ ] Search.astro에 프로바이더 선택기 구현
- [ ] Header에서 새 Search 컴포넌트 사용하도록 업데이트

#### 9.4 분석 시스템 (30분)

**파일**: `src/components/analytics/`

**구조:**
```
src/components/analytics/
├── Analytics.astro        # 멀티 프로바이더 지원
├── GoogleAnalytics.astro
└── Plausible.astro
```

**Analytics.astro:**
```astro
---
const isProd = import.meta.env.PROD;
---

{isProd && INTEGRATIONS.analytics.ga4.enabled && <GoogleAnalytics />}
{isProd && INTEGRATIONS.analytics.plausible.enabled && <Plausible />}
```

**작업:**
- [ ] 분석 폴더 구조 생성
- [ ] GA4 코드를 GoogleAnalytics.astro로 이동
- [ ] Plausible.astro 생성 (선택)
- [ ] 동시에 여러 분석 도구 지원

#### 9.5 모니터링 시스템 (30분)

**파일**: `src/utils/monitoring.ts`, `src/layouts/BaseLayout.astro`

**monitoring.ts:**
```typescript
import * as Sentry from '@sentry/astro';
import { INTEGRATIONS } from '../config';

export function initMonitoring() {
  if (!INTEGRATIONS.monitoring.sentry.enabled) return;

  Sentry.init({
    dsn: INTEGRATIONS.monitoring.sentry.dsn,
    environment: INTEGRATIONS.monitoring.sentry.environment,
    tracesSampleRate: 1.0,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
  });
}
```

**작업:**
- [ ] @sentry/astro 설치 (선택적 의존성)
- [ ] monitoring.ts 유틸리티 생성
- [ ] BaseLayout에서 초기화
- [ ] 에러 바운더리 예시 추가

#### 9.6 문서화 (30분)

**파일**: `README.md` 또는 `docs/INTEGRATIONS.md`

**내용:**
- [ ] 각 서비스 빠른 시작 가이드
- [ ] .env 설정 예시
- [ ] 프로바이더 전환 방법
- [ ] 자주 발생하는 문제 해결

**예시:**
```markdown
## 댓글 시스템 전환

### Giscus에서 Utterances로:
1. `.env` 수정:
   ```bash
   COMMENTS_PROVIDER=utterances
   UTTERANCES_REPO="username/repo"
   ```
2. 다시 빌드: `npm run build`
3. 완료!
```

**테스트:**
- [ ] 각 댓글 프로바이더 테스트
- [ ] 검색 프로바이더 테스트
- [ ] 분석 추적 테스트
- [ ] 모니터링 (Sentry) 테스트
- [ ] 프로바이더 전환 테스트
- [ ] .env 변경이 작동하는지 확인

**장점:**
- **사용자 친화적**: `.env`만 수정하면 됨
- **유연함**: 프로바이더 전환이 용이
- **확장 가능**: 새 서비스 추가가 쉬움
- **유지보수 용이**: 각 서비스가 분리됨
- **프로덕션 준비 완료**: 적절한 오류 처리

---

## 디자인 가이드라인 🎨

### 콘텐츠 레이아웃 원칙
1. **컴포넌트에 이모지 사용 금지**: 제목, 버튼, 네비게이션 요소에 이모지 사용 회피
   - ❌ 나쁜 예: `<h2>🔗 관련 글</h2>`
   - ✅ 좋은 예: `<h2>관련 글</h2>`
   - 이유: 이모지는 시각적 잡음을 추가하고 전문성을 떨어뜨림

2. **컨텐츠 간격 조밀하게**: 콘텐츠 요소 간 간격을 줄여 집중도 향상
   - 줄 높이: 1.7 (1.8 이상 아님)
   - 단락 간격: 단락 사이 1rem
   - 목록 항목 간격: 항목 사이 0.5rem
   - 제목 간격:
     - H2: 상단 2.5rem, 하단 1rem
     - H3: 상단 2rem, 하단 0.875rem
     - H4: 상단 1.5rem, 하단 0.75rem
   - 이유: 제목과 구분선이 이미 시각적 분리를 제공

3. **컴포넌트 간격**: 주요 섹션에는 더 큰 여백
   - 관련 글: 상단 2.5rem, 하단 1.5rem
   - 글 푸터: 상단 1.5rem
   - 이유: 구조적 컴포넌트는 명확한 분리가 필요하고, 콘텐츠는 밀도가 필요

4. **시각적 계층 구조**:
   - 주요 섹션 (관련 글): 테두리가 있는 눈에 띄는 스타일
   - 보조 섹션 (참고 자료): 최소한의 장식으로 차분한 스타일
   - 콘텐츠: 밀도 있고 집중된, 구조가 쉼을 제공하도록

## 콘텐츠 작성 가이드라인 📝

### SEO 모범 사례
1. **제목**: 50-60자, 주요 키워드 포함
2. **설명**: 150-160자, 매력적인 요약
3. **URL 슬러그**: 짧고, 설명적이며, 하이픈으로 구분
4. **제목**: 논리적 계층 구조 (H1 → H2 → H3)
5. **내부 링크**: 글당 관련 글 2-3개
6. **키워드**: 자연스러운 배치, 강제하지 않기
7. **Alt 텍스트**: 설명적으로, 컨텍스트 포함

### 기술 블로그 세부사항
1. **코드 예시**:
   - 항상 언어 지정
   - 복잡한 부분에 주석 추가
   - 구문 하이라이팅 사용
   - 실행 가능한 예시 유지

2. **구조**:
   - 소개 (문제 설명)
   - 사전 요구사항 (있는 경우)
   - 단계별 설명
   - 컨텍스트가 포함된 코드 예시
   - 요약/결론
   - 추가 읽기 링크

3. **가독성**:
   - 짧은 단락 (3-4줄)
   - 글머리 기호와 목록 활용
   - 다이어그램/스크린샷 포함
   - 강조를 위해 굵게/기울임 사용
   - 긴 글에는 목차 추가

## 테스트 체크리스트 🧪

### 게시 전
- [ ] 모바일 기기에서 테스트
- [ ] 스크린 리더로 테스트
- [ ] 모든 내부 링크 작동 확인
- [ ] 외부 링크가 새 탭에서 열리는지 확인
- [ ] 코드 예시가 올바른지 확인
- [ ] 이미지가 제대로 로드되는지 확인
- [ ] 메타 태그가 올바른지 확인
- [ ] 공유 버튼 작동 확인
- [ ] 읽기 시간이 정확한지 확인
- [ ] 카테고리/시리즈 네비게이션 확인

### SEO 테스트 도구
- [ ] Google Search Console
- [ ] Google 리치 결과 테스트
- [ ] PageSpeed Insights
- [ ] Lighthouse (Chrome DevTools)
- [ ] 모바일 친화성 테스트
- [ ] Schema.org 유효성 검사기

## 유지보수 작업 🔧

### 주간
- [ ] Google Search Console에서 오류 확인
- [ ] 분석 데이터 검토
- [ ] 깨진 링크 확인
- [ ] 사이트 성능 모니터링

### 월간
- [ ] 의존성 업데이트
- [ ] 상위 성과 콘텐츠 검토
- [ ] 콘텐츠 갭 파악
- [ ] 필요 시 이전 글 업데이트
- [ ] 경쟁사 분석 확인

### 분기별
- [ ] 종합 SEO 감사
- [ ] SEO 전략 검토 및 업데이트
- [ ] 백링크 프로필 분석
- [ ] 기술 문서 업데이트

## 참고 자료 📚

- [Google Search Central](https://developers.google.com/search)
- [Schema.org 문서](https://schema.org/)
- [Astro 문서 - SEO](https://docs.astro.build/en/guides/seo/)
- [Web.dev 성능](https://web.dev/performance/)
- [MDN 웹 문서 - 접근성](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## 참고사항

- 최대 SEO 효과를 위해 우선순위 1부터 집중
- 각 변경 사항을 점진적으로 테스트
- 주요 변경 전후로 분석 모니터링
- SEO 기법보다 콘텐츠 품질을 최우선으로
- 사용자 경험 > 검색엔진 최적화
