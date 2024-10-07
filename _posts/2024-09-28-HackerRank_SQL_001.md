---
layout : markdown
title : HackerRank - SQL - Basic Select
tags : [SQL, MySQL]
toc : true
---
{% include markdown.html %}

> SITE : [HackerRank](https://www.hackerrank.com/)

# PrePare - SQL - Basic Select

## 001

- 문제 : Query all columns for all American cities in the CITY table with populations larger than 100000. The CountryCode for America is USA.

```sql
SELECT *
FROM CITY
WHERE POPULATION > 100000
  and CountryCode = 'USA'
```

## 002

- 문제 : Query the NAME field for all American cities in the CITY table with populations larger than 120000. The CountryCode for America is USA.

```sql
SELECT name
FROM CITY
WHERE population > 120000
  and CountryCode = 'USA'
```

## 003

- 문제 : Query all columns (attributes) for every row in the CITY table.

```sql
SELECT *
FROM CITY
```

## 004

- 문제 : Query all columns for a city in CITY with the ID 1661.

```sql
SELECT *
FROM CITY
WHERE ID = 1661
```

## 005

- 문제 : Query all attributes of every Japanese city in the CITY table. The COUNTRYCODE for Japan is JPN.

```sql
SELECT *
FROM CITY
WHERE countrycode = 'JPN'
```

## 006

- 문제 : Query the names of all the Japanese cities in the CITY table. The COUNTRYCODE for Japan is JPN.

```sql
SELECT name
FROM CITY
WHERE countrycode = 'JPN'
```

## 007 - MOD

- 문제 : Query a list of CITY names from STATION for cities that have an even ID number. Print the results in any order, but exclude duplicates from the answer.

```sql
SELECT DISTINCT City
FROM Station
WHERE MOD(ID, 2) = 0 -- MOD(A, B) : A를 B로 나눈 나머지 값
```

## 008

- 문제 : Find the difference between the total number of CITY entries in the table and the number of distinct CITY entries in the table.

```sql
SELECT COUNT(CITY) - COUNT(DISTINCT CITY)
FROM STATION
```

## 009 - UNION ALL

- 문제 : Query the two cities in STATION with the shortest and longest CITY names, as well as their respective lengths (i.e.: number of characters in the name).   
- If there is more than one smallest or largest city, choose the one that comes first when ordered alphabetically.

```sql
(
    SELECT CITY
         , LENGTH(CITY)
    FROM STATION
    ORDER BY LENGTH(CITY)
           , CITY
    LIMIT 1
)
UNION ALL
(
    SELECT CITY
         , LENGTH(CITY)
    FROM STATION
    ORDER BY LENGTH(CITY) DESC
           , CITY DESC
    LIMIT 1
)
```

## 010 - like

- 문제 : Query the list of CITY names starting with vowels (i.e., a, e, i, o, or u) from STATION. Your result cannot contain duplicates.

```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY like 'a%'
   OR CITY like 'e%'
   OR CITY like 'i%'
   OR CITY like 'o%'
   OR CITY like 'u%'
```

## 011 - SUBSTRING

- 문제 : Query the list of CITY names from STATION which have vowels (i.e., a, e, i, o, and u) as both their first and last characters. Your result cannot contain duplicates.

```sql
SELECT DISTINCT CITY
FROM STATION
WHERE SUBSTRING(CITY, 1, 1) in ('a','e','i','o','u')
  and SUBSTRING(CITY, -1, 1) in ('a','e','i','o','u')
```

## 012 - NOT LIKE

- 문제 : Query the list of CITY names from STATION that do not start with vowels. Your result cannot contain duplicates.

```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY NOT LIKE 'a%'
  and CITY NOT LIKE 'e%'
  and CITY NOT LIKE 'i%'
  and CITY NOT LIKE 'o%'
  and CITY NOT LIKE 'u%'
```

## 013

- 문제 : Query the list of CITY names from STATION that do not end with vowels. Your result cannot contain duplicates.

```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY NOT LIKE '%a'
  and CITY NOT LIKE '%e'
  and CITY NOT LIKE '%i'
  and CITY NOT LIKE '%o'
  and CITY NOT LIKE '%u'
```

## 014

- 문제 : Query the list of CITY names from STATION that either do not start with vowels or do not end with vowels. Your result cannot contain duplicates.

```sql
SELECT DISTINCT city
FROM STATION
WHERE ( city NOT LIKE '%a'
  and city NOT LIKE '%e'
  and city NOT LIKE '%i'
  and city NOT LIKE '%o'
  and city NOT LIKE '%u' )
  or
  ( city NOT LIKE 'a%'
  and city NOT LIKE 'e%'
  and city NOT LIKE 'i%'
  and city NOT LIKE 'o%'
  and city NOT LIKE 'u%')
```

## 015 - SUBSTR

- 문제 : Query the list of CITY names from STATION that do not start with vowels and do not end with vowels. Your result cannot contain duplicates.

```sql
SELECT DISTINCT city
FROM STATION
WHERE SUBSTR(city, 1, 1) NOT IN ('a', 'e', 'i', 'o', 'u')
  and SUBSTR(city, -1, 1) NOT IN ('a', 'e', 'i', 'o', 'u')
```

## 016

- 문제 : Query the Name of any student in STUDENTS who scored higher than  75 Marks. Order your output by the last three characters of each name.   
- If two or more students both have names ending in the same last three characters (i.e.: Bobby, Robby, etc.), secondary sort them by ascending ID.

```sql
SELECT NAME
FROM STUDENTS
WHERE Marks > 75
ORDER BY SUBSTR(NAME, -3, 3) ASC
       , ID
```

## 017

- 문제 : Write a query that prints a list of employee names (i.e.: the name attribute) from the Employee table in alphabetical order.

```sql
SELECT name
FROM Employee
ORDER BY name ASC
```

## 018

- 문제 : Write a query that prints a list of employee names (i.e.: the name attribute) for employees in Employee having a salary greater than $2000 per month   
- who have been employees for less than  10 months. Sort your result by ascending employee_id.

```sql
SELECT name
FROM Employee
WHERE salary > 2000
  and months < 10
ORDER BY employee_id ASC
```
