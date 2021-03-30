// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


const btn = document.getElementById("btn_validate");
const field1_content = document.getElementById("field1");

// console.log(field1_content.value);

btn.addEventListener("click", envoie);

function envoie() {

  const attack_field = document.getElementById("field1");
  // let url, data;
  // postData(url, data);
  // console.log(field1_content2)
  // console.log(result_from_parse);
  let data = change_format_attaque(Parse_PR(attack_field.value));

  // console.log(data[0]);
  data.forEach(element => {
    let attaque = element;
    // console.log(element);

    postData('http://localhost:3000/api/stuff', element )
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      });
  });

}