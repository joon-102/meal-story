# 🥗 meal-story
> 오늘의 급식을 인스타 스토리용 이미지로 자동 생성하고 업로드하는 Node.js + TypeScript 프로젝트.

### 🛠️ 설치 및 실행 방법
1. **의존성 설치**
```
yarn install
```
2. **환경 변수 설정**

`.env` 파일을 생성하고 아래 내용을 추가:  
**[시도교육청코드 / 행정표준코드 찿기](https://lrl.kr/UUmM)**

```
ATPT_OFCDC_SC_CODE="시도교육청코드"
SD_SCHUL_CODE="행정표준코드"
IG_USERNAME="인스타그램 이메일"
IG_PASSWORD="인스타그램 비밀번호"
UPLOAD_TIME="30 7" # 업로드 시간 (분, 시간)
```
3. **빌드**
```
yarn run build
```
4. **실행**
```
yarn start
```
### 📁 폴더 구조
```bash
meal-story/
├── src/
│   ├── service/
│   │   ├ image.ts
│   │   ├ meal.ts
│   │   └ upload.ts
│   ├── index.ts                      
│   └── config.ts             
├── assets/
│   ├── Basic.png            
│   └── Pretendard-Bold.ttf
├── .env
├── .gitignore
├── eslint.config.mjs
├── ig-session.json
├── LICENSE            
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

### 📄 라이선스
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

이 프로젝트는 CC BY-NC 4.0 라이선스에 따라 사용됩니다.