---
layout: post
title:  "Saturday Night, 3회차"
author: Aeee
date:   2021-07-24 21:00:00 +0900
categories: Concurrency Go Select
tags: Concurrency Go
image: /assets/images/http.gif
---

# select
 select statement 는  채널을 하나로 묶는 접착제이다. 이를 알기 위한 간단한 예제가 있다.
```go
    start := time.Now()
    c := make(chan  interface{})
   
    go func() {
        time.Sleep(5*time.Second)
        close(c)
    }()
   
    fmt.Println("Blocking on read..")
    select {
        case <-c:
            fmt.Printf("Unblocked %v later\n", time.Since(start))
    }
```
위의 예제를 보면 switch 문 처럼 보인다. select는 switch와 마찬가지로 일련의 명령문을 보호는 case문을 포합하지만 
비슷한 점은 이것 뿐이다. select의 case문은 순차적으로 테스트 되지 않으며, 조건이 하나도 충족되지 않는다고 다음으로
넘어가지 않는다.

1. 여러 채널을 읽을 내용이 있을 때는 어떻게 될까?

```go
	c1 := make(chan interface{}); close(c1)
	c2 := make(chan interface{}); close(c2)

	var c1Count, c2Count, dCount int
	for i := 10000; i>= 0; i-- {
		select {
			case <- c1:
				c1Count++
			case <- c2:
				c2Count++
			default:
				dCount++
		}
	}

	fmt.Printf("c1Count: %d\nc2Count: %d\ndCount: %d", c1Count, c2Count, dCount)
```

실행결과는 다음과 같다.
c1Count: 4997
c2Count: 5004
실행마다 다르지만 5:5로 나온다. Go의 런타임은 case 문의 집합에 대해 균일한 의사 무작위(pseudo-random uniform)
선택을 수행한다.

2. 어떠한 채널도 준비되지 않는다면 어떻게 될까?
```go
    var c <- chan int
    select {
        case <- c:
        case <- time.After(1 * time.Second):
            fmt.Println("Timed out.")
    }
```
Go에서는 time 패키지와 시간 초과를 구현할 수 있도록 우아한 방법을 제공하여, 영원히 대기하는 것을 방지할 수 있도록
한다.  time.After 함수는 time.Duration 인수를 받아서, 사용자가 넘겨준 기간이 지난 후에 현재 시간을 보낼 채널을
리턴한다.

3. 무언가 하고 싶지만 현재 준비도니 채널이 없다면 어떻게 될까?
또한 어떠한 채널도 준비가 되지 않았을 때를 위해 default 문을 제공한다.
```go
done := make(chan interface{})
	go func() {
		time.Sleep(5*time.Second)
		close(done)
	}()

	workCounter := 0
	loop:
	for {
		select {
			case <- done:
				break loop
			default:
		}

		workCounter++
		time.Sleep(1*time.Second)
	}

	fmt.Printf("Achievend %v cycles of work before signalled to stop.\n", workCounter)
```

Achievend 5 cycles of work before signalled to stop.

위와 같은 메세지가 출력되며, Go에서는 때로는 멈춰야 하는지를 점검하는 루프를 가지고 있다. 
 
# Garbage Collector

## Garbage Collector
- Garbage Collector 줄여서 GC라고 부릅니다. 메모리 관리 방법 중 하나로, 프로그램이 동적으로 할당했던 
메모리에서 더 이상 사용하지 않게 된 메모리를 찾아서 재사용 가능하도록 회수하는 기능이다.
- 성능을 어느정도 포기하고, 메모리 관리를 더 쉽게 할 수 있도록 하기 위해 사용한다.


## 삼색 표시 후 쓸어 담기 알고리즘
Go 언어의 GC는 삼색 표시 후 쓸어 담기 알고리즘 Tricolor mark and sweep algorithm 을 사용합니다. 먼저 삼색 집합에 대해서 알아봐야 합니다.

- 흰색 집합 (White set): 프로그램에서 더 이상 접근할 수 없어서 GC 대상이 되는 객체
- 검은색 집합 (Black set): 프로그램이 사용하고 있고, 흰색 집합의 객체에 대한 참조가 없는 객체. 흰색 집합의 객체가 검은색 집합의 객체의 참조를 가져도 문제가 되지 않음
- 회색 집합 (Grey set): 프로그램이 사용하고 있고, 흰색 집합의 객체를 가리킬 수도 있어서 검사를 진행해야하는 객체

(출처: [gump.log](https://velog.io/@kineo2k/Go-%EC%96%B8%EC%96%B4%EC%9D%98-GC)) 
 

  


  