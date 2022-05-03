## 웹팩을 학습하기 위한 저장소 입니다.

## 유데미 인강따라하기 입니다.

## intro

- 웹팩은 번들링과 최적화 위해 사용한다.
- [웹팩설치](https://webpack.js.org/guides/getting-started/)
- 웹팩은 기본적으로 import export 문법 즉 es6 문법을 지원한다.
- 코드 다 치고 npx webpack 하면 알아서 번들링 되면서 dist 폴더라 생긴다
- 기본 설정 : entrypoint(/dist/main.js), 기본 진입점(src)
- npx webpack --stats detailed 치면 엔트리포인트와 시간 정보들이 다 나온다.
  - 이게 싫으면 script 로 webpack 만들어주자.
- webpack.config.json 으로 경로 등 설정 을 바꿀 수 있다.
  - entry, output(path 등을 사용한 절대경로, filename, path), mode

## asset란?(그림 폰트 간은것)

- asset 종류(resource,inline(8kb 이하 인 경우),asset(앞에 둘이 섞은 것),source(파일))
- 8kb 란 기준은 변경 할 수 있다.
