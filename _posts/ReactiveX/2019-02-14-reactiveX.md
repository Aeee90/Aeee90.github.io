---
layout: post 
title: "Reactive X 정리" 
author: Aeee 
date: 2019-02-14 16:31:00 +0900 
categories: ReactiveX
tags: ReactiveX Observer Iterator Kotlin Java

image: /assets/images/reactiveX.jpg
---

# ReactiveX 란?
ReactiveX는 공식 홈페이지 소개란(http://reactivex.io/intro.html)에 다음과 같이 정의되어 있다.
ReactiveX is a library for composing asynchronous and event-based programs by using observable sequences.
비동기와 이벤트 기반의 프로그램에서 사용하는 라이브러리이며, Obsever 패턴에 의해서 데이터에 반응할 
수 있는 구조를 만들 수 있다. 또한 비동기 로직들을 다룰 때, 콜백지옥에서 벗어날 수 있도록 하는 이점이 
있다.

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

**Reative에서는 Observerable Interface가 Subject or Observer이기 때문이다.(?)**<br/>

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
PublishSubject 객체를 만든다. observer가 **subscribe**를 하게 되면 subscribeActual 통해
oberser를 PublishDisposable 객체에 담고 PublishDisposable array에 추가하게된다. 그럼
여기서 PublishSubject가 기존 옵서버패턴의 Subject라 하고 구독한 observer을 옵서버패턴의 
observer라 해보자. PublishSubject는 observer을 PublishDisposable<>[] subscribers
라는 배열에 담아 관리하게 된다.
그러면 subscribers에 observer1과 observer2를 가진 크기2의 배열이 된다. PublishSubject
에서 데이터가 들어오면 subscribe한 observer한테 알려야한다. 이 PublishSubject도 reactiveX의
Observer Interface를 impletements하기 때문에 onNext를 통해서 데이터를 받아들이고, subscribers에
**notify**하게 된다. 위에 코드는 이와 같이 동작하게 된다.

그러면 옵서버 패턴 Subject의 notify 추상 메소드와 옵서버 패턴 Observer의 notify가 ReactiveX
Observer Interface의 onNext로 구현되었다는 것을 알수 있다. 그리고 옵서버 패턴의 registObserver와
removeObserver는 각각 ReactiveX ObservableSource Interface의 subscribe와 
ReactiveX Disposable을 통해 구현되게 되어있다.

정리를 하면, 옵서버 패턴은 Observer를 등록하고 제거하며 notify하던 책임을 한 인터페이스에 있다. 하지만
ReactiveX는 이 세가지 행동에 대해서 각각 ObservableSource, Disposable, Observer Interface로
책임을 나누었다.

## 다양한 Functions
ReactiveX에서는 다양한 기능들을 어떻게 구현되고 동작될까? 그것은 팩토리 메소드 패턴으로 구현된다.
Overable Class는 다양한 방식으로 동작하는 Subject들을 만드는 statice method들이 있다..
static method들를 통해서 PublishSubject, ConnectableObservable, ObservableCreate등 을 다양하게
구현된 Concrete Class들이 제공된다. 그럼 팩토리 메소드 패턴이라던데? 어디에 쓰인걸까?

각 Subject들은 Observable Class를 상속하여 subscribeActual이라는 추상메소드를 구체화한다.
이 subscribe를 호출하면 실제 Observable클래스의 subscribe 메소드가 호출되며, 이 메소드에서
다시 구체화된 subscribeActual을 호출하게 된다. 이렇게 팩토리 메소드 패턴으로 다양한 Subject를
제공한다.

filter, map, reduce등의 함수들은 어떻게 하는 것일까? 마찬가지로 답은 Obserable의 추상메소드 subscribeActual를 구현하여
제공된다. Reactive의 Observer Interface를 구현하여 각 Subeject에서 Observer Interface를 구현하여 Chain 구조를 가지기 때문에
메소드 체인도 가능해진다.


P.S 한줄 정리
ReactiveX는 옵서버 패턴을 각 ObservableSource, Disposable, Observer Interface로, Iterator 패턴은
Observer Interface로 추상화하여 각 기능들이 팩토리 메서드 패턴으로 구체화한 Ovservable이다.
