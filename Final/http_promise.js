/***************dominio y rutas*******/
/***************dominio y rutas*******/
//coins
//const urlCoins = `${domain}/coins`;
//const methodCoins = "GET";
let getUrlCoins = () => {
  return `${domain}/coins`;
}
let getMethodCoins = () => {
  return "GET";
};

//market
//const urlMarket = `${domain}/market/:coin`;
//const methodMarket = "GET";
let getUrlMarket = () => {
  return `${domain}/market/:coin`;
}
let getMethodMarket = () => {
  return "GET";
};

//historical
//const urlHistorical = `${domain}/historical/:coin/:hours`;
//const methodHistorical = "GET";
let getUrlHistorical = () => {
  return `${domain}/historical/:coin/:hours`;
}
let getMethodHistorical = () => {
  return "GET";
};

//prediction
//const urlPrediction = `${domain}/prediction/:hours`;
//const methodPrediction = "GET";
let getUrlPrediction = () => {
  return `${domain}/prediction/:hours`;
}
let getMethodPrediction = () => {
  return "GET";
};

//info_user
//const urlInfoUser = `${domain}/info_users`;
//const methodInfoUser = "GET";
let getUrlInfoUser = () => {
  return `${domain}/info_users`;
}
let getMethodInfoUser = () => {
  return "GET";
};

//funds
//const urlFunds = `${domain}/funds`;
//const methodFunds = "POST";
let getUrlFunds = () => {
  return `${domain}/funds`;
}
let getMethodFunds = () => {
  return "POST";
};

//buy
//const urlBuy = `${domain}/buy/:coin/:cantidad`;
//const methodBuy = "POST";
let getUrlBuy = () => {
  return `${domain}/buy/:coin/:cantidad`;
}
let getMethodBuy = () => {
  return "POST";
};

//sell
//const urlSell = `${domain}/sell/:coin/:cantidad`;
//const methodSell = "POST";
let getUrlSell = () => {
  return `${domain}/sell/:coin/:cantidad`;
}
let getMethodSell = () => {
  return "POST";
};

//msg list
//const urlList = `${domain}/msg/list`;
//const methodList = "POST";
let getUrlMsgList = () => {
  return `${domain}/msg/list`;
}
let getMethodList = () => {
  return "POST";
};

//msg send
//const urlSend = `${domain}/msg/send`;
//const methodSend = "POST";
let getUrlSend = () => {
  return `${domain}/msg/send`;
}
let getMethodSend = () => {
  return "POST";
};

//msg read
//const urlRead = `${domain}/msg/read/:idMessage`;
//const methodRead = "POST";
let getUrlRead = () => {
  return `${domain}/msg/read/:idMessage`;
}
let getMethodRead = () => {
  return "POST";
};

//msg remove
//const urlMsgRemove = `${domain}/msg/remove/:idMessage`;
//const methodMsgRemove = "POST";
let getUrlMsgRemove = () => {
  return `${domain}/msg/remove/:idMessage`;
}
let getMethodMsgRemove = () => {
  return "POST";
};

//msg remove_all
let getUrlMsgRemoveAll = () => {
  return `${domain}/msg/remove_all`;
}
let getMethodMsgRemoveAll = () => {
  return "POST";
};

class Http {
  constructor() {}

  sendHttp(method, url, data, callback) {
    $.ajax({
      method,
      url,
      data
    }).done((msg) => {
      //console.log("OK",this);
      this.postHttp(msg, callback);
    })//.fail((msg) => {this.postHttp(msg, callback);})
  }
}

class ServicioWeb extends Http {
  constructor() {
    super();
    this.http = new Http();
  }

  preHttp(method, url, bodyObject, callback) {

    if (method !== 'GET') {
      //Peticiones que no son del tipo GET
      bodyObject.token = objetoAutenticacion.token;
      bodyObject.username = objetoAutenticacion.username;
    }
    return new Promise((resolve, reject) => {
      this.sendHttp(method, url, JSON.stringify(bodyObject), (jsonResponse) => {
        (jsonRespons.ok) ? resolve(jsonResponse.data): reject(jsonResponse.msg);
      });
    })

  }

