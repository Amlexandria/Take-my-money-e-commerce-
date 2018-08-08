// 'use strict';

Vue.component('product', {
    props: ['image','title','id'],
    template: `
    
    <div class="col s4 m2" v-on:click="detailsProductosCare(id)">
      <div class="card">
        <div class="card-image">
        <a href=""><img :src="image"></a>
          <span class="card-title"></span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
        </div>
        <div class="card-content">
          <p>{{ title}}</p>
        </div>
      </div>
    </div>
    `,
    methods: {
        detailsProductosCare: function (id){
            console.log(id);
            

                $.ajax({
                    url:`https://api.mercadolibre.com/items/${id}`,
                    type: 'GET',
                    datatype: 'json',
                })
                .done((response)=>{
                    console.log(response);
                    // this.products = response.results;
                })
                .fail(()=>{
                    console.log("error");
                })
            
        }
    }
//     template: `
//     <div class="card col s2">
//     <div class="card-image waves-effect waves-block waves-light">
//       <img class="activator" :src="image">
//     </div>
//     <div class="card-content">
//       <span class="card-title activator grey-text text-darken-4">{{ title }}<i class="material-icons right">more_vert</i></span>
      
//     </div>
//     <div class="card-reveal">
//       <span class="card-title grey-text text-darken-4">{{ title }}<i class="material-icons right">close</i></span>
//       <p>Here is some more information about this product that is only revealed once clicked on.</p>
//     </div>
//   </div>
//   `
})

const app = new Vue ({
    el: '#vue',
    data: {
        products:[],

    },
    methods: {
        
        ajaxPersonalCare: function (){

            $.ajax({
                url:'https://api.mercadolibre.com/sites/MLA/search?q=lush%20cosmetics',
                type: 'GET',
                datatype: 'json',
            })
            .done((response)=>{
                console.log(response);
                this.products = response.results;
            })
            .fail(()=>{
                console.log("error");
            })
        }
    },

        

})

// app.ajaxPersonalCare();