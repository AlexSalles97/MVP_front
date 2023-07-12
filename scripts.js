/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor através da requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/hardwares';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.hardwares.forEach(item => insertList(item.tipo, item.marca, item.modelo, item.valor))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar uma peça na lista do servidor através da requisição POST
    --------------------------------------------------------------------------------------
  */
    const postItem = async (inputType, inputBrand, inputModel, inputPrice) => {
        const formData = new FormData();
        formData.append('tipo', inputType);
        formData.append('marca', inputBrand);
        formData.append('modelo', inputModel);
        formData.append('valor', inputPrice);
      
        let url = 'http://127.0.0.1:5000/hardware';
        fetch(url, {
          method: 'post',
          body: formData
        })
          .then((response) => response.json())
          .catch((error) => {
            console.error('Error:', error);
          });
      }
      
      
      /*
        --------------------------------------------------------------------------------------
        Função para criar um botão close para cada peça da lista
        --------------------------------------------------------------------------------------
      */
      const insertButton = (parent) => {
        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        parent.appendChild(span);
      }
      
      
      /*
        --------------------------------------------------------------------------------------
        Função para remover uma peça da lista de acordo com o click no botão close
        --------------------------------------------------------------------------------------
      */
      const removeElement = () => {
        let close = document.getElementsByClassName("close");
        // var table = document.getElementById('myTable');
        let i;
        for (i = 0; i < close.length; i++) {
          close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const tipoItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm("Você tem certeza?")) {
              div.remove()
              deleteItem(tipoItem)
              alert("Removido!")
            }
          }
        }
      }
      
      /*
        --------------------------------------------------------------------------------------
        Função para deletar uma peça da lista do servidor através da requisição DELETE
        --------------------------------------------------------------------------------------
      */
      const deleteItem = (item) => {
        console.log(item)
        let url = 'http://127.0.0.1:5000/hardware?tipo=' + item;
        fetch(url, {
          method: 'delete'
        })
          .then((response) => response.json())
          .catch((error) => {
            console.error('Error:', error);
          });
      }
      
      /*
        --------------------------------------------------------------------------------------
        Função para adicionar uma nova peça com tipo, marca, modelo e valor 
        --------------------------------------------------------------------------------------
      */
      const newItem = () => {
        let inputType = document.getElementById("newInput").value;
        let inputBrand = document.getElementById("newBrand").value;
        let inputModel = document.getElementById("newModel").value;
        let inputPrice = document.getElementById("newPrice").value;
      
        if (inputType === '') {
          alert("Escreva o nome de uma peça!");
        } else if (inputBrand === '') {
          alert("Escreva o nome de uma marca!");
        } else if (inputModel === '') {
          alert("Escreva o nome de um modelo!");
        } else if (inputPrice === '') {
          alert("Escreva o valor da peça!");
        } else if (isNaN(inputPrice)) {
          alert("Valor precisa ser em números!");
        } else if (confirm("Você tem certeza?")) {
          insertList(inputType, inputBrand, inputModel, inputPrice)
          postItem(inputType, inputBrand, inputModel, inputPrice)
          alert("Peça adicionada!")
        }
      }
      
      /*
        --------------------------------------------------------------------------------------
        Função para inserir peças na lista apresentada
        --------------------------------------------------------------------------------------
      */
      const insertList = (typeHardware, brand, model, price) => {
        var item = [typeHardware, brand, model, price]
        var table = document.getElementById('myTable');
        var row = table.insertRow();
      
        for (var i = 0; i < item.length; i++) {
          var cel = row.insertCell(i);
          cel.textContent = item[i];
        }
        insertButton(row.insertCell(-1))
        document.getElementById("newInput").value = "";
        document.getElementById("newBrand").value = "";
        document.getElementById("newModel").value = "";
        document.getElementById("newPrice").value = "";
      
        removeElement()
      }