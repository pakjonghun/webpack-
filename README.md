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

- asset 종류(resource,inline,asset(앞에 둘이 섞은 것 8kb 기준으로 나뉨),source(파일 그대로))
- 8kb 란 기준은 변경 할 수 있다.
- type: "asset", 이렇게 해놓으면 알아서 8kb 기준으로 리소스로 하거나 인라인으로 하더나 자동으로 한다.
- parser>dataUrlCondition>maxSize 에서 8kb 대신 다른 사이즈로도 변경 가능하다
- output 에 assetModuleFilename: 'images/[hash][ext][query]' 로 폴더 위치 추가 가능하다. [doc](https://webpack.js.org/guides/asset-modules/#custom-output-filename)

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

  ```
  const path = require("path");

  module.exports = {
    entry: "./index.js",
    output: {
      filename: "build.js",
      path: path.join(__dirname, "public"),

      //빌드되는 폴더에 이미지 폴더를 따로 만들어 줄 수 있다.
      assetModuleFilename: "img/[hash][ext][query]",

      //쓸데없는 파일은 지워줄 수 있다.
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.jpg$/,
          type: "asset/resource",
        },
      ],
    },
  };

  ```

### asset/inline

- 파일을 별도로 생성하지 않는다.
- base64 생성해서 js 파일에 넣어버린다.
- 대용량 파일도 inline 할 수 있지만 안하는게 번들링 최적화에 더 유리하다.
- 작은 아바타 파일 여러개 같은경우 인라인으로 하는 것이 유리하다.

### asset/source

- 파일을 별도 생성하지 않는다
- 소스파일 그대로 텍스트가 있으면 텍스트 그대로 js 파일에 가져와서 사용한다.
- txt 에 문자 열 입력해 놓고 다른 js 파일에서 import 해서 변수로 사용할때 아래와 같이 사용하면 잘 작동한다.

```
//alt.txt
alt

//js file
import alt from "./alt.txt;

//webpack.config.js
{
  test: /\.txt/,
  type: "asset/source",
},

```

## Loader

- 로더는 asset 로 처리 안되는 확장자 처리용 이다.(css scss 등등)
- 로더는 asset 와 다르게 내장되어 있지 않으므로 별도로 설치 해줘야 한다.
- 로더는 use 속성을 사용한다.
- css 같은경우 일반적으로 우측 로더부터 실행되며

```
//css-loader 가 css 파일을 읽는 녀석이고
//style-loader 가 스타일을 적용하는 녀석이다.
{
  test: /\.css/,
  use: ["style-loader", "css-loader"],
},
```

```
//sass 사용 예시 왼쪽부터 sass로 css 로 변환하고 css를 다시 불러와서 스타일을 입혀준다 왼쪽부터 오늘쪽으로
{
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
},
```

- js 최신문법(아직 브라우저에서는 지원 안하는 것들)을 웹팩을 통해 파싱 시킬 수도 있다.

```
//use 안에 로더만 넣는 것이 아니라
//로더 에 옵션을 넣어주어하며 사용하는 플러그 인도 정해서 넣어 줄 수 있다.
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
    },
  },
```

## plugin

- plugins 플러그인 엄청 많다 [doc](https://webpack.js.org/plugins/)

- 단순 로더 외 더 많은 일을 할 수 있는 도구다. 이를테면 번들 사이즈 크기를 더 작게하거나 여러개로 나누어 번들링 하거나 등등.

### terserPlugin

-[doc](https://webpack.js.org/plugins/terser-webpack-plugin/)

- production 모드에서는 terserplugin 이 포함되어 있다.
- webpack 5 에서 기본으로 적용하고 있으나 실제 설치해서 사용하니 용량이 더 줄긴 했다
- 번들파일 용량이 많이 줄일 수 있다.
- terser-webpack-plugin

```
const TerserPlugin = require("terser-webpack-plugin");

plugins: [new TerserPlugin()],
```

### MiniCssExtractPlugin

- [doc](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)
- 이플러그 인을 사용하면 css 파일을 캐슁 할 수 있어서 스타일이 변하지 않는한 다시 다운받지 않아서 화면이 깜박이는 문제를 해결 할 수 있다
- css 파일을 별도로 분리 할 수 있다(이거 왜 하냐면 다이나믹 번들링 하려고 하는거다.)
- 파일이름을 설정 할 수도 있으며, 로더에 별도로 추가를 또 해줘야 한다.
- 또 이 파일을 별도로 html 에 포함해줘야 한다.

```
//임포트
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//로더에 추가 style-loader 대신 MiniCssExtractPlugin.loader 를 사용함.
{
  test: /\.scss$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
},

//plugin 에 추가
new MiniCssExtractPlugin({
  filename: "abc.css",
}),
```

## webpack.provide

- 굳이 임포트 하지 않아도 글로벌하게 라이브러리를 사용하게 하는 내장플러그인
- webpack.providePlugin 에서 꺼내 쓰면된다.

```
// d 라는 이름은 date-fns 를 default 로 임포트 한 객체가 된다.
new webpack.ProvidePlugin({
  d: "date-fns",
}),

```

## broswer caching

- 파일이름!! **이름** 을 캐슁해서 이름이 다른것만 다시 다운로드 함
- 이름은 파일 내용이 변경되었을때 발생함 웹팩에서(파일이름에 [contenthash] 추가하면됨.
- js css 등등 다 가능

```
filename: "bundle[contenthash].js",
 new MiniCssExtractPlugin({
      filename: "abc[contenthash].css",
    }),
```

## html-webpack-plugin

- [doc](https://webpack.js.org/plugins/html-webpack-plugin/#root)
- html 파일도 생성 해주는 플러그인이다 단일 또는 멀티 로 생성 할 수 있다.
- minify 속성에 false 경우 번들링이 프리티어가 적용된 상태로 된다.
- 위와 같이 파일명을 해쉬 해버리면 html 에서 읽을 수 있게 자동으로 script link 를 바꿔준다.
- public path 에서 dist 까지 없애고,
- 웹팩에 있는 html 파일만 있으면 되니까 root 에 html 까지 지우면 완벽하다

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
//아래와 같이 타이틀이나 메타태그 심지어 파일 이 들어갈 폴더까지 커스텀 가능(폴더 지정해줄 경우 publicPath 수정이 필요함)
new HtmlWebpackPlugin({
  title: "origin",
  filename: "sub/iiinnndddeeexxx.html",
  meta: {
    description: "desc",
  },
}),

```

## purgecss-webpack-plugin

- [doc](https://www.npmjs.com/package/purgecss-webpack-plugin)
- 사용하지 않는 css 없애는 플러그인
- glob 폴더 안에 사용하는 파일 필터링 하는 라이브러리 인데 같이 사용한다고 한다.

```
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");

const PATHS = {
  src: path.join(__dirname, "src"),
};
new PurgeCSSPlugin({
  //nodir 은 glob 사용방법임..
    paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
  //배열에 포함된 것은 그냥 살려준다.(다이나믹하게 콜백으로도 전달 가능)
    safelist:["remain-class"]
  }),
```

## copy-webpack-plugin

- html 에 img 태그에 경로가 "./img/a.png" 로 되 있다.
- 빌드 해봤자 html 에 들어있는거라 경로는 계속 안바뀐다.
- 그래서 폴더 구조를 build 된 곳에 똑같이 만들어 줄 필요가 있을때 사용하는 플러그 인이다.

```
new CopyPlugin({
  patterns: [
    {
      //원래 경로에 복사할 녀석을들 선택한다.
      from: path.join(__dirname, "src", "assets/*.png"),

      //어디다가 복사할지 알려준다.
      to: path.join(__dirname, "dist"),

      //중간에 빼고 싶은 기준 을 알려준다 src 는 없어도 됨.
      context: "src",
    },
  ],
}),
```

## clean-webpack-plugin

- [doc](https://www.npmjs.com/package/clean-webpack-plugin)
- 웹팩 다시 번들링 시 알아서 기존파일 삭제하는 플러그인
- 삭제할 파일명 패턴도 정해줄 수 있다.

```
//폴더 파일 싹다
new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ["**/*"],
}),

//위와 동일하지만 이런식으로 외부에 있는 폴더 파일도 없애 줄 수 있다.
new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ["**/*", path.join(__dirname, "dist/**/*")],
}),
```

## mode

- 각 모드에 맞는 최적화를 제공한다(4 부터 사용가능)
- production|development|none
- 자동으로 dotenv 사용가능
- 각 모드별 config 파일을 따로 만든 다음에 스크립트로 관리 할 수 있다.

```
"build": "webpack --config webpack.production.config.js",
"dev": "webpack --config webpack.development.config.js"
```

### production

- producton 모드는 오류 발생시 어디서 오류 떳는지 알기 힘든다(번들링 되서 압축 되 있어서 그렇다)
- production 모드에서는 terserplugin 이 포함되어 있다.

## development

- 디버깅이 쉽다 source-map
- broswer-caching 할 필요가 없다.
- 역시 terserplugin 은 굳이 쓸 필요가 없다.
- 그러면 파일을 굳이 나눌 필요도 없다.(extrace css 없어도 됨.)

## dev-server

- development 에서 이용할 개발용 서버
- static path 를 주면 그 안에 있는 index.html 을 자동으로 읽고 다른 것을 읽도록 커스텀도 가능하나
- script 나 link 의 경우 경로가 하위 경로 여야 읽어 진다.

```
devServer: {
    static: {
      //html 파일 있는 폴더를 가르키면 여기서 script 하고 다 읽는다
      //절대경로 이며, output path 를 넣으면 됨.
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      index: "abc.html",
      //말그대로 캐슁 하지 않고 디스크에 쓴다는 이야기 이거 해 놔야 혼란이 없다고 설명을 들음.
      writeToDisk: true,
    },
    port: 9000,
  },


//script 굳이 안써도 핫 리로드 된다(html 수정시는 리프레쉬, 데이터 수정시는 자동) --hot
//--open 알아서 창도 열린다
"dev": "webpack serve --config webpack.development.config.js --hot --open"
```

## Multi page 분할 방법

```
//엔트리가 여러개 가 될수 있다 멀티 페이지 일 경우
//이때 각 key 값이 output의 [name]이 된다.
entry: {
    hellow: "./src/index.js",
    img: "./src/index2.js",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    publicPath: "",
  },
```

```
//또 다른 예문 html plugin 옵션을 잘 보자 .
//template 는 원본 html 을 가르키고
//chunks 는 주입할 js파일을 가르킨다.

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    product: "./src/products.js",
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
      chunks: ["index"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "products.html"),
      filename: "product.html",
      chunks: ["product"],
      inject: true,
    }),
  ],
  devServer: {
    static: "./build",
  },
};

