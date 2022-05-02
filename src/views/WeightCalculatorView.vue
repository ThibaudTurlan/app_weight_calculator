<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <WeightCalculator></WeightCalculator>
  </div>
</template>

<script>
import WeightCalculator from '@/components/WeightCalculator.vue'
export default {
  name: 'WeightCalculatorView',
   components: {
    WeightCalculator
  }
  
}
</script>
