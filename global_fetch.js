window.addEventListener('load', load_data)

let data_from_DB;

async function load_data() {
    let url_DATA;
    url_DATA = "https://test-trav.herokuapp.com/api/stuff";
    // url_DATA = "http://localhost:3000/api/stuff/" + wave;


    data_from_DB = await getData(url_DATA);
    console.log("TEST DATA GLOBALE");
    console.log(data_from_DB);
};

async function getData(url = '') {

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',

    });
    return response.json();
}