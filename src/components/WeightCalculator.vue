<template>
  <main>
    <h1>calculate items</h1>
    <form action="" method="POST">
      <input type="text" name="charge" v-model="charge" id="charge" placeholder="value" />
      <select name="pets" v-model="percent" id="select-items" > 
        <option value="" selected disabled hidden>Choose</option>
        <option value="0.70" >70%</option>
        <option value="0.75">75%</option>
        <option value="0.80">80%</option>
        <option value="0.85">85%</option>
        <option value="0.90">90%</option>
        <option value="0.95">95%</option>
        <option value="1">100%</option>
      </select>
      <button type="button" id="btn-calc" @click="weightCalc()">
        calculate
      </button>
    </form>
    <hr />
    <div id="block-result">
        <ul>
          <li v-for="item in listResult" :key="item">
            {{ item.items * 100 }} % - {{ item.weight }} kg 
          </li>
        </ul>
    </div>  
  </main>
</template>

<script>
export default {
  data() {
    return {
      charge: 20,
      percent: 0,
      listResult: [],
      percentArray: [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
    };
  },
  methods: {
    weightCalc() {
      this.listResult = [];
      if (this.percent > 0) {
        this.percentArray.forEach((items) => {
          let weight = parseInt((this.charge * items) / this.percent);
  
          this.listResult.push({weight, items});
          // console.log(items + " " + weight);
        });

      }
    },
  },
};
</script>

<style scoped>

main {
  width: 350px;
  margin: 0 auto;
  padding: 10px;
}

h1 {
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
}

form {
  border-radius: 5px;
  /* background-color: #dd6662; */
  background-color: #77c2a0;
  padding: 15px;
}

#charge {
  width: 70%;
  padding: 7px 20px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
}

select {
  width: 28%;
  padding: 6px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input:focus,
select:focus{
  outline: none;
}

select::after{
  background: rgb(206, 206, 206);
  border: 2px solid green;  
}
select::after, select:hover::after, select:hover {
  /* background: red;
  color: green; */
}
.no-pointer-events select:after {
  content: none;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul li {
  /* color: black; */
  /* border: 1px solid #ddd; */
  margin-top: 0px;
  /* background-color: #f6f6f6; */
  background-color: #77c2a0;
  padding: 12px;
  /* 	border-radius: 5px; */
}

#btn-calc {
  width: 100%;
  height: 33px;
  display: block;

  background-color: #fff;
  /* color: #dd6662; */
  color: #42b983;
  font-size: 16px;
  margin-top: 10px;

  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  -webkit-box-shadow: rgb(235 235 235) 0px 6px 0px;
  box-shadow: rgb(235 235 235) 0px 6px 0px;
}

#block-result {
  border-radius: 5px;
}
</style>