'use strict';

let dataDetail=[];

Vue.component('product', {
    props: ['image','title','price','id'],
    template: `
    <div class="col s4 m2" >
        <div  class="card card-height" >
            <div class="card-image">
                <img :src="image">
                <span class="card-title"></span>
                <a id="btn"class="btn-floating halfway-fab waves-effect waves-light red"><i v-on:click="detailsProductosCare(id)" class="material-icons">add_shopping_cart</i></a>
            </div>
        <div id="product-card" class="card-content">
            <p id="pro-title" >{{ title }}</p>
            <p class="price">$ {{ price }}.00</p>
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
                    // console.log(response);
                    printingDetails(response);
                })
                .fail(()=>{
                    console.log("error");
                })
            
        }
    }
})

// PRUEBA DEL COMPONENTE PARA MOSTRAR LOS DETALLES
// Vue.component('detailsProduct', {
//     props: ['image','title','price'],
//     template:
//     `<h3>{{ title}}</h3>
//     <h6>{{ price }}</h6>
//     <div class="carousel">
//         <a class="carousel-item" href="#one!"><img :src="image"></a>
//         <a class="carousel-item" href="#two!"><img :src="image"></a>
//         <a class="carousel-item" href="#three!"><img :src="image"></a>
//         <a class="carousel-item" href="#four!"><img :src="image"></a>
//         <a class="carousel-item" href="#five!"><img :src="image"></a>
//     </div>`

// })




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
    }
})


function printingDetails(element){
    // console.log(element);
    let productName = element.title;
    // console.log(productName);
    let productPrice = element.price;
    let image1= element.pictures[0].url;
    console.log(image1);

    let template = `<div id="content-template">
    <div class="row">
          <div class="slider offset-m1 offset-l1 col s12 m6 l6">
              <ul class="slides">
                <li>
                  <img src="${image1}"> 
                </li>
                <li>
                  <img src="${image1}"> 
                </li>
                <li>
                  <img src="${image1}">
                </li>
                <li>
                  <img src="${image1}">
                </li>
              </ul>
            </div>
            <div id="data-product" class="col s12 m4">
              <h4>${productName}</h4>
              <h5>$${productPrice}.00</h5>
              <img src="${image1}">
            </div>
    </div>
    
  </div>`;
 
  $('#detail-product').append(template);
//   console.log($('#detail-product'));



    
}



document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, true);
    $("#detail-product").empty();
  });

  