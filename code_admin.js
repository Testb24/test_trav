
// async function getData(url = '') {

//   const response = await fetch(url, {
//     method: 'GET',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',

//   });
//   return response.json();
// }

//=======================================================
//=======================================================
//=======================================================

const btn = document.getElementById("charge_btn");
btn.addEventListener("click", transmit_88);

function transmit_88() {
  
  recupere(test_22());
}

async function recupere(wave) {

  // let url_api;
  // url_api ="https://test-trav.herokuapp.com/api/stuff";
  // url_api = "http://localhost:3000/api/stuff/" + wave;
  // console.log(url_api);
  // let choix;
  // choix = "";
  let aaaa;
  // aaaa = await getData(url_api);
  console.log("TEST ICI");
  console.log(data_from_DB);
  aaaa = data_from_DB;
  create_table(aaaa);
// console.log(getData(url_api).result);
// console.log("AAA3");
  // getData(url_api, wave)
  //   .then(data => {
  //     console.log(data)
  //     create_table(data);
  //   });

}

function create_table(data) {
  let noeud = document.getElementById("table_add");

  noeud.innerHTML = "";
  let table_new = document.createElement("TABLE");
  for (let i = 0; i < data.length; i++) {
    data[i];
    table_new.innerHTML +=
      '<td>' + data[i].Vdef_X + '/' + data[i].Vdef_Y + '</td>' +
      '<td>' + data[i].Voff_X + '/' + data[i].Voff_Y + '</td>' +
      '<td>' + data[i].time_server + '</td>' +
      '<td>' + data[i].time_impact + '</td>' +
      '<td>' + data[i].vague + '</td>' +
      '<td>' + data[i].troupes + '</td>' +
      '<td>' + data[i].numero + '</td>' +
      '<td>' + data[i]._id + '</td>';
  }
  noeud.appendChild(table_new);
};


function test_22() {
  let value = 0;

  const aaa1 = document.getElementById("location1");
  if (aaa1.checked == true) { value = 1 }
  const aaa2 = document.getElementById("location2");
  if (aaa2.checked == true) { value = 2 }
  const aaa3 = document.getElementById("location3");
  if (aaa3.checked == true) { value = 3 }
  const aaa4 = document.getElementById("location4");
  if (aaa4.checked == true) { value = 4 }
  const aaa5 = document.getElementById("location5");
  if (aaa5.checked == true) { value = 5 }

  if(value == "5"){value = "4=4"}
  return value;
}