```

- css 분할도 마찬가지다.

```
new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css",
}),
```

- 분할 html 은 아예 htmlplugin 객체를 필요한 만큼 만들면 된다.

```
//이름 과 청크(포할될 js 번들 이름<-- 이건 변수가 아니라 "string" 이 되야하며 entry name 과 동일 해야 한다.>, 등이 포함되면 된다.)
new HtmlWebpackPlugin({
  title: "origin2",
  chunks: ["index2"],
  filename: "sub/index.html",
  meta: {
    description: "desc2",
  },
  minify: false,
}),
```

## optimization 라이브러리 사용시 최적화

- webpack-bundle-analyzer : 각 모듈 라이브러리 크기를 gui 로 알려주는 plugin
- 라이브러리를 그냥 사용하고 아무 설정 안하면 모든 번들링 파일에 라이브러리가 포함된다. 비효율적
- 아래 설정 하면 라이브러리는 별도 번들링 되어 캐슁되어 재활용 된다. 개 효율
- 아래 설정을 하면 html 파일 에 꼭 필요한 곳에만 script(라이브러리 연결)이 생성된다.
- 아래 옵션은 30kb 초과시에만 공통 종속성을 추출한다. 하지만 minSize 로 변경 할 수도 있다.
- [doc](https://webpack.js.org/plugins/split-chunks-plugin/)

```
const BundleAnalyzerPlugin =
require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

