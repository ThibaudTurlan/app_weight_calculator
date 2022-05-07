<template>
    <div class="container" v-bind:class="{bg_work : workRunning, bg_break : breakRunning}">
        <h1>Interval Time</h1>
        <div class="form-setting" v-if="isActive">
            <div class="work">
                <p>work</p>
                <button @click="lessWorkTime">-</button>
                <span>{{ formatTime(this.workTime) }}</span>
                <button @click="addWorkTime">+</button>
            </div>
            <div class="breakTime">
                <p>breakTime</p>
                <button @click="lessBreakTime">-</button>
                <span>{{ formatTime(this.breakTime) }}</span>
                <button @click="addBreakTime">+</button>
            </div>
            <div class="round">
                <p>round</p>
                <button @click="lessRounds">-</button>
                <span> x{{ this.totalRounds }}</span>
                <button @click="addRounds">+</button>
            </div>
            <div class="session-time">{{ this.formatTime((this.breakTime + this.workTime) * this.totalRounds) }}</div>

            <button type="button" class="btn-start" @click="startClock">start</button>
        </div>
        <main v-if="!isActive">
            <div class="round-score">
                {{ this.roundsLeft }} / {{ this.totalRounds }}
            </div>
            <div class="work-time" v-if="workRunning">
                {{ this.formatTime(this.workTime) }}
            </div>
            <div class="break-time" v-if="breakRunning">
                {{ this.formatTime(this.breakTime) }}
            </div>
            <div class="setup-time" v-if="setupRunning">
                {{ this.formatTime(this.setupTime) }}
            </div>
            <button type="button" class="btn-start" @click="startClock">start</button>
            <button @click="pauseClock">Pause</button>
            <button @click="clear">Reset</button>
        </main>

    </div>
</template>

<script>
// import sound from '@/assets/sounds/mixkit-clock-countdown-bleeps.ogg'
export default {
    data() {
        return {
            workTime: 5,
            timeOn: 5,
            breakTime: 10,
            timeOff: 10,
            isActive: true,
            roundsLeft: 1,
            totalRounds: 2,
            workRunning: false,
            breakRunning: false,
            workInterval: null,
            breakInterval: null,
            setupTime: 5,
            setupOn: 5,
            setupRunning: false,
            setupInterval: null,
        }
    },
    methods: {
        addWorkTime(){
            this.workTime+=5;
            this.timeOn+=5;
        },
        lessWorkTime(){
            this.workTime-=5;
            this.timeOn-=5;
        },
        addBreakTime(){
            this.breakTime+=5;
            this.timeOff+=5;
        },
        lessBreakTime(){
            this.breakTime-=5;
            this.timeOff-=5;
        },
        addRounds(){
            this.totalRounds++;
        },
        lessRounds(){
            this.totalRounds--;
        },
        startClock(){

            if(this.isActive){
                this.isActive = false;
                // this.workRunning = true;
                this.setupRunning = true;
                // const audio = new Audio(sound);
                // audio.play();
            }
            console.log("setupRunning :",this.setupRunning);    

            if (this.roundsLeft <= this.totalRounds) {
                if (this.breakRunning) {
                    console.log("break");
                    this.breakInterval = setInterval(() => {
                        this.breakRunning = true;
                        let newTime = this.breakTime - 1;
                        this.breakTime = newTime;
                        console.log(this.breakTime);
                        if (newTime == 0) {
                            this.stopCurrentInterval();
                            this.breakRunning = false;
                            let temp = this.timeOff;
                            this.breakTime = temp;
                            this.roundsLeft++;
                            this.switchScreens("toWork");
                        }
                    }, 1000);
                } else if (this.workRunning) {
                    console.log("work");
                    this.workInterval = setInterval(() => {
                        this.workRunning = true;
                        let newTime = this.workTime - 1;
                        this.workTime = newTime;
                        console.log("newTime",this.workTime);
                        if (newTime == 0) {
                            console.log("stop");
                            this.stopCurrentInterval();
                            this.workRunning = false;
                            let temp = this.timeOn;
                            this.workTime = temp;
                            // this.roundsLeft++;
                            this.switchScreens("toBreak");
                        }
                    }, 1000);
                } else if (this.setupRunning) {
                    console.log("setup");
                    this.setupInterval = setInterval(() => {
                        this.setupRunning = true;
                        let newTime = this.setupTime - 1;
                        this.setupTime = newTime;
                        console.log(this.setupTime);
                        if (newTime == 0) {
                            this.stopCurrentInterval();
                            this.setupRunning = false;
                            let temp = this.setupOn;
                            this.setupTime = temp;
                            this.switchScreens("toWork");
                        }
                    }, 1000);
                }
            } else {
                console.log("object");
                this.clear()
            }
        },
        switchScreens(value){
            if (value === "toWork") {
                console.log("toWork");
                this.workRunning = true;
            } else {
                console.log("toBreak");
                this.breakRunning = true;
            }
            this.startClock();
        },
        stopCurrentInterval(){
            if(this.workRunning){
                this.workRunning = false;
                clearInterval(this.workInterval);
            } else if(this.breakRunning) {
                this.breakRunning = false;
                clearInterval(this.breakInterval);
            } else if(this.setupRunning){
                console.log("stop setupInterval");
                clearInterval(this.setupInterval);
            }
        },
        pauseClock(){
            if(this.workRunning){
                clearInterval(this.workInterval);
            } else {
                clearInterval(this.breakInterval);
            }
        },
        clear(){
            this.workTime = this.timeOn;
            this.breakTime = this.timeOff;
            this.roundsLeft = 1;
            this.isActive = true;
            this.stopCurrentInterval();
        },
        formatTime: function(time) {
            let seg = time % 60;
            if (seg < 10) {
                seg = "0" + seg;
            }
            let min = parseInt(time / 60);
            return min + ":" + seg;
        }
    },
}
</script>

<style scoped>
.bg_work {
    background-color: tomato;
}
.bg_break {
    background-color: aquamarine;
}
</style>