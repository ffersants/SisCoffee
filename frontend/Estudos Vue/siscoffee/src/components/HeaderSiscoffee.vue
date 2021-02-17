<template>
  <div>
    <slot></slot>
    <p id="time">{{time}}</p>
  </div>
</template>

<script>
export default {
  name: "HeaderSiscoffee",
  data(){
    return {
      time: ""
    }
  },
  created(){
    setInterval(() => {
            let date = new Date().toLocaleDateString("pt-br", {
                dateStyle: 'short'
            });
            let weekday = new Date().toLocaleDateString("pt-br", {
                weekday: 'short'
            });
            let time = new Date().toLocaleTimeString("pt-br", {
                timeStyle: 'short',
                hour12: false
            });
            
            weekday = weekday[0].toUpperCase() + weekday.substr(1, 2) 
            
            this.time = `${date} ${weekday} ${time}`
        }, 1000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
    background-color:#35373E;
    width: 100vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: 8em;
    padding-right: 8em;
  }
  #time{
    color: white;
  }

</style>
