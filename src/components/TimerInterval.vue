<template>
    <div class="container">
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
            <div class="work-time" v-if="!breakRunning">
                {{ this.formatTime(this.workTime) }}
            </div>
            <div class="break-time" v-if="breakRunning">
                {{ this.formatTime(this.breakTime) }}
            </div>
            <button type="button" class="btn-start" @click="startClock">start</button>
            <button @click="pauseClock">Pause</button>
        </main>

    </div>
</template>

<script>
export default {
    data() {
        return {
            workTime: 5,
            timeOn: 5,
            breakTime: 15,
            timeOff: 15,
            isActive: true,
            countDown: 30,
            roundsLeft: 1,
            totalRounds: 3,
            workRunning: true,
            breakRunning: false,
            workInterval: null,
            breakInterval: null,
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
            this.isActive = false;

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
                            this.switchScreens("toWork");
                        }
                    }, 1000);
                } else if (this.workTime) {
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
                            this.roundsLeft++;
                            this.switchScreens("toBreak");
                        }
                    }, 1000);
                }
            }
        },
        switchScreens(value){
            console.log("workRunning ",this.workRunning);
            console.log("breakRunning ",this.breakRunning);
            if (value === "toWork") {
                console.log("toWork");
                this.workRunning = true;
            } else {
                console.log("toBreak");
                this.breakRunning = true;
            }
            console.log("startClock");
            this.startClock();
        },
        stopCurrentInterval(){
            if(this.workRunning){
                console.log("stop workTime");
                this.workRunning = false;
                clearInterval(this.workInterval);
            } else {
                this.breakRunning = false;
                clearInterval(this.breakInterval);
            }
        },
        pauseClock(){
            if(this.workRunning){
                clearInterval(this.workInterval);
            } else if (this.breakRunning){
                clearInterval(this.breakInterval);
            }
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