  postHttp(jsonData, callback) {
    console.log(jsonData.ok);
    if (jsonData.ok) {
      console.log("conectado al servidor", jsonData.data);
      callback(undefined, jsonData.data);
    } else {
      console.log("Error conectando al servidor", jsonData.msg);
      callback(jsonData.msg, jsonData.msg);
    }
  }

  coins(callback, forzarActualizacion) {
    //console.log(sessionStorage.getItem("monedas"));
    //console.log(!forzarActualizacion);

    if ((sessionStorage.getItem("monedas")) && (!forzarActualizacion)) {
      console.log("Toma los datos del sessionStorage (monedas)")
      let msg = sessionStorage.getItem("monedas").split(",");

      this.postHttp({
        ok: true,
        data: msg
      }, callback);
      return;
    }

    console.log("Toma los datos del servidor (monedas)")
    console.log(getMethodCoins());
    console.log(getUrlCoins());
    this.preHttp(getMethodCoins(), getUrlCoins(), undefined, callback);
  }

  market(nombreMoneda, callback, forzarActualizacion) {
    if ((sessionStorage.getItem(nombreMoneda)) && (!forzarActualizacion)) {
      console.log(`Toma los datos del sessionStorage (${nombreMoneda})`)
      console.log(sessionStorage.getItem(nombreMoneda));
      let msg = JSON.parse(sessionStorage.getItem(nombreMoneda));
      console.log(msg);
      let data = []
      data.push(msg);
      this.postHttp({
        ok: true,
        data: data
      }, callback);
      return;
    }

    console.log(`Toma los datos del servidor (${nombreMoneda})`)
    let url = getUrlMarket().replace(":coin", nombreMoneda);
    this.preHttp(getMethodMarket(), url, undefined, callback);
  }

  historical(nombreMoneda, numeroHoras, callback) {
    let url = getUrlHistorical().replace(":coin", nombreMoneda).replace(":hours", numeroHoras);
    this.preHttp(getMethodHistorical(), url, undefined, callback);
  }

  prediction(numeroHoras, callback) {
    let url = getUrlPrediction().replace(":hours", numeroHoras);
    this.preHttp(getMethodPrediction(), url, undefined, callback);
  }

  infoUsers(callback) {
    this.preHttp(getMethodInfoUser(), getUrlInfoUser(), undefined, callback);
  }

  funds(callback) {
    let bodyObject = {}
    this.preHttp(getMethodFunds(), getUrlFunds(), bodyObject, callback);
  }

  buy(nombreMoneda, percentCantidad, callback) {
    let url = getUrlBuy().replace(":coin", nombreMoneda).replace(":cantidad", percentCantidad);
    let bodyObject = {}
    this.preHttp(getMethodBuy(), url, bodyObject, callback);
  }

  sell(nombreMoneda, percentCantidad, callback) {
    let url = getUrlSell().replace(":coin", nombreMoneda).replace(":cantidad", percentCantidad);
    let bodyObject = {}
    this.preHttp(getMethodSell(), url, bodyObject, callback);
  }

  list(usuario, callback) {
    let bodyObject = {}
    this.preHttp(getMethodList(), getUrlMsgList(), bodyObject, callback);
  }

  send(destinationUser, message, callback) {
    let bodyObject = {
      destination_user: destinationUser,
      message: message
    }
    this.preHttp(getMethodSend(), getUrlSend(), bodyObject, callback);
  }

  read(idMessage, callback) {
    let url = getUrlRead().replace(":idMessage", idMessage);
    let bodyObject = {}
    this.preHttp(getMethodRead(), url, bodyObject, callback);
  }

  remove(idMessage, callback) {
    let url = getUrlMsgRemove().replace(":idMessage", idMessage);
    let bodyObject = {}
    this.preHttp(getMethodMsgRemove(), url, bodyObject, callback);
  }

  removeAll(callback) {
    let bodyObject = {}
    this.preHttp(getMethodMsgRemoveAll(), getUrlMsgRemoveAll(), bodyObject, callback);
  }

}


export let servicioWeb = {
  ServicioWeb
}