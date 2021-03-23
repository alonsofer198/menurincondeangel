var productosSeleccionados = []


function create_promociones() {
  // promociones
  let promociones = document.querySelector("#promociones")  
  let lista_promociones = ``
  cartaLista.map(plato => {

    if(plato.promocion == true) {
      lista_promociones += `<div class="col-3"><div class="row">
          <div class="col-6">
            <img width="130px" src="images/${plato.id}.jpg" >
          </div>
          <div class="col-6">
            <div class="tipo-menu">${plato.nombre}</div>
          
            <div class="precio">S/.${plato.precio}</div>
            <div>
              <input id="cantidad_${plato.id}" type="text" value="1" />
              <button type="button" class="btn btn-info btn btn-outline-dark" value="ECONOMICO" onclick="agregar_producto('${plato.id}')" class="agregar"><i class="bi bi-cart-plus"></i></button>
            </div>    
          </div>
        </div>
      </div>`
    }
  })

  promociones.innerHTML = lista_promociones
}

function create_carta() {
  // carta
  let carta = document.querySelector("#carta")  
  let lista_carta = ``
  cartaLista.map(plato => {
    if(plato.promocion == false) {
      lista_carta += `<div class="row mb-3">
        <div class="col-auto">
          <img width="150px" src="images/${plato.id}.jpg" >
        </div>
        <div class="col-5">
          <div class="tipo-menu">${plato.nombre}</div>
        </div>
        <div class="col-4">
          <div class="precio">S/.${plato.precio}</div>
          <div>
              <input id="cantidad_${plato.id}" type="text" value="1" />
              <button type="button" class="btn btn-info btn btn-outline-dark" value="ECONOMICO" onclick="agregar_producto('${plato.id}')" class="agregar">Agregar Pedido</button>
            </div>
        </div>
      </div>`
    }
  })

  carta.innerHTML = lista_carta
}


function create_categorias() {
  let categorias = document.querySelector("#categorias")
  let lista_cate = ``

  _.map(_.groupBy(cartaLista, 'categoria'), (item, c) => {
      lista_cate += `<li class=" list-group-item d-flex justify-content-between align-items-center list-group-item"><a href="#entradas-marinas">${c}</a><span class="badge bg-danger rounded-pill">${item.length}</span></li>`
  })

  categorias.innerHTML = lista_cate
}

function update_seleccion() {
  let lista_seleccion = []
  let pedidos = document.querySelector(`#pedidos`)

  if(productosSeleccionados.length < 0) {
    if (document.cookie.split(';').some(function(item) {
    productosSeleccionados =  JSON.parse(item.trim().indexOf('productosSeleccionados=') == 0)
    })) {
      console.log('Nuevo pedido')
    }
  }

  
  productosSeleccionados.map(plato => {
    lista_seleccion += `<div class="col-12"><div class="row">
        <div class="col-6">
          <img width="130px" src="images/${plato.id}.jpg" >
        </div>
        <div class="col-6">
          <div class="tipo-menu">${plato.nombre}</div>
        
          <div class="precio">S/.${plato.precio}</div>
          <div>
            <input id="cantidad_${plato.id}" type="text" value="${plato.cantidad}" />
            <button @onclick="create_seleccion('${plato.id}')" type="button" class="btn btn-info btn btn-outline-dark" value="ECONOMICO" onclick="agregar_producto('${plato.id}'')" class="agregar">Actualizar</button>
          </div>              
        </div>
      </div>
    </div>`      
  })

  pedidos.innerHTML = lista_seleccion

}

function agregar_producto(producto_id) {
  
  let cantidad = document.querySelector(`#cantidad_${producto_id}`)
  let producto = cartaLista.find(item => {
    return item.id === producto_id
  })
  console.log(producto_id,producto)
  producto.cantidad = cantidad.value

  productosSeleccionados.push(producto)
  console.log(productosSeleccionados)
  document.cookie = `productosSeleccionados=${(JSON.stringify(productosSeleccionados))}`

  update_seleccion()
}