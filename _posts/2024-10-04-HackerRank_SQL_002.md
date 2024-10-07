---
layout : markdown
title : HackerRank - SQL - Advanced Select
tags : [SQL, MySQL]
toc : true
---
{% include markdown.html %}

> SITE : [HackerRank](https://www.hackerrank.com/)

# 001 - CASE

- 문제

> Write a query identifying the type of each record in the TRIANGLES table using its three side lengths.  
> Output one of the following statements for each record in the table:  
> - Equilateral: It's a triangle with  sides of equal length.  
> - Isosceles: It's a triangle with  sides of equal length.  
> - Scalene: It's a triangle with  sides of differing lengths.  
> - Not A Triangle: The given values of A, B, and C don't form a triangle.

```sql
SELECT CASE
            WHEN (A + B <= C) or (A + C <= B) or (B + C <= A) THEN 'Not A Triangle'
            WHEN (A = B) and (B = C) THEN 'Equilateral'
            WHEN (A = B) or (B = C)or (A = C) THEN 'Isosceles'
            WHEN (A != B) and (B != C) and (A != C) THEN 'Scalene'
        END
FROM TRIANGLES
```

# 002 - CONCAT

- 문제

> Generate the following two result sets:
> 1. Query an alphabetically ordered list of all names in OCCUPATIONS, immediately followed by the first letter of each profession as a parenthetical  
> (i.e.: enclosed in parentheses). For example:AnActorName(A), ADoctorName(D), AProfessorName(P), and ASingerName(S).  
> 2. Query the number of ocurrences of each occupation in OCCUPATIONS. Sort the occurrences in ascending order, and output them in the following format:  
> There are a total of [occupation_count] [occupation]s.  
> where [occupation_count] is the number of occurrences of an occupation in OCCUPATIONS and [occupation] is the lowercase occupation name.  
> If more than one Occupation has the same [occupation_count], they should be ordered alphabetically.

```sql
SELECT CONCAT(NAME, '(', SUBSTR(Occupation, 1, 1), ')')
FROM OCCUPATIONS
ORDER BY NAME ASC;

SELECT CONCAT('There are a total of ', COUNT(Occupation), ' ', lower(Occupation), 's.')
FROM OCCUPATIONS
GROUP BY Occupation
ORDER BY COUNT(Occupation) ASC, Occupation ASC
```

# 003 - ROW_NUMBER()

- 문제

> Pivot the Occupation column in OCCUPATIONS so that each Name is sorted alphabetically and displayed underneath its corresponding Occupation.  
> The output column headers should be Doctor, Professor, Singer, and Actor, respectively.

```sql
-- MAX : GROUP BY 를 사용하기 위한 트릭  
SELECT
        MAX(CASE WHEN Occupation = 'Doctor' THEN NAME END) AS 'Doctor',
        MAX(CASE WHEN Occupation = 'Professor' THEN NAME END) AS 'Professor',
        MAX(CASE WHEN Occupation = 'Singer' THEN NAME END) AS 'Singer',
        MAX(CASE WHEN Occupation = 'Actor' THEN NAME END) AS 'Actor'
FROM (SELECT *,
    ROW_NUMBER() OVER (PARTITION BY OCCUPATION ORDER BY NAME) AS RN
FROM OCCUPATIONS) TEMP
GROUP BY RN
```

# 004 - IN

- 문제

> You are given a table, BST, containing two columns: N and P, where N represents the value of a node in Binary Tree, and P is the parent of N.

```sql
SELECT N,
        CASE
            WHEN P IS NULL THEN 'Root'
            WHEN N in (SELECT P FROM BST) THEN 'Inner'
            ELSE 'Leaf'
        END
From BST
ORDER BY N ASC
```

# 005

- 문제

> Given the table schemas below, write a query to print the company_code, founder name, total number of lead managers, total number of senior managers,   
> total number of managers, and total number of employees. Order your output by ascending company_code.

> Note:  
> - The tables may contain duplicate records.  
> - The company_code is string, so the sorting should not be numeric. For example, if the company_codes are C_1, C_2, and C_10,   
> - then the ascending company_codes will be C_1, C_10, and C_2.

```sql
SELECT c.company_code, c.founder,
    (SELECT count(DISTINCT l.lead_manager_code) FROM Lead_Manager l WHERE l.company_code = c.company_code),
    (SELECT count(DISTINCT s.senior_manager_code) FROM Senior_Manager s WHERE s.company_code = c.company_code),
    (SELECT count(DISTINCT m.manager_code) FROM Manager m WHERE m.company_code = c.company_code),
    (SELECT count(DISTINCT e.employee_code) FROM Employee e WHERE e.company_code = c.company_code)
FROM Company c
ORDER BY c.company_code ASC;
```
