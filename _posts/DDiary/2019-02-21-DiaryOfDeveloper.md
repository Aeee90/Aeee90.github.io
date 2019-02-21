---
layout: post
title:  "서버 구성 for Personal Project"
author: Aeee
date:   2019-02-21 14:39:49 +0900
categories: Personal Project
tags: Member Server Structure
image: /assets/images/diary.jpeg
---

# Project Member
Member란 회원관리를 할 수 있는 웹 어플리케이션이다. 먼저 API 서버를 만들기도 했다. 회원에 
대한 api를 제공도 해야하지만, 이 서버에서 가장 중요한 것은 회원의 로그를 어떻게 남기는 것이다. 
회원은 다른 서버에서도 인증되어 다른 서비스를 사용해야하는데, 서버가 분리되어 있는 시점에서 어떻게
인증하고 성능 이슈 없이 관리되는게 주 목표이다.

## GCP(Google Cloud Platform) - Compute Engine, VM Instance
서버 플랫폼은 GCP를 사용한다. 그 이유는 다음과 같다.
- 1년 공짜이다.
- 개인 프로젝트라 공짜면된다.
- 트래픽이 나 밖에 없어서 공짜면된다.
- 자동결제가 기본이 아니다.
- AWS가 자동결제가 기본이라 무섭고 싫다.
그리고 서버 구성은 로드밸렁싱 및 보안을 책임질 access 서버, api 서버가 동작할 web application sever,
Database를 사용할 db server로 구성했다. 추후에 더욱더 확장 할 생각이다.

## 서버구성
<img src="/assets/images/diary/server_structure.png" width="100%" />

- access: 모든 요청을 관리한다.(거의 로드밸런서 역할을 하지 않을까싶다. L4, L7은 사치니 소프트웨어로...)
- v_member: 회원을 가입하고, 회원 로그 및 활동 통계를 볼 수 있는 view를 제공하는 서버이다.
- a_member: 회원의 데이터를 처리하는 api서버이다.
- d_memeber: 실제 회원들의 데이터가 저정되는 서버이다.
각 서버간의 통신은 http or https로 할 수도 있고, 개발하면서 정하자. 