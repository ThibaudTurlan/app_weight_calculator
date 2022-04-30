<template>
  <div>
    <span class="time">{{ time }}</span>
    <button id="btn-calc" @click="start">Start</button>
    <button id="btn-calc" @click="stop">Stop</button>
    <button id="btn-calc" @click="reset">reset</button>
    <button id="btn-calc" @click="lap">lap</button>
  </div>
  <div id="block-lap">
        <ul>
          <li v-for="item in laps" :key="item">
            {{ item }} 
          </li>
        </ul>
    </div>  
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      time: '00:00:00.000',
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      laps: [],
    };
  },  
  methods: {
    start(){
      if(this.running) return;
    
      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = 0;
      }

      if (this.imeStopped !== null) {
        this.stoppedDuration += (new Date() - this.timeStopped);
      }

      this.started = setInterval(this.clockRunning, 10);	
      this.running = true;
    },
    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
    },
    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00:00.000";
      this.laps = [];
    },
    lap(){
      this.laps.push(this.time);
      console.log(this.laps);
    },
    clockRunning(){
      let currentTime = new Date();
      let timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration);
      let hour = timeElapsed.getUTCHours();
      let min = timeElapsed.getUTCMinutes();
      let sec = timeElapsed.getUTCSeconds();
      let ms = timeElapsed.getUTCMilliseconds();

      console.log(this.zeroPrefix(hour, 3));
      
      this.time = 
        this.zeroPrefix(hour, 2) + ":" + 
        this.zeroPrefix(min, 2) + ":" + 
        this.zeroPrefix(sec, 2) + "." + 
        this.zeroPrefix(ms, 3);
    },
    zeroPrefix(num, digit) {
      var zero = '';
      for(var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  },
};
</script>