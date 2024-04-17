---
title : Hadoop-MapReduce
layout : markdown
tags: [hadoop, MapReduce]
---

{% include markdown.html %}

# MapReduce

1. Mapper : 모든 노드의 데이터를 키와 값의 쌍으로 필터링 한다.
2. Shuffle and Sort : 출력 값이 정렬되고 통합, 값은 유사한 키에 따라 그룹화 되며, 중복된 값은 폐기
3. Reduce : 통합된 Shuffle and Sort 단계에서의 출력이 집계
