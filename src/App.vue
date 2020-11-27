<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer/index";
import Header from "./components/Header/index";
export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
};
</script>

<style lang="less" scoped>
</style>
