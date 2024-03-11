
# Today Room

React + TypeScript + Vite 가구 구매 사이트
</br>

## 시작하기 ( Get Start ) ✨

For building and running the application you need:

 - [Node.js 20.11.0](https://nodejs.org/en)
 - [npm 10.3.0](https://nodejs.org/en)

Clone the project

```bash
  git clone https://github.com/kimhyunjee/today_room.git
```

Go to the project directory

```bash
  cd today_room
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
</br>

## 2. 사용 기술 ( Technologies Used )
<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
   <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
   <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>
  <img src="https://img.shields.io/badge/React--Query-f04f3d?style=flat-square&logo=ReactQuery&logoColor=white"/>
  <img src="https://img.shields.io/badge/Context--API-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white"/>


</div>
<!--
<div>
  <img src="https://img.shields.io/badge/Amazon_S3-569A31?style=flat-square&logo=amazons3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_CloudFront-FF9900?style=flat-square&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_Route53-8C4FFF?style=flat-square&logo=amazonroute53&logoColor=white"/>
</div>
-->
</br>

## 3. 아키텍처 ( Architecture )
</br>

## 4. 주요 기능 ( Features )
</br>

## 5. 기술적 의사결정
|사용기술|설명|
|------|---|
|TypeScript|**1.코드 안정성과 오류 감소**: 타입스크립트는 정적 타입 검사를 통해 코드의 안정성을 높이고, 오류를 사전에 방지합니다. 변수, 함수 및 객체의 타입을 명시적으로 정의하므로 코드를 작성하면서 발생할 수 있는 많은 일반적인 오류를 타입 주석을 통해 사전에 파악할 수 있습니다.**2.코드 가독성과 유지 보수성 향상**: 타입스크립트는 타입 주석과 타입 추론을 통해 코드의 가독성을 향상, 타입스크립트의 컴파일러가 명시된 타입을 통해 이를 검사하므로 코드 실행 전에 오류를 발견 할 수 있습니다|
|TailwindCSS|테스트2|
|React-Query|**1.데이터 관리의 단순화**: React Query 는 API 요청, 데이터 캐싱 및 데이터 관리를 단순화합니다. 기존의 상태 관리 라이브러리보다 훨씬 간편한 방식으로 데이터를 가져오고 관리할 수 있습니다. 이를 통해 데이터 로딩, 캐싱, 오류 처리 및 리패칭과 같은 복잡한 로직을 쉽게 다룰 수 있습니다.**2.인터랙티브한 UI 강화**: React Query 는 데이터 가져오기 및 캐싱을 효율적으로 수행하므로 불필요한 네트워크 요청을 줄이고, 렌더링 성능을 최적화하는 데 도움을 줍니다. 이는 카테고리와 필터 기능에서 한 번 불러온 데이터의 내용을 캐싱처리되어 다시 한 번 같은 데이터를 조회할 때, 리패칭되지 않으면서 불필요한 렌더링을 줄입니다. **3.서버 상태와 클라이언트 캐시의 일치**: React Query 는 서버 상태와 클라이언트 캐시를 쉽게 일치시킬 수 있는 강력한 도구를 제공합니다. 서버의 상태 변화를 클라이언트에 반영하고, 업데이트된 데이터를 자동으로 캐시에 반영함으로써 데이터 일관성을 유지합니다.|
|Firebase|**1.디자인 시스템을 구성하는 모든 요소의 일관성을 쉽게 유지**|
|Vite| **1.서버의 시작 시간 개선**|
|Shadcn-ui| **1.직접적인 커스터마이제이션**: 컴포넌트 코드를 직접 프로젝트에 통합함으로써, 사용자는 라이브러리의 제약에서 벗어나 완전히 자유롭게 커스터마이즈할 수 있습니다. **2.의존성 최소화**: 별도의 패키지 설치 없이 필요한 컴포넌트만 선택하여 사용할 수 있으므로, 앱의 크기를 줄이고 관리가 용이합니다.**3. 빠른 통합과 사용**: npm과 같은 패키지 매니저를 사용하지 않기 때문에, 필요한 컴포넌트를 빠르게 찾아 바로 사용할 수 있습니다.|












