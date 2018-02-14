---
layout: post
title:  "Linear List"
author: Aeee
date:   2018-02-14 12:30:00 +0900
categories: ArtOfComputerProgramming
tags: ECMAScript6+ javacript
image: /assets/images/artOfComputerProgamming.jpg
---

# Linear List
 n개의 노드들의 순차열, 오직 한 줄로 늘어선 항목들 사이의 상대적 위치에만 관계하는 구조적 속성을 가진다.
 
## Stack
 FILO(First In Last Out)의 구조로 입출력이 한 쪽 끝에서만 이루어지는 구조이다.

```javascript
const Stack = (_=>{
  const _memory = Symbol(), _length = Symbol();
  return class {
      constructor(max=10){ Object.assgin({max, [_length]:0, [_memory]: []}); }

      push(value){
        if(this[_length] === this.max) throw 'OVERFLOW!';
        else this[_memory][++this[_length]] = value;
      }

      pop(){
        if(this[_length] === 0) throw 'UNDERFLOW!';
        else return this[_memory][this[_length]--];
      }

      get length(){
        return this[_length];
      }
  }
})();
const stack = new Stack();
stack.push(1);
stack.push(2); 
console.log(stack.pop()); //3
```
스택의 기본 기능인 push와 pop, 현재 STACK의 크기를 얻을수 있는 length를 구현하였다. **_length** 를 가지고 Memory에 접근하여 값을 저장하며, 기본 최대 크기는 10을 하였다.

## Queue
FIFO(First In First Out)의 구조로 입력이 상단에서 일어나면 출력이 하단에서 일어난다.

```javascript
const Queue = (_=>{
  const  _memory = Symbol(), _R = Symbol(), _F = Symbol();
  return class{
    constructor(_MAX=10){ Object.assign(this, {_MAX: _MAX, [_memory]: [], [_R]:0, [_F]:0 });}

    push(value){
      if(this[_R]+1 === this[_F]) throw 'OVERFLOW!';

      this[_memory][this[_R]] = value;
      
      if(++this[_R] === this._MAX) this[_R] = 0;
    }

    pop(){
      if(this[_F] === this[_R]) throw 'UNDERFLOW!';

      const value = this[_memory][this[_F]]; 
      
      if(++this[_F] === this._MAX) this[_F] = 0;
    
      return value;
    }

    get length(){
      return this[_R] > this[_F]? this[_R]+1 : this._MAX-this[_F]+this[_R];
    }
  }
})();
```
원형 Queue를 만들었다. Stack보다 복잡한데, 일단 속성을 정의해보자.
- `_Max`: Queue로 다루어질 데이터의 최대 크기이다. 현재 다른 변수나 조건을 추가하지 않고서는 최대 크기의 -1 만큼 push가 되지 않기 때문이다.
- `_R`: 값이 입력되면 변화데는 인덱스로, 현재 값은 값이 들어와야할 위치를 가르킨다.
- `_F`: 가장 마지막에 들어와 있는 인덱스로, 현재 값은 값이 출력되어야할 위치를 가르킨다.

변수나 조건을 추가하지 않는 상태에서 들어온 크기만큼 사용하기 위해서 하루는 고민했다. 인터넷을 참조하고 나서 포기한듯 싶다. 코드는 순서대로 읽으면 그리 어렵지 않는 코드인 것 같다. F와 R을 이용해 Queue가 비었는지(UNDERFLOW), 꽉찼는지(OVERFLOW)를 판단한다. 
Stack과 다르게 입출력의 입구가 다르기때문에 2개의 변수를 통해 제어했다. 그리고 원형으로 만든이유는 메모리를 효울적으로 사용하기 위함이다.

## Deck
입력과 출력이 양 끝에서 일어나는 구조이다. Queue와 비교해보면, R과 F에서 입출력이 일어날수 있는 구조를 말한다. 원형 Deck 만들어보는 건 추후해 해보자.

