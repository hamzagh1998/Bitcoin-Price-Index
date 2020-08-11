const endpoints = {
  bpi: 'https://api.coindesk.com/v1/bpi/currentprice.json',
  supportedCurrencies: '/vendors/supportedCurrency.json',
  currentPrice: 'https://api.coindesk.com/v1/bpi/currentprice/',
}

const bpiBox = {
  props: {
    bpiObj: {
      type: Object,
    },
    currencies: {
      type: String,
    }
  },
  template: `
    <div col="col-xs-12 col-sm-12 col-md-4">
      <div class="card m-1">
        <div class="card-header">
          {{ bpiObj.code }}
        </div>
        <div class="card-body text-left">
          <p><span class="text-primary">Description: </span>{{ bpiObj.description }}</p>
          <p><span class="text-primary">Rate: </span>{{ bpiObj.rate }}</p>
        </div>
      </div>
    </div>
  `,
}

const header = {
  props: {
    title: {
      type: String,
      default: '',
    },
    bpi: {
      type: Object,
    },
  },
  template: `
    <div class="text-center">
      <h1>{{ title }}</h1>
      <img src="assets/Bitcoin.png" width="100px" height="100px">
      <h3><font color="#f2a900">{{ bpi.chartName }}</font></3>
      <h4><span class="text-warning">Date updated: </span>{{ bpi.time.updated }}<h4>
      <div class="row">
        <!-- CHILD COMPONENT (DRY)-->  
        <bpi-box v-for="(curr, index) in Object.keys(bpi.bpi)" 
        v-bind:key="index"
        v-bind:bpiObj="bpi.bpi[curr]"/>
      </div>
    </div>
  `,
  components: {
    'bpi-box': bpiBox,
  },
}

const app1 = new Vue({
  el: '#app1',
  data: {
    title: 'Bitcoin Price Index',
    bpi: null,
  },
  methods: {
    fetchBdi(url) {
      fetch(url)
      .then(resp => resp.json())
      .then(data => this.bpi = data)
      .catch(err => alert("Can’t access " + url + " response. Blocked by browser?\n"+err))
    }
  },
  created: function(){
    this.fetchBdi(endpoints.bpi)
  },
  components: {
    'header-ui': header,
  }
})
