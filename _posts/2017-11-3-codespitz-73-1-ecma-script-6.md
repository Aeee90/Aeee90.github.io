---
layout: post
title:  "[CodeSpitz73-1] ES6+ 기초편 1회차 정리!"
author: Kyle
date:   2017-11-03 17:27:49 +0900
categories: development
tags: ECMAScript6+ javacript language basic
image: /assets/images/js_800x800-619x619.jpg
---
# 제대로 된 프로그래머가 되기 위한 길..
지금부터 6주간 쓸 글은 내가 사용하는 프로그래밍 언어에 대한 기초 지식을 다시 쌓는 과정이며,
자만심을 버리고 겸손함을 되새기는 시간에 대한 기록이다.
이 스터디는
모든 코드에는 이유가 있어야한다.
프로그래머는 훌륭한 (자신의 코드에 대해)기획자가 되어야 한다.
라는 철학(?)을 갖고 공부할 수 있게 길을 열어준 나에게는 빛과 소금같은 스터디이다.  

## 실제 프로그래머가 된다는 것은?
1. 나의 코드는 복잡성을 감당할 수 있다.
2. 내가 만든 프로그램을 수정한다고 해도 금방 수정할 수 있다.

### 컴퓨터란 무엇인가? 프로그램이란 무엇인가?

## 프로그램이란?
코드가 메모리에 적재되어 실행할 수 있는 하드웨어 안의 소프트웨어를 의미한다.

## Program & Timing(프로그램의 생명주기)
1. Language Code: Lint Time
2. Machine Language: Compile Time
3. File
4. Load
5. Run: Run Time
6. Terminate

## RunTime중에도 추상화로 의미론적인 관리가 가능하다

### 프로가 되기 위한 방법 중 하나: 격리
코드를 짤 때 격리를 인식하면 코드를 잘 짜게 된다.

## Lexical grammar

1. Control character 제어문자
2. White space 공백문자
3. Line terminator 개행문자
4. Comments 코멘트
5. Keyword 예약어
6. Literals 리터럴

## Language element

### Statements 문
공문, 식문, 제어문, 선언문		단문, 중문
### Expressions 식 = 값으로 수렴될 수 있는 것
값식, 연산식, 호출식
### Identifier 식별자(변수, 상수의 상위개념)
기본형, 참조형		변수, 상수

값은 저장하지 메모리에서 즉시 휘발되어 사라짐. => 무의미한 값으로 표현이 되어버림.

### 변수를 뭐라고 설명할 것인가? 
1. 메모리의 주소의 별명.
2. 값(또는 데이터)의 타입을 갖고 있다.

### 읽어보면 좋은 책
토마스 쿤 - 과학혁명의 구조

복잡성을 정복하고 수정 가능성을 확보 하는 것.
세미콜론의 정체는 무엇일까?

문(expression)의 정체는 뭐지? => 엔진이 어떻게 처리할지 힌트를 주는 것.
어디가 문이고 어디가 식이지? 개발자가 정함
자바스크립트에서 함수는 값이지만 자바에서는 함수가 문

### Statement
1. 공문: 실수를 너무 많이 하니까 인정해줌 ex) ;;; // 공문 세개
2. 식문: 하나의 식은 하나의 문이 될 수 있다. ex) 3;4;5;
3. 제어문
4. 선언문
5. 자바스크립트에서는 단문이 올 수 있으면 중문이 올 수 있음. 브라켓으로 묶어 줌.

## 우리가 쓰고 있는 컴퓨터는 폰노이만 머신!

## 연산자 우선순위는 사전지식에 의존하기 때문에 매우 나쁜 코드이다.
함수로 교체가 가능하면 함수로 바꾸거나 괄호를 사용하여 명시적인 코드를 만들어 준다.

## Sync flow
연산자 우선순위 외우지말고 자만하지 말고 괄호치자.
프로그램은 고정되어 있지만 입력 값에 따라서 다르게 작동하는 프로그램을 만들고 싶을때
Sync Flow Control => Sub flow
한세트가 진행되는 것을 루틴이라고 부름.
폰노이만 머신에서는 루틴에 진입하면 끝까지 실행된다.

ES6+에서는 플로우(루틴) 제어가 가능하다.

## Artificial language는
사람의 복잡한 의도와 생각을 표현하기 위해 제어문이 다양함이 존재한다.

### if문 다음에는 공백문자가 올 수 있다.

## if문의 정확한 문법
if공백문자(식) 문 또는 {중문}

## if문과 if else문의 의미
If문이 표현하는 건 if문 뒤에 있는 것이 optional
If else는 이거 아니면 이거라서 mandatory(2지선다)

```javascript
if ( ex ) { st }
if ( ex ) { st } else { st }
if (true) 3 else 5; // error!
if (true) 3; else 5;
if (true) { 3; } else { 5; }
```

```javascript
let a = true;
if (a) console.log('ok');
else console.log('hello');
```