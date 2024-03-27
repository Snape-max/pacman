<template>



</template>

<script setup>
import { astar } from './utils/astar';

  // 假设我们有一个示例地图
  const exampleMap = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  
  // 定义起始和结束坐标
  const start = [1, 1];
  const end = [3, 3];
  const result = astar(start, end, exampleMap);
  console.log(result);


</script>

<style>



</style>
