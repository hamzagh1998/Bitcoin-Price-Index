const currentPriceUi = {
  props: {
    currentprice: {
      type: Object,
    },
    currency: {
      type: String,
      default: '',
    },
    value: {
      type: Number
    }
  },
  template: `
    <div class="card m-1">
      <div class="card-header">
        <h3 align="center">{{ currency }}</h3>
      </div>
      <div class="card-body">
        <p>
          <span class="text-primary">Last update: </span>
          {{ currentprice.time.updated }}
        </p>
        <p>
          <span class="text-primary">Description: </span>
          {{ currentprice.bpi[currency].description }}
        </p>
        <p>
          <span class="text-primary">Rate: </span>
          {{ parseFloat(currentprice.bpi[currency].rate.replace(',', '.')) * value }} {{ currency }}
        </p>
      </div>
    </div>
  `,
}

const selectUi = {
  props: {
    currencies: {
      type: Array,
    },
    currentprice: {
      type: Object,
    },
    currency: {
      type: String,
      default: '',
    },
  },
  template: `
    <div>
      <div class="form-group">
        <label for="currency-selector">Select currency</label>
        <select class="form-control" id="currency-selector" v-on:change="$emit('on-change', $event)">
          <option></option>
          <option v-for="currency in currencies" v-bind:value="currency.currency">
            {{ currency.currency }} - {{ currency.country }}
          </option>
          </select>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="value">
          </div>
      </div>
      <current-price-ui v-if="currentprice && currency"
                        v-bind:currentprice="currentprice"
                        v-bind:currency="currency"  
                        v-bind:value="Number(value)"                
      />
    </div>
  `,
  data() {
    return {
      value: 1,
    }
  },
  components: {
    'current-price-ui': currentPriceUi,
  }
}

const app2 = new Vue({
  el: '#app2',
  data: {
    supportedCurrenciesObj: null, 
    currentPriceObj: null, 
    currency: null, 
    value: 1, 
  },
  methods: {
    fetchCurrencies(url) {
      fetch(url)
        .then(resp => resp.json())
        .then(data => this.supportedCurrenciesObj = data)
        .catch(err => alert("Can’t access " + url + " response. Blocked by browser?\n"+err))
    },
    fetchCurrentPrice(event) {
      this.currency = event.target.value
      fetch(endpoints.currentPrice+this.currency+'.json')
        .then(resp => resp.json())
        .then(data => this.currentPriceObj = data)
    }
  },
  created: function() {
    this.fetchCurrencies(endpoints.supportedCurrencies)
  },
  components: {
    'select-ui': selectUi,
  },
})