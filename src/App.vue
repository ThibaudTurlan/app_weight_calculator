<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">StopWatch</router-link>
  </nav> -->
  <!--  -->
  <nav class="nav">
    <router-link to="/weight" class="nav__link nav__link">
      <font-awesome-icon icon="weight-hanging" size="xl" />
      <span class="nav__text">Weight</span>
    </router-link>
    <router-link to="/stopwatch" class="nav__link nav__link">
      <font-awesome-icon icon="stopwatch" size="xl" />
      <span class="nav__text">stopwatch</span>
    </router-link>
    <router-link to="/timer" class="nav__link nav__link">
      <font-awesome-icon icon="hourglass-clock" size="xl" />
      <span class="nav__text">Timer</span>
    </router-link>
    <router-link to="/settings" class="nav__link nav__link">
      <font-awesome-icon icon="sliders" size="xl" />
      <span class="nav__text">settings</span>
    </router-link>
  </nav>
  <!--  -->
  <router-view />
</template>

<style lang="css">
html,
body {
  margin: 0;
  padding: 0;
  /* background-color: #d95550; */
  /* background-color: #42b983; */
  /* font-family: sans-serif; */
  /* color: #fff; */
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* nav a.router-link-exact-active {
  color: #42b983;
} */

.nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 55px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    display: flex;
    overflow-x: auto;
}

.nav__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    font-family: sans-serif;
    font-size: 13px;
    color: #444444;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.1s ease-in-out;
}

.nav__link:hover {
    background-color: #eeeeee;
}

.nav__link.router-link-exact-active{
    color: #009578;
}

.nav__icon {
    font-size: 18px;
}

</style>
