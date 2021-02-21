<template>
  <b-container  class="mt-4">
    <b-row>
      <b-col class="text-left">
        <slot id="slot"></slot>
      </b-col>
  
      <b-col class="text-center" style="font-size: 20px">
        <span>SIS</span><span style="color:#b87446;">CØFFEE</span>
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
  
  i,a{
    font-size: 2em;
    color: #f1ece2;
  }
  i:nth-child(2), a{
    margin-left: 0.8em;
  }
  i:hover, a:hover{
    color: #f1e5d1cb;
    cursor: pointer;
  }

  @media (max-width: 575.98px) { 
    i, a{
      font-size: 1.7em!important;
    }
  }
  
</style>
