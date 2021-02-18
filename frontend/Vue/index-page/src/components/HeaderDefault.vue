<template>
  <b-container class="mt-4">
    <b-row>
      <b-col class="text-left">
        <slot id="slot"></slot>
      </b-col>
      <b-col class="text-right">
        <span>{{time}}</span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "HeaderDefault",
    data() {
      return {
        time: ""
      }
    },
    methods: {

    },
    beforeCreate(){
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
  span{
    color: #F1E5D1;
  }

  i{
    font-size: 2em;
    color: #F1E5D1;
  }
  i:nth-child(2){
    margin-left: 0.8em;
  }
  i:hover{
    cursor: pointer;
  }
</style>
