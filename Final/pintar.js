function pintarTabla(idHtml,data,options){
  console.log(data);
  //let tabla=document.getElementById(idHtml);
  //usamos jQuery para acceder al DOM
  let tabla=$("#"+idHtml);

  let codigoHTML ="<tr>" 

  for(let elementoCabecera of options.cabecera){
    codigoHTML +=`<th>${elementoCabecera}</th>`
  }
  codigoHTML +="</tr>" 

  tabla.html(codigoHTML);

  for(let elementoData of data){
    codigoHTML =(options.id) ?  `<tr id=${elementoData[options.id]}>`:"<tr>";
    //Comprobar si viene en el objeto option más atributo para añadirlos como eventos

    for(let elementocolumnas of options.columnas){
      codigoHTML +=`<td>${elementoData[elementocolumnas]}</td>`;
    }
    codigoHTML +="</tr>";

    tabla.html(tabla.html() + 
    codigoHTML);
  }
}

export let pintar = { pintarTabla }