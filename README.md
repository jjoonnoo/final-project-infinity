### 사용시 유의사항
- **각자 브랜치 생성**
- **진행중 변경점은 각자의 브랜치에 push 이후 dev에 pull requests통해 merge 할 것**
- **주의 사항 main은 건들지 않기로 했으니 pull requests 할 때 유의할 것**
- **커밋 전에**:```npm run prettify```
- **dev 브랜치에서 pull 받기 전에**: ```git remote update```
- **dev 브랜치에서 pull 받고 정상적으로 실행이 안 되는 경우**: ```npm install```
- **회의때 마다 pull request 할게 있다면 얘기하기**
- **파일명은 camel case ex) productDetail.html**
- **변수명은 snake case ex) product_name**
- **클래스와 같은 것들은 pascal case ex) UserRepositoy**
- **되도록 const를 활용할 것**
- **폴더는 복수형을 띄고 파일은 단수형을 띈다 ex) 폴더 -> routes, 파일 -> user.route.js**

# infinity(인피니티) 8조

- **프로젝트명**: BNS(Bid&Sales)
- **프로젝트 기간** : 2023.02.27. ~ 2023.04.03.

# 폴더 구조
```
+---config
+---controllers
+---middlewares
+---migrations
+---models
+---node_modules
+---public
|   +---css
|   +---js
+---repositories
+---routes
+---seeders
+---services
+---views
    +---layouts
    +---partials
```
# HTTP CODE
- **200 OK요청이 성공적으로 되었다.**
- **201 created create가 성공적으로 되었다.**
- **400 bad request 요청 자체가 잘못되었다.**
- **401 unauthorized 승인되지 않았음**
- **403 forbidden 클라이언트는 권한이 없다**
- **404 not found 요청받은 것을 찾을 수 없음**
- **408 request timeout 요청한지 오래되어 연결이 끊김**
