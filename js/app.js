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
                <a id="btn"class="btn-floating halfway-fab waves-effect waves-light red" href="#"><i v-on:click="detailsProductos(id)" class="material-icons">add</i></a>
            </div>
        <div id="product-card" class="card-content">
            <p id="pro-title" >{{ title }}</p>
            <p class="price">$ {{ price }}.00</p>
        </div>
        </div>
    </div>
    `,
    methods: {
        detailsProductos: function (id){
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
        
        ajaxProducts: function (endpoint){

            $.ajax({
                url:`https://api.mercadolibre.com/sites/MLA/search?q=${endpoint}`,
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

    let template = `
    <div id="content-template">
        <div class="row">
            <div class="slider offset-m1 offset-l1 col s12 m6 l6">
                <img src="${image1}">
            </div>
            <div id="data-product" class="col s12 m3">
              <h4>${productName}</h4>
              <h5>$${productPrice}.00</h5>
              <div id="paypal-detail"></div> 
            </div>
            <a href="#" onClick="cleanAreaOfProductsDetails()"><i class="material-icons close col m1" >close</i></a>
        </div>
    </div>`;

// POR UNA EXTRAÑA RAZÓN NO SE MUESTRAN LAS IMÁGENES (a pesar de que en consola "se ve" que existen)
    // let template = `
    // <div id="content-template">
    //     <div class="row">
    //         <div class="slider offset-m1 offset-l1 col s12 m6 l6">
    //             <ul class="slides">
    //                 <li>
    //                     <img src="${image1}"> 
    //                 </li>
    //                 <li>
    //                     <img src="${image1}"> 
    //                 </li>
    //                 <li>
    //                     <img src="${image1}">
    //                 </li>
    //                 <li>
    //                     <img src="${image1}">
    //                 </li>
    //             </ul>
    //         </div>
    //         <div id="data-product" class="col s12 m3">
    //           <h4>${productName}</h4>
    //           <h5>$${productPrice}.00</h5>
    //           <div id="paypal-button"></div> 
    //         </div>
    //         <a href="#" onClick="cleanAreaOfProductsDetails()"><i class="material-icons close col m1" >close</i></a>
    //     </div>
    // </div>`;
 
  $('#detail-product').append(template);
  paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
      sandbox: 'AVV84egHJKjWrgThBBOUtGVCnjbwobr25B_2wac2NVT89ldyC2QmxxMTJ94YMlk5p-kWD6VWo3yTLpE2',
      production: 'demo_production_client_id'
    },
    // Customize button (optional)
    locale: 'en_US',
    style: {
      size: 'small',
      color: 'gold',
      shape: 'pill',
    },
    // Set up a payment
    // Set up a payment
  payment: function (data, actions) {
    return actions.payment.create({
      transactions: [{
        amount: {
          total: productPrice,
          currency: 'MXN',
          
        },
        description: 'The payment transaction description.',
        custom: '90048630024435',
        //invoice_number: '12345', Insert a unique invoice number
        payment_options: {
          allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
        },
        soft_descriptor: 'ECHI5786786',
        item_list: {
          items: [
            {
              name: productName,
              quantity: '1',
              price: productPrice,
              currency: 'MXN'
            },
            
          ],
          shipping_address: {
            recipient_name: 'Brian Robinson',
            line1: '4th Floor',
            line2: 'Unit #34',
            city: 'San Jose',
            country_code: 'US',
            postal_code: '95131',
            phone: '011862212345678',
            state: 'CA'
          }
        }
      }],
      note_to_payer: 'Contact us for any questions on your order.'
    });
  },
    // Execute the payment
    onAuthorize: function (data, actions) {
      return actions.payment.execute()
        .then(function () {
          // Show a confirmation message to the buyer
          window.alert('Thank you for your purchase!');
        });
    }
  }, '#paypal-detail');
}



  
function cleanAreaOfProductsDetails (){
    $("#detail-product").empty();
}



document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, true);
    
    paypal.Button.render({
        env: 'sandbox',
        client: {
          sandbox: 'AVV84egHJKjWrgThBBOUtGVCnjbwobr25B_2wac2NVT89ldyC2QmxxMTJ94YMlk5p-kWD6VWo3yTLpE2',
        },
        payment: function (data, actions) {
          return actions.payment.create({
            transactions: [{
              amount: {
                total: '500000.00',
                currency: 'MXN'
              }
            }]
          });
        },
        onAuthorize: function (data, actions) {
          return actions.payment.execute()
            .then(function () {
              window.alert('Thank you for your purchase!');
            });
        }
      }, '#paypal-button');

    
  });

  