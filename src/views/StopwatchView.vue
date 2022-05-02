<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <StopWatch></StopWatch>
  </div>
</template>

<script>
import StopWatch from '@/components/StopWatch.vue'
export default {
  name: 'stopwatchView',
  components: {
    StopWatch
  }
  
}
</script>
