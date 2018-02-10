---
layout: post
title:  "Euler Project No.48"
author: Aeee
date:   2018-02-10 14:29:49 +0900
categories: Euler
tags: ECMAScript6+ javacript EulerProject
image: /assets/images/euler.jpg
---

![Alt text](/assets/images/euler/48.PNG)

# Solution
1^1 + 2^2 + 3^3 + ... + n^n 을 값을 구할 수 있는 function을 먼저 구하자.

```javascript
const solution = n=>{
  return Array.from({length: n}, (v, k) => k+1).reduce((a,v)=>{
    return a + v**v;
  }, 0);
}

console.log(solution(10)); //10405071317
```

10의 값을 넣었을 때, 제대로 나오는지 확인하였다. 1000의 값을 넣었을 때는 Infinity가 나온다. javascript에서 Number의 범위보다 큰 숫자가 다루어지기 때문이다.

문제를 다시 확인해보자. 마지막 10자리를 물어보고 있다. 즉, 10번째 자리의 한 숫자만 필요한 것이다. 즉 pow를 할 때, 10번 자리 위로는 버려도 상관이 없다. 

```javascript
const boundary = 10**10;
const pow = (a, n)=>{
    let temp = 1;
    for(let i=0; i<n; i++){
        temp = temp * n;
        if(temp > boundary) temp = temp%boundary;
    }
    temp = a+temp;
    if(temp > boundary) temp = temp%boundary;
    return temp;
}
```
코드를 보면 10^10의 경계값으로 두어 10자리의 나머지만 남기는 식으로 된다. 아래가 최종코드이다.

```javascript
const solution = (n, boundary = 10**10)=>{
    return Array.from({length: n}, (v, k) => k+1).reduce((a,v)=>{
        return ((a, n)=>{
            let temp = 1;
            for(let i=0; i<n; i++){
                temp = temp * n;
                if(temp > boundary) temp = temp%boundary;
            }
            temp = a+temp;
            if(temp > boundary) temp = temp%boundary;
            return temp;
        })(a, v);
    }, 0);
}
```


  