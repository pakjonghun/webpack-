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

## asset란?(그림 폰트 같은것)

- asset 종류(resource,inline(8kb 이하 인 경우),asset(앞에 둘이 섞은 것),source(파일))
- 8kb 란 기준은 변경 할 수 있다.
- type: "asset", 이렇게 해놓으면 알아서 8kb 기준으로 리소스로 하거나 인라인으로 하더나 자동으로 한다.
- parser>dataUrlCondition>maxSize 에서 8kb 대신 다른 사이즈로도 변경 가능하다

```
 {
        test: /\.(png|jpg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
```

### asset/resource

- 그대로 파일 하나 더 복사하는데 파일명은 해쉬화된다. md4 해쉬라고 함.
- webpack5 부터 publicPath 가 dist 폴더로 자동으로 설정된다. 이게 싫으면
  - publicPath: "/Users/jeonghunbag/project/basicLec/web-pack/dist/", 이런식으로 해주면되는데
  - 이미지에서 오른쪽마우스 클릭 해서 pathcopy 해서 경로를 갖고오면 편한다.
  - 단 어플과 정벅파일과 동일한 도메인에 있는경우만 가능하다(즉 집에서 개발할때 가능함)
  - 파일 넣어놓은 url 이 별도로 있을 수 있을때 이 기능을 사용 해야 하며
  - 꼭 뒤에 / 를 빼먹지 말아야 한다.publicPath: ".../",<---/ 빼먹으면 안됨.
  - src 에 들어간 이미지가 publicPath 를 갖게 된다.

### asset/inline

- 파일을 별도로 생성하지 않는다.
- base64 생성해서 js 파일에 넣어버린다.
- 대용량 파일도 inline 할 수 있지만 안하는게 번들링 최적화에 더 유리하다.
- 작은 아바타 파일 여러개 같은경우 인라인으로 하는 것이 유리하다.
