<template>
  <nav class="nav">
    <router-link to="/weight" class="nav__link nav__link">
      <font-awesome-icon icon="weight-hanging" size="lg" />
      <span class="nav__text">Weight</span>
    </router-link>
    <router-link to="/stopwatch" class="nav__link nav__link">
      <font-awesome-icon icon="stopwatch" size="lg" />
      <span class="nav__text">Stopwatch</span>
    </router-link>
    <router-link to="/timer" class="nav__link nav__link">
      <font-awesome-icon icon="stopwatch-20" size="lg" />
      <span class="nav__text">Timer</span>
    </router-link>
    <router-link to="/settings" class="nav__link nav__link">
      <font-awesome-icon icon="sliders" size="lg" />
      <span class="nav__text">Settings</span>
    </router-link>
  </nav>
  <router-view />
</template>

<style lang="css">
html,
body {
  margin: 0;
  padding: 0;
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
