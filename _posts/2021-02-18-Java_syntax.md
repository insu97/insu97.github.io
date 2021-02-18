---
layout: single
title:  "Java-syntax!"

categories :
  - Java

tags :
  - Java
  - syntax

comments : true

---



```java
// switch

public class syntax {
    public static void main(String[] args) {
        int i = 10 ;
        switch (i % 3) {
            case 0:
                System.out.println("C 구역입니다.");
                break;
            case 1:
                System.out.println("A 구역입니다.");
                break;
            default:
                System.out.println("B 구역입니다.");
                break;
        }
    }
}
// if문과의 차이점 => if문의 조건 부분은 불린 값을 , switch문의 조건 부분은 숫자 , 문자열 등의 결과값을 내는 식..!
```

==> 출력 : A 구역입니다.

```java
// for

public class syntax {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.print(i);
        }
    }
}
```

==> 출력 : 12345678910