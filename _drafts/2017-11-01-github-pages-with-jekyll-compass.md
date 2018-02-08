---
layout: post
title:  "Compass를 결합한 Jekyll로 GitHub Pages 블로그 만들기"
author: Kyle
date:   2017-11-01 05:44:28 +0900
categories: development
tags: gitHubPages jekyll compass css3 blogMaking
image: /assets/images/default_post_development.png
---
### 예전에 한번 도전했었다.
framework에 대한 이해를 하나도 가지지 않을 상태에서 도전했던 Jekyll과 GitHub Pages. 이제 어느정도 혼자 구조를 볼 줄 알고, 잡을 줄 알기 시작하면서 직접 만들어 보기도 하고 있는 블로그를 써보기도 했다.

이미 만들어져 있는 블로그 툴들은 뭔가 어딘가 조금씩 맘에 들지 않았다. 워드프레스를 써보기도 했고 직접 짜보기도 했고 브런치나 네이버 블로그 같은 서비스를 이용해보기도 했다.

뭔가 맘에 들지 않았다. 항상 디자인을 조금씩 고치게 되고 사용성을 고치게 되고 이것저것 만지게 되었다. 그래서 또 직접 만들어 보기로했다. 이번엔 훨씬 간단한 구조를 가지고 있고 호스팅 관리도 필요없는 걸로!

GitHub Pages에서 Jekyll을 지원하기 때문에! 너무나 단순한 이유로 Jekyll로 구현해본다.. 이미 잘된 플랫폼을 사용하는 건 시간과 비용을 아끼는 최선의 방법이기에..

Jekyll에서는 기본적으로 Sass 컨버팅이 제공되지만 Jekyll과 Compass를 결합해서 디자인 구현(쉽고 빠르게 있어보이게 만들기)도 용이하고 관리도 용이한 블로그를 만들어 보기로 했다!

쉽고 빠르게!가 목적이기 때문에 본 포스팅도 슥슥 따라하면 블로그가 뚝딱! 할 수 있도록 최대한 상세하고 따라하기 쉽게 설명해보려 한다.

* 주의: 맥을 사용하고 터미널을 사용함.
* 주의2: CUI에 뭐 치는거 좋아함.