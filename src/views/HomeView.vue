<template>
  <div class="home">
    <WeightCalculator></WeightCalculator>
  </div>
</template>

<script>
// @ is an alias to /src
import WeightCalculator from '@/components/WeightCalculator.vue'

export default {
  name: 'HomeView',
  components: {
    WeightCalculator
  }
}
</script>
