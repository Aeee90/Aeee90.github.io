---
layout: post 
title: "Reactive X 정리" 
author: Aeee 
date: 2019-02-14 16:31:00 +0900 
categories: ReactiveX
tags: ReactiveX Observer Iterator Kotlin Java

image: /assets/images/reactiveX.png
---

# ReactiveX 란?
ReactiveX는 공식 홈페이지 소개란(http://reactivex.io/intro.html)에 다음과 같이 정의되어 있다.<br/>
**ReactiveX is a library for composing asynchronous and event-based programs by using observable sequences.**<br/>
비동기와 이벤트 기반의 프로그램에서 사용하는 라이브러리이다. 그리고 다음과 같은 상황을 해결하는데 장점이 있다고 명시되어 있다.
- Observables Are Composable
- Observables Are Flexible
- Observables Are Less Opinionated
- Callbacks Have Their Own Problems
- ReactiveX Is a Polyglot Implementatiom
이러한 상황들을 어떻게 풀어낸것에 대해서 자세히 이야기했으면 좋겠지만, 하루동안 본 모든걸 파악할 수
있는 레벨이 아니다보니.... 그래서 전체적인 구조를 파악하고 싶었고, 공부했던 패턴으로 정리해보았다.

## ReactiveX 속의 Observer Pattern
그럼 ReactiveX에서 Observer Pattern을 어떻게 구현하였을까? 먼저 아래 코드의 rxJava에서 구현된 Observer Interface를 보자.
```java
package io.reactivex;

import io.reactivex.annotations.NonNull;
import io.reactivex.disposables.Disposable;

public interface Observer<T> {
    void onSubscribe(@NonNull Disposable d);
    void onNext(@NonNull T t);
    void onError(@NonNull Throwable e);
    void onComplete();

}
```
옵서버 패턴에서는 Subject 인터페이스에서 subscribe한 observer을 관리하며, subscribe와 unsubscribe의 책임이 있다.
또한 어떠한 이유로 subscribe한 observer에게 업데이트를 하도록 notify하는 책임이 있다. 그런데 ReactiveX의
Observer Interface는 기존에 옵서버 패턴과 다르다.<br/>

**ReativeX에서는 Observerable Class가 Subject 이고 Observer Interface가 Observer이다.**<br/>

간단한 코드 예제를 보면서 위에 풀어가보자.

```kotlin
val observer1: Observer<String> = object: Observer<String>{
    override fun onComplete() {
        println("observer complete! 1")
    }

    override fun onError(e: Throwable) {
        println("observer onError! 1")
    }

    override fun onNext(t: String) {
        println("observer onNext at observer1. Value is $t")
    }

    override fun onSubscribe(d: Disposable) {
        println("observer onSubscribe! 1")
    }
}

val observer2: Observer<String> = object: Observer<String>{
    override fun onComplete() {
        println("observer complete! 2")
    }

    override fun onError(e: Throwable) {
        println("observer onError! 2")
    }

    override fun onNext(t: String) {
        println("observer onNext at observer2. Value is $t")
    }

    override fun onSubscribe(d: Disposable) {
        println("observer onSubscribe! 2")
    }
}

val psub = PublishSubject.create<String>()
psub.subscribe(observer1)
psub.subscribe(observer2)
psub.onNext("cpItem1")
psub.onNext("cpItem2")

psub.onComplete()

psub.subscribe(observer1)
psub.onNext("cpItem4")
psub.onComplete()
```
위에 코드 결과는 다음과 같이 나올 것이다.<br/>
```console
observer onSubscribe! 1
observer onSubscribe! 2
observer onNext at observer1. Value is cpItem1
observer onNext at observer2. Value is cpItem1
observer onNext at observer1. Value is cpItem2
observer onNext at observer2. Value is cpItem2
observer complete! 1
observer complete! 2
observer onSubscribe! 1
observer complete! 1
```
위에 코드는 다음과 같이 동작하게 된다.
PublishSubject 객체를 만든다. observer가 **subscribe**를 하게 되면 subscribeActual 통해
observer를 PublishDisposable 객체에 담고 PublishDisposable array에 추가하게된다. 그럼
여기서 PublishSubject가 기존 옵서버패턴의 Subject라 하고 구독한 observer을 옵서버패턴의 
observer라 해보자. PublishSubject는 observer을 PublishDisposable<>[] subscribers
라는 배열에 담아 관리하게 된다.

subscribers에 observer1과 observer2를 가진 크기2의 배열이 된다. PublishSubject
에서 데이터가 들어오면 subscribe한 observer한테 알려야한다. 이 PublishSubject도 reactiveX의
Observer Interface를 impletements하기 때문에 onNext를 통해서 데이터를 받아들이고, subscribers에
**notify**하게 된다.

그러면 옵서버 패턴 Subject의 notify 추상 메소드와 옵서버 패턴 Observer의 notify가 ReactiveX
Observer Interface의 onNext로 구현되었다는 것을 알수 있다. 그리고 옵서버 패턴의 registObserver와
removeObserver는 각각 ReactiveX ObservableSource Interface의 subscribe와 
ReactiveX Disposable을 통해 구현되게 되어있다. 

정리를 하면, 옵서버 패턴은 Observer를 등록하고 제거하며 notify하던 책임을 한 인터페이스에 있다. 하지만
ReactiveX는 이 세가지 행동에 대해서 각각 ObservableSource, Disposable, Observer Interface로
책임을 나누었다.

## ReactiveX 속의 Iterator Pattern
Iterator 패턴은 onNext를 통해서 이루어진다. Iterator를 처리하는 로직을 함수로 받아서 onNext를 구현한
Observer Interface를 구현한다. 그러면 로직은 observer가 되어 Subject로 push된 데이터를
소비하게 된다. Iterator 패턴의 next 추상 메소드는 onNext라 볼 수 있겠지만, hasNext에 해당
되는 추상 메소드를 찾을 수가 없다. 그래서 Iterator 패턴은 참조만 한게 아닌가 싶다.

## 다양한 Functions
ReactiveX에서는 다양한 기능들을 어떻게 구현되고 동작될까? Ovservable Class는 다양한 방식으로 
동작하는 Subject들을 만드는 statice method들이 있다. static method들를 통해서 
Observable Class를 상속받아 subscribeActual 추상 메소드를 구현한 
PublishSubject, ConnectableObservable, ObservableCreate 등을 제공한다. 

각 Subject들은 Observable Class를 상속하여 subscribeActual이라는 추상메소드를 구체화한다.
이 subscribe를 호출하면 실제 Observable클래스의 subscribe 메소드가 호출되며, 이 메소드에서
다시 구체화된 subscribeActual을 호출하게 된다. 다양한 팩토리 메소드들로 구체회된 Subject 제공한다.

마찬가지로 filter, map, reduce등의 메소들은Obserable의 추상메소드 subscribeActual를 구현e된다.
중간에서 개입되는 filter, map, reduce 같은 객체들은 AbstractObservableWithUpstream인터페이스를 
통해 상위의 Subject객체를 알고 있다. 그리고 subscribe한 observer는 현제 객체에서 관리한다.


## 정리
Subject는 Observable Class를 상속받아 구현되고, Subject 들이 부모를 참조하여 꼬리를 물고 
있다. Observer는 Observer Interface를 통해 구현되며, Disposable Interface를 구체화한
객체가 참조한다. 그리고 Subject에서 Disposable Interface 구체화한 class를 배열로 관리하며
배열을 통해 데이터를 각 Observer에게 push하게 된다.

이러한 구조는 각 Async한 로직을 한 Subject로 취급하여, 연속적인 Subject를 제공한다. 그리고
상위의 Subject들이 해소되어야만 하위의 Subject에게 Data를 Push한다. 비지니스 로직을 메소드 체인
형태로 표현하기 때문에 가시성의 이점을 얻을 수 있다.

## 마무리
다양한 Subject들이 제공되며 기능이 엄청 많다. 그리고 성능은 어떻게 유지시키는지, 비동기 로직에 대해서
어떻게 처리하는 지도 의문이다. 그리고 Subjejct와 Observer사이의 생산과 소비 속도에 차에 의한
해결법 등이 많은 것 같다. 아직 ReactiveX의 숙력도가 낫지만, 추후에 성능, 사용방법 등에 대한 다른
관점에서도 파헤쳐 볼 것이다. 


