---
layout: post 
title: "OOAD 1장: 위대한 소프트웨어는 여기에서 시작된다." 
author: Aeee 
date: 2018-02-28 14:44:49 +0900 
categories: OOAD 
tags: java OOP OOAD HeadFirst

image: /assets/images/OOAD.jpg
---

# 1장 위대한 소프트웨어 만들기

위대한 소프트웨어는 무엇일까? 고객의 관점을 볼 수 있고, 개발자의 관점에서 볼 수 있다. 고객에서는 기능을 문제 없이 동작해야한다. 개발자의 관점에서는 잘 설계되어 있고, 잘 코딩되어 있고, 유지보수와 재사용, 그리고 확장이 쉬운 프로그램일 것 입니다. 그럼 우리는 위대한 소프트웨어를 만들기 위해서 다음 세가지를 하면 된다고 한다.

1. 여러분의 소프트웨어가 고객이 원하는 기능을 하도록 하세요.
2. 객체지향의 기본원리를 적용해서 소프트웨어를 유연하게 하세요.
3. 유지보수와 재사용이 쉬운 디자인을 위해 노력하세요.

우리는 이 세가지를 하기 위해서 다음 아래와 같은 코드를 가지고 연습을 할 것 입니다.

```java
// 동작하는지는 검증 안 했습니다.

@Getter
@Setter
public class Guitar {
    @NonNull
    private String serialNumber, builder, model, type, backWood, topWood;
    @NonNull
    private Double price;
}


public class Inventory {
    private List<Guitar> guitars;

    public Inventory(){
        guitars = new LinkedList<>();
    }

    public void addGuitar(String serialNumber,String builder,String model,String type,String backWood,String topWood,Double price){
        guitars.add(new Guitar(serialNumber, builder, model, type, backWood, topWood, price));
    }

    public Guitar getGuitar(String serialNumber){
        return Flux.just(guitars).filter(guitar => guitar.getSerialNuber().equals(serialNumber));
    }

    public Flux<List<Guitar>> searchGuitar(Guitar searchGuitar){
        return Flux.just(guitars).filter(guitar =>{
            String builder = searchGuitar.getBuilder();
            if((builder != null) && (!builder.equals("")) && (!builder.equals(guitar.getBuilder()))) return false;

            String model = searchGuitar.getModel();
            if((model != null) && (!model.equals("")) && (!model.equals(guitar.getModel()))) return false;

            String type = searchGuitar.getType();
            if((type != null) && (!type.equals("")) && (!type.equals(guitar.getType()))) return false;

            String backWood = searchGuitar.getBackWood();
            if((backWood != null) && (!backWood.equals("")) && (!backWood.equals(guitar.getBackWood()))) return false;

            String topWood = searchGuitar.getTopWood();
            if((topWood != null) && (!topWood.equals("")) && (!topWood.equals(guitar.getTopWood()))) return false;

            return true;
        });
    }

}
```

Guitar 라는 객차가 있고, 고객이 원하는 기타를 찾아주는 프로그램을 작성을 할 것입니다.

## 첫번째. 고객이 원하는 기능을 하도록 하세요

Search 메소드는 고객이 찾고 싶어하는 기타를 정확하게 제공하기 쉽지 않을 것이다. String이라는 큰 범위의 값으로 되어있기 때문이다. 고객이 원한는 기타를 알려면, 정확하게 데이터베이스에 어떤 값으로 저장되어있는지 알아야 할 것이다. 그리고 일정의 특정 타입들은 몇가지의 경우만을 가질 것이다. 이 말은 Type은 ACOUSTIC과 ELECTRIC 두가지 경우 밖에 없기 때문에 제한 해주는 것이 좋다. 일단 이러한 제한적인 타입을 갖는 것들을 enum 타입으로 변경해주자.

```java
public Enum Type {
    ACOUSTIC, ELECTRIC;

    public String toString(){
        switch(this){
            case ACOUSTIC: return "acoustic";
            case ELECTRIC: return "electric";
            default: return "Type";
        }
    }
}

public Enum Builder {
    FENDER, MARTIN, GIBSON, COLLINGS, OLSON, RYAN, PRS, ANY;

    public String toString(){
        switch(this){
            case FENDER: return "fender";
            case MARTIN: return "martin";
            case GIBSON: return "gibson";
            case COLLINGS: return "collings";
            case OLSON: return "olson";
            case RYAN: return "ryan";
            case PRS: return "prs";
            case ANY: return "any";
            default: return "Builder";
        }
    }
}

public enum Wood {
    INDIAN_ROSEWOOD, BRAZILIAN_ROSEWOOD, MAHOGANY, MAPLE, COCOBOLO, CEDAR, ADIRONDACK, ALDER, SITKA;

    switch(this){
        case INDIAN_ROSEWOOD: return "indian rosewood";
        case BRAZILIAN_ROSEWOOD: return "brazilian rosewood";
        case MAHOGANY: return "mahogany";
        case MAPLE: return "maple";
        case COCOBOLO: return "cocobolo";
        case CEDAR: return "cedar";
        case ADIRONDACK: return "adirondack";
        case ALDER: "alder";
        case SITKA: "sitka";
        default: return "Wood";
    }
}

@Getter
@Setter
public class Guitar {
    @NonNull
    private String serialNumber;
    @NonNull
    private Builder builder;
    @NonNull
    private Model model;
    @NonNull
    private Type type;
    @NonNull 
    private Wood backWood;
    @NonNull
    private Wood topWood;
    @NonNull
    private Double price;
}
```

열거형으로 타입을 만들면서 각 변수의 값을 제한적으롤 막았습니다. 그런데 Search 메소드를 보면 price와 serialNumber는 불필요하게 만들어지는 것을 볼 수 있습니다. 그리고 논리적으로 price와 serialNumber를 제외한 속성들은 기타 스펙이라는 나눌 수가 있습니다. 중복코드를 제거하는거지요. 그래서 Guitar 클래스를 GuitarSpec이라는 클래스와 Guitar 클래스로 나눌 것입니다. 그리고 이것을 캡슐화라고 합니다. 캡슐화는 은닉된 데이터를 행동을 통해서 조작할 수 있도록 하는 것도 맞지만, 논리적 그룹으로 분리시키는 일과도 관련이 있습니다.

```java
@Getter
@Setter
public class Guitar {
    @NonNull
    private String serialNumber;
    @NonNull
    private Double price;
    @NonNull
    private GuitarSpec guitarSpec;
}

@Getter
@Setter
public class GuitarSpec {
    @NonNull
    private Builder builder;
    @NonNull
    private Model model;
    @NonNull
    private Type type;
    @NonNull 
    private Wood backWood;
    @NonNull
    private Wood topWood;
}

```