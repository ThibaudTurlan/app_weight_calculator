<template>
    <div class="container" v-bind:class="{bg_work : workRunning, bg_break : breakRunning}">
        <h1 class="container__title">Interval Time</h1>
        <div class="form-setting" v-if="isActive">
            <div class="form__input work">
                <span class="form__input--label">work</span>
                <div class="form__input--btn-action">
                    <button class="btn-action" @click="workTime -= 5">-</button>
                    <span class="form__input--value">{{ formatTime(this.workTime) }}</span>
                    <button class="btn-action" @click="workTime += 5">+</button>
                </div>
            </div>
            <div class="form__input breakTime">
                <span class="form__input--label">break</span>
                <div class="form__input--btn-action">
                    <button class="btn-action" @click="breakTime -= 5">-</button>
                    <span class="form__input--value">{{ formatTime(this.breakTime) }}</span>
                    <button class="btn-action" @click="breakTime += 5">+</button>
                </div>
            </div>
            <div class="form__input round">
                <span class="form__input--label">round</span>
                <div class="form__input--btn-action">
                    <button  class="btn-action" @click="totalRounds -= 1">-</button>
                    <span class="form__input--value"> x{{ this.totalRounds }}</span>
                    <button class="btn-action" @click="totalRounds += 1">+</button>
                </div>
            </div>
            <div class="session-time">{{ this.formatTime((this.breakTime + this.workTime) * this.totalRounds) }}</div>

            <button type="button" class="btn-start" @click="startClock">start</button>
        </div>
        
        <div class="timer-wrapper" v-show="!isActive">
            <div class="round-left">
                {{ this.roundsLeft }} / {{ this.totalRounds }}
            </div>
            <div class="time-left work-time" v-if="workRunning">
                {{ this.formatTime(this.workTime) }}
            </div>
            <div class="time-left break-time" v-if="breakRunning">
                {{ this.formatTime(this.breakTime) }}
            </div>
            <div class="time-left setup-time" v-if="setupRunning">
                {{ this.formatTime(this.setupTime) }}
            </div>
            <div class="timer-btn">
                <button class="btn-clock" @click="startPause"> 
                    <font-awesome-icon v-if="isPause" icon='play'/>
                    <font-awesome-icon  v-else icon='pause'/>
                </button>
                <button type="button" class="btn-clock" @click="clear"><font-awesome-icon icon="rotate"/></button>
            </div>
        </div>
    </div>
    
</template>

<script>
import sound from '@/assets/sounds/beep.ogg'
import beep from '@/assets/sounds/154953__keykrusher__microwave-beep.ogg'
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
            totalTime: 0,
            workRunning: false,
            breakRunning: false,
            workInterval: null,
            breakInterval: null,
            setupTime: 5,
            setupOn: 5,
            setupRunning: false,
            setupInterval: null,
            isPause: false,
        }
    },
    methods: {
        startClock(){
            if(this.isActive){
                this.isActive = false;
                this.setupRunning = true;
            }
            if (this.roundsLeft <= this.totalRounds) {
                if (this.breakRunning) {
                    console.log("break");
                    this.breakInterval = setInterval(() => {
                        this.breakRunning = true;
                        let newTime = this.breakTime - 1;
                        this.breakTime = newTime;
                        if(newTime <= 3 && newTime >= 1) {
                            const audio = new Audio(sound);
                            audio.play();
                        }
                        if (newTime == 0) {
                            const beep2 = new Audio(beep);
                            beep2.play();
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
                        if(newTime <= 3 && newTime >= 1) {
                            const audio = new Audio(sound);
                            audio.play();
                        }
                        if (newTime == 0) {
                            console.log("stop");
                            const beep2 = new Audio(beep);
                            beep2.play();
                            this.stopCurrentInterval();
                            this.workRunning = false;
                            let temp = this.timeOn;
                            this.workTime = temp;
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
                        if(newTime <= 5 && newTime >= 1) {
                            const audio = new Audio(sound);
                            audio.play();
                        }
                        if (newTime == 0) {
                            const beep2 = new Audio(beep);
                            beep2.play();
                            this.stopCurrentInterval();
                            this.setupRunning = false;
                            let temp = this.setupOn;
                            this.setupTime = temp;
                            this.switchScreens("toWork");
                        }
                    }, 1000);
                }
            } else {
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
        startPause(){
            this.isPause = !this.isPause;
            if(this.isPause){
                console.log("break", this.isPause);
                clearInterval(this.workInterval);
                clearInterval(this.breakInterval);
                clearInterval(this.setupInterval);
            } else {
                console.log("work", this.isPause);
                this.startClock();
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
        },
    },
}
</script>

<style scoped>
h1, p {
    margin: 0;
}
.container {
    background-color: #002233;
    height: 100vh;
    width: 100vw;
    padding: 10px;
}
.bg_work {
    background-color: tomato;
}
.bg_break {
    background-color: aquamarine;
}

.container__title {
    text-transform: uppercase;
    font-weight: 700;
    margin: 10px 0 40px 0;
}

/* .form-setting {
    padding: 10px;
    position: relative;
    z-index: 2;
} */
.form__input {
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 20px;
    margin: 10px 0 5px 0;
    background-color: #00334D;
    
    border-radius: 7px;
    color: #fff;

}

.form__input--btn-action {
    width: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.form__input--label {
    font-size: 20px;
    color: #ffff;
    text-transform: uppercase;
    font-weight: 700;
}

.form__input--value {
    width: 50px;
    font-size: 20px;
    font-weight: 700;
}
.btn-action {
    height: 35px;
    width: 35px;
    font-size: 25px;
    /*  */
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-start {
    width: 120px;
    height: 120px;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 100%;
    cursor: pointer;

    background-color: tomato;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 22px;
}

.session-time {
    color: #fff;
    font-size: 50px;
    font-weight: 700;

    margin: 30px 0 40px 0;
}

/* CLOCK */
.timer-wrapper {
    border: 6px solid #1875cc;
    margin: 30px auto 30px;
    text-transform: capitalize;
    border-radius: 50%;
    width: 320px;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.circle-clock {
    width: 320px;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    position: relative;
    z-index: 2;
}
.time-left {
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
    width: 70%;
    margin: 0 auto;
    font-size: 70px;
    color: #ffff;
}

.round-left {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
}

.timer-btn {
    display: flex;
    justify-content: space-evenly;

}
.btn-clock {
    border: none;
    color: white;
    font-size: 24px;
    background-color: transparent;
    cursor: pointer;
}

.progress-ring {
	position: absolute;
	top: 38%;
	left: 50%;
	transform: translate(-50%, -50%);
	/* z-index: -1; */
}

.progress-ring__circle {
	transition: 0.5s;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
	stroke: rgb(51, 65, 255);
}
</style>