plugins:[
  new BundleAnalyzerPlugin(),
]


//최적화 방법 webpack5 버전부터
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize:1024*3   //3kb 너머갈때만 공통 의존성으로 추출한다.
    },
  },
```

## dynamic import

- 필요할때만 정크를 가져오게 하는 방법이다
- 처음부터 임포트 해서 글로벌하게 다 갖고 오지 않고
- 이벤트가 일어났을때 임포트를 비동기로 처리 해 준다.

```
//웹팩에서 처리할 정크 이름은 modal 이라는 뜻이다
import(/* webpackChunkName: "modal" */ "./components/modal").then(
    (module) => {
      const showModal = module.default;
      showModal();
      $("#myModal").css("display", "block");
    }
  );
```

## tree shaking

- js 파일에서 나무흔들기 안쓰는 것 없애주기!!(함수 라이브러리 등등 모두 포함)
- 개발모드에서는 의미없음 프로덕션에서 해줘야 유의미함.
- 방법은 그냥 프로덕션 모드로 실행하면 알아서 된다. ㅋㅋ

## mode 별 파일 분할

- webpack.config.common.js
  - entry output provide optimization
- webpack.config.dev.js
  - devserver devenv analyzer
- webpack.config.prod.js
  - copy mini purge

## webpack-merge

- 파일을 종류별로 분할 후 merge 는 webpack-merge 를 이용한다.
- 그리고 종류별 스크립트 만들어 주면 세팅끝(데브는 알아서 빌드 하면서 서버까지 킨다)

```
"dev": "webpack --config webpack.config.dev.js",

//serve 안해도 dev 실행 하면 알아서 서버 켜진다.
"serve": "webpack serve --config webpack.config.dev.js --open",
"prod": "webpack --config webpack.config.prod.js"
```
