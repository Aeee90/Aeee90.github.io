---
layout: post
title:  "HTTP Headers"
author: Aeee
date:   2018-09-01 14:39:49 +0900
categories: Http
tags: HTTP Header API
image: /assets/images/http.gif
---

# HTTP Headers
 API Server에서 제공해야 하는 Headers
 
## General Headers
 1. Accept: 서버에게 서버가 보내도 되는 미더어 종류를 말해준다.
 2. Accept-Language: 서버에게 서버가 보내도 되는 언어를 말해준다. Multi-Language를 지원해야하며, Response가 Tailoring된 경우, “Content-Language” Header를 사용하는 것을 권고한다.
 3. Accept-Encoding: 압축 알고리즘을 지원할 경우, 서버에게 서버가 보내도 되는 Encoding을 말해준다.
 4. Accept-Ranges: 서버에게 부분 요청을 한다. 부분 Request/Response를 지원할 경우 제공한디.
 5. Content-Range: 응답 헤더는 전체 바디 메세지에 속한 부분 메세지 위치를 알려준다. 분 Request/Response를 지원할 경우 제공한디.
 6. Connection: 클라이언트와 서버가 요청/응답 연결에 대한 옵션을 정할 수 있게한다. Persistent Connection TCP 연결을 지향한다.
 7. Content-Length: Entity Body의 크기를 말한다. Entity Body를 지원할 경우 제공되어야한다.
 8. Content-Type: Entity Body의 종료를 말한다. Entity Body를 지원할 경우 제공되어야한다.
 9. Date: 메세지가 언제 만들어졌는지에 대한 날짜와 시간을 제공한다. Date Header Value는 Static Resource의 경우 서버에 저장된 시간으로 하며, Dynamic Resource의 경우 최종 생성된 시간으로 전달한다.
 10. Host: 요청의 대상이 되는 서버의 호스트 명과 포트를 준다.
 11. User-Agent: 브러우저 종류를 명시행한다.
 
## Content-Dsiposition Headers
 1. Content-Disposition: 컨텐츠의 디스플레이 방식을 명시한다. inline, attachment, form-data 등.
 
## Cache Control Related Headers
 - Validation Check후 데이터가 변경되지 않았다면 “304 Not Modified”를 반환해야 한다.
 1. Expiration/Validation Model: 캐쉬 할 경우 자원에 대한 캐쉬 업데이트 주기를 명시행한다.
 2. Cache-Control: 캐싱 메커니즘을 지시자로 제공한다. no-cache를 제공한다.
 3. max-age: Cache-Control 지시자로, 요청시간으로 부터 최신 상태로 판단할 시간이다. Expires와 중복 사용하지 않는다.
 4. Expires: Resource에 대해 최시 상태 기한 날짜이다. max-age랑 중복사용하지 않는다.
 5. must-revalidate: 재로드 및 요청 시, 리소스를 강제로 validate하도록 한다. 강제 캐쉬삭제를 위해 지원해야한다.
 
 ## Cookies
 1. Set-Cookies: Response가 쿠키정보를 저장한다.
 2. max-age: 쿠키의 유효시간을 명시한다. Cookie Life-time 설정 중 기본으로한다.
 
 ## Pipeling
 - 파이프 라인을 지원해야한다. <span style="color:red">(프록시 서버 버그 및 HOF 때문에, 굳이 기본으로 지원 안 해도 될것 같다.)</span>

 

  


  