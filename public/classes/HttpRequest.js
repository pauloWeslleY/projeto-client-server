class HttpRequest {

   static get(url, params = {}) {

      return HttpRequest.request('GET', url, params);

   }
   static delete(url, params = {}) {

      return HttpRequest.request('DELETE', url, params);

   }
   static put(url, params = {}) {

      return HttpRequest.request('PUT', url, params);

   }
   static post(url, params = {}) {

      return HttpRequest.request('POST', url, params);

   }
   // todo Método static permite q a gente chame ele diretamente sem ter que cria uma instância!!!!
   static request(method, url, params = {}) {

      return new Promise((resolve, reject) => {

         let ajax = new XMLHttpRequest();
         ajax.open(method.toUpperCase(), url);
         ajax.onerror = err => {
            reject(err);
         };
         ajax.onload = event => {
            let obj = {};
            try {
               obj = JSON.parse(ajax.responseText);
            } catch (err) {
               reject(err);
               console.error(err);
            }
            resolve(obj);
         };
         // * A primeira linha define uma configuração de cabeçalho da requisição.No caso, estamos definindo qual será o tipo de conteúdo, um JSON.Isso é necessário para uma melhor leitura dos dados enviados
         ajax.setRequestHeader('Content-Type', 'application/json');
         // * A segunda linha é a responsável por enviar os dados, que serão transformados em uma string JSON
         ajax.send(JSON.stringify(params));

      });

   }

}