<template>
  <div class="stopwatch">
    <span class="time">{{ time }}</span>

    <div class="stopwatch__action">
      <button class="btn-rest" @click="reset" v-if="isActive">Reset</button>
      <button class="btn-lap" @click="lap" v-if="!isActive">Lap</button>
      <button class="btn-start" @click="start" v-if="isActive">Start</button>
      <button class="btn-stop" @click="stop"  v-if="!isActive">Stop</button>
    </div>
    
  </div>
  <div id="block-lap">
    <ul class="laps">
      <li v-for="(item, index) in laps" :key="index"><span>Lap {{index + 1}}</span> <span>{{ item }}</span></li>
    </ul>
  </div>  
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      time: '00:00,00',
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      laps: [],
      isActive: true,
    };
  },  
  methods: {
    start(){
      if(this.running) return;
      this.isActive = !this.isActive;
      console.log(this.isActive);

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
      this.isActive = !this.isActive
      this.timeStopped = new Date();
      clearInterval(this.started);
    },
    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00.00";
      this.laps = [];
    },
    lap() {
      this.laps.push(this.time);
      console.log(this.timeBegan);
    },
    clockRunning(){
      let currentTime = new Date();
      let timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration);
      let hour = timeElapsed.getUTCHours();
      let min = timeElapsed.getUTCMinutes();
      let sec = timeElapsed.getUTCSeconds();
      let ms = timeElapsed.getUTCMilliseconds();
      
      this.time = 
        this.zeroPrefix(hour, 2) + ":" + 
        this.zeroPrefix(min, 2) + ":" + 
        this.zeroPrefix(sec, 2) + "," + 
        this.zeroPrefix(ms, 2);
      
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

<style lang="css">
  
html, body {
  background-color: #0f0f0f;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

}

.stopwatch {
  /*  */
	font-weight: 300;
	margin: 60px auto 0;
	width: 90vw;
	min-width: 300px;
	max-width: 400px;
	text-align: center;
}

.time {
	font-size: 68px;
	height: 1em;
	line-height: 1em;
	display: inline-block;
	overflow: hidden;
	animation-name: none;
	animation-play-state: paused;
	margin-bottom: 60px;
	color: #fff;
  
}

.stopwatch__action {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

}

.btn-start,
.btn-stop,
.btn-rest,
.btn-lap {
	cursor: pointer;
	font-size: 16px;
	border: 2px solid #353535;
	background-color: #353535;
	box-shadow: inset 0 0 0 2px #0f0f0f;
	color: #ccc;
	width: 80px;
	border-radius: 100%;
	text-align: center;
	line-height: 76px;
}

.btn-start {
  background-color: #182e1c;
	border-color: #182e1c;
	color: #42cc57;
}

.btn-stop {
  background-color: #351614;
	border-color: #351614;
	color: #ff352c;
}

.laps {
	counter-reset: laps;
	list-style: none;
	margin: 0;
	padding-left: 0;
	border-top: 1px solid #333;
	font-size: 16px;
}

.laps li {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
	
	position: relative;
	border-bottom: 1px solid #333;
	padding-top: 1em;
	height: 3em;
}
</style>
