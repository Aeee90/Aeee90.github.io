---
layout: post
title:  "Euler Project No.49"
author: Aeee
date:   2018-02-12 20:47:49 +0900
categories: Euler
tags: ECMAScript6+ javacript EulerProject
image: /assets/images/euler.jpg
---

![Problem](/assets/images/euler/49.PNG)

일단 소수를 구해보자.
```javascript
const getPrimeArray = (num) =>{
    const primes = [2];
    for(let i=3; i<num; i+= 2){
        let isPrime = true;
        for(let j of primes){
            if(j > Math.sqrt(i)) break;
            if(i%j === 0){
                isPrime = false;
                break;
            }
        }

        if(isPrime) primes.push(i);
    };

    return primes;
};

getPrimeArray(10000).filter(v=> v/1000 >= 1));
```
최대 숫자를 입력값으로 넣으면 그 숫자 전까지의 소수 배열을 얻게된다. 4자리의 소수만이 필요하니 필터를 이용해 1000이하의 소수는 없애자.

그리고 소수 배열의 조건이 3300의 차이와 서로 순열이 되는 조건이 있다. 그 조건과 순열을 확인하는 함수를 만들자.

```javascript
const isPermutation = (first, second, thrid)=>{
    const se = second.toString().split(''), th = thrid.toString().split('');
    
    for(let v of first.toString()){
        if(se.includes(v)) se.splice(se.indexOf(v),1);
        if(th.includes(v)) th.splice(th.indexOf(v),1);
    }
    
    if(!se.length && !th.length) return true;
    else false;
}

const getPermutation_3330 = (primes)=>{
    const len = primes.length;
    const permu = [];
    for(let i=0; i<len/2; i++){
        const first =primes[i],second = first + 3330, thrid = first + 6660;
        if(primes.includes(second) && primes.includes(thrid)){ 
            if(isPermutation(first, second, thrid)) permu.push(`${first}${second}${thrid}`);
        } 
    }

    return permu;
};
```

isPermutation은 세 숫자가 permutation인지 확인하는 것이다. 숫자들을 array 받아서 모든 숫자가 permutation인지 확인하는 것이 정답이지만, 귀찮아서 3개를 무조건 받는 함수로 구현했다.  getPermutation_3330 함수는 위에서 걸러진 소수를 가지고 세숫자가 ''등차가 3300 등차수열인지'와 'permutation인지'를 확인하게 된다. 그리고 이 두개를 만족하는 숫자를 순서대로 붙인 String 배열을 반환한다.

아래는 동작하는 코드이다.
```javascript
const getPrimeArray = (num) =>{
    const primes = [2];
    for(let i=3; i<num; i+= 2){
        let isPrime = true;
        for(let j of primes){
            if(j > Math.sqrt(i)) break;
            if(i%j === 0){
                isPrime = false;
                break;
            }
        }

        if(isPrime) primes.push(i);
    };

    return primes;
};

const isPermutation = (first, second, thrid)=>{
    const se = second.toString().split(''), th = thrid.toString().split('');
    
    for(let v of first.toString()){
        if(se.includes(v)) se.splice(se.indexOf(v),1);
        if(th.includes(v)) th.splice(th.indexOf(v),1);
    }
    
    if(!se.length && !th.length) return true;
    else false;
}

const getPermutation_3330 = (primes)=>{
    const len = primes.length;
    const permu = [];
    for(let i=0; i<len/2; i++){
        const first =primes[i],second = first + 3330, thrid = first + 6660;
        if(primes.includes(second) && primes.includes(thrid)){ 
            if(isPermutation(first, second, thrid)) permu.push(`${first}${second}${thrid}`);
        } 
    }

    return permu;
};

console.log(getPermutation_3330(getPrimeArray(10000).filter(v=> v/1000 >= 1)));
```


출처: [Project Euler-49](http://euler.synap.co.kr/prob_detail.php?id=49)