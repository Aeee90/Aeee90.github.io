---

layout: post title: "Euler Project No.50" author: Aeee date: 2018-02-28 14:44:49 +0900 categories: Euler tags: ECMAScript6+ javacript EulerProject

image: /assets/images/euler.jpg
-------------------------------

![Problem](/assets/images/euler/50.PNG)

소수의 배열이 필요할 것 같다. 매번 소수를 검사할 때마다 하는 것보다 소수를 구해놓으면 소스 보기가 수월할 것 같다.

```javascript
const getPrimes = (limit)=>{
    const primes = [2];

    for(let i=3; i<=limit; i+=2){
        let isPrime = true;
        for(let j of primes){
            if(j > Math.sqrt(i)) break;

            if(i % j === 0){ isPrime = false; break; }
        }

        if(isPrime) primes.push(i);
    }

    return primes;
}

const primes = getPrimes(1000000);
```

소수 구하는 것은 쉬우니깐. 소스 설명은 필요 없을 것 같다. 내가 본 소수구하는 로직 중에서는 제일 빠르다. 최대 숫자를 입력값으로 넣으면 그 숫자 전까지의 소수 배열을 얻게된다. 100만 이하의 소수배열을 얻자.

그리고 소수 배열을 이용하여 가잘 길게 연속된 소수배열을 구하면서 그 배열의 합이 소수를 만족하는 배열을 찾아야한다.

```javascript
const solve = (limit, primes=[])=>{
    let len = 0, cur = 0, result = 0;
    while(cur <= limit) cur += primes[len++];

    main: while(len-- >= 21){
        let stx = 0, check = false;
        do{
            cur = primes.slice(stx, stx + len).reduce((a,v)=> a+v, 0);
            if(cur > limit) break;
            if(primes.includes(cur)){
                result = result < cur? cur : result;
                check = true;
            }
        }while(++stx);

        if(check) break;
    }

    return result;
}
```

solve 함수를 보자. 먼저 지역변수를 보면, - len: 배열의 합이 limit 값을 안 넘지만, 가장 연속된 소수 배열의 길이이다. - cur: 값을 받아 루프문에서 사용하기 위한 지역 변수이다. - result: 최종 값을 반환하기 위한 변수이다.

먼저 len을 구한다. 첫 번째 while문이 len을 구하게 된다. 그리고 문제에서**'1000 이하에서는 953이 연속된 소수 21개의 합으로 가장 깁니다.'** 위와 같이 나와 있기 때문에, 문제에서 답인 길이가 최소 21보다 크다는 것을 알 수 있다. 그래서 main while문의 조건을 len-- > 21이라는 조건을 줄 수가 있다.

중첩 loop문이 나온다. 여기서 실제 문제에서 원하는 조건을 만족하는 로직들이 들어가 있다. 가장 길이가 길 때부터 길이를 줄여가면서 합이 소수를 만족하는 배열이 가장 첫번째에 나오면 답이 될 것이다. 안에서 while문의 탈출 조건이 while문 안에 있다. 이 이유는 cur > limit 조건이 while문에 있다면, limit 보다 큰 값이 저장 될 가능성이 있기 때문에 안에 들어가 있다.

또한 check 변수를 통해서 밖에서 break를 둔 이유는 같은 길이인데 합이 소수인 배열이 2개 이상 있을 수도 있기 때문이다.

출처: [Project Euler-49](http://euler.synap.co.kr/prob_detail.php?id=50)