## Linked List
지금까지의 구조들은 메모리에 순서대로 값을 저장함으로써 순서를 보장했다. 하지만 Linked List는 값자체에 다음 순서의 값의 주소를 가지므로 List을 만든다. Linked List는 삽임이나 삭제가 용이하지만 이를 탐색에서는 좋지 않다. 데이터들이 메모리에 순차적으로 저장되어 있는게 아니다보니 탐색의 비용이 커질수도 있기 때문이다.

Linked List의 종류는 구현에 따라 다음과 같다. (다음 값을 오른쪽, 이전 값을 왼쪽이라 칭하겠다.)
- `Singly Linked List:` 오른쪽 값 주소만을 가지는 기본적인 Linked List이다.
- `Doubly Linked List:` 오른쪽 값 주소만이 아니라 자신의 왼쪽 값 주소도 가지고 있는 Linked List 이다.
- `Circular Linked List:` Doubly Linked List에서 가장 왼쪽 값은 자신의 왼쪽 값이 없고, 가장 오른쪽 값은 자신의 오른쪽 값이 비워있을 것이다. 하지만 Circular Linked List는 가장 왼쪽 값의 왼쪽은 가장 오른쪽 값의 주소를, 가장 오른쪽 값의 오른쪽은 가장 왼쪽의 값의 주소를 가짐으로써 원형을 만든 Linked List이다.

```javascript
const LinkedList = (-=>{
  const Model = class{
    constructor(value, left, right){
        Object.assign(this, {value, left = (left || (left = this)), right = (right || (rigth = this))});
    }
  }

  return LinkedList = class{
    constructor(){ Object.assign(this, {length:0, top:null}); }
    push(value, index=-1){
        if(this.length === 0){
            this.top = new Model(value, undefined, undefined);
        }else{
            if(index > 0 ){
                let right = get(index), left = right.left,
                cur = new Model(value, left, right);
                left.right = cur;
                right.left = cur;
            }else
                throw "Out Of Index";
        }
    }

    get(index){
        if(index >= 0 && index <= this.length){
            let value = this.top;
            while(--index >= 0){
                value = this.top.right;
            }
            return value;
        }else
            throw "Out Of Index";
    }

    [Symbol.toPrimitive](hint){
        let cur = this.top;
        return Array(this.length).map(_=>{let value = cur.value; cur = cur.left; return value});
    }
  }
})();

```
간단하게 구현했다. 특정 위치(idx) 값에 삽입과 특정 위치(idx)의 값을 가져오는 로직을 구현했다. top는 가장 상위(처음으로 들어온) 값을 가르키며, 이것은 root가 되어 탐색을 할 시점이 될 것이다. 그리고 다른 특징은 자바스크립트에서는 포인터를 직접 사용할 수 없으므로, 객체를 사용하여 포인터를 사용했다. 어렵지 않은 코드라 쉽게 읽을 수 있다고 생각도니다.

# 마무리
이런 구조는 왜 배우는 것일까?라는 생각이 될 것이다. 이러한 것들을 만드는 것은 사람들의 대화를 위해서 만드는 생각이 든다. 많이 쓰고 효율적인 것들을 명칭화 해놓으면 다른 사람들과 쉽게 소통이 가능해서 이지 않을까 싶다. 예를 들면, 내가 Stack을 구현하고 이를 설명할 때 알고리즘을 매번 설명한다면 얼마나 불편할까 싶다. 

그리고 나중에 일이지만, 정렬을 들어가기 시작하면 '이 알고리즘은 속도가 무조건 안 좋다' 라고 말 할수 없게 되는 것 같다. 예전에는 '퀵정렬이 대부분 상황에서 가장 빠르네, 그러면 퀵정렬만 사용하면 되겠네.' 라는 어이 없는 생각을 했다. 귀찮으니깐.. 하지만 한 알고리즘에 어떠한 데이터 구조를 사용하느냐에 따라 알고리즘의 속도가 달라지는 걸 보고 공부해야겠구나 싶었다. 할튼 푸념이었고, 열심히 합시다.





 
 