const btn = document.getElementById("SQL_btn");
const btn_find = document.getElementById("find_SQL");

btn.addEventListener("click", dl_map_SQL);
btn_find.addEventListener("click", find_SQL);

const DATA_TEST_TG = `INSERT INTO \`x_world\` VALUES (62,-139,200,1,19596,'Pouancé',2388,'dada49',30,'ALONE',141,null); 
INSERT INTO \`x_world\` VALUES (716,114,199,2,20571,'00A60',586,'stopol',77,'DvG',145,null);
INSERT INTO \`x_world\` VALUES (717,115,199,2,7154,'00 capi',586,'stopol',77,'DvG',491,null);
INSERT INTO \`x_world\` VALUES (1117,114,198,1,20833,'00B60',1880,'loki',77,'DvG',92,null);
INSERT INTO \`x_world\` VALUES (1118,115,198,2,19838,'00A70',586,'stopol',77,'DvG',409,null);
INSERT INTO \`x_world\` VALUES (1124,121,198,1,19982,'00freia',1880,'loki',77,'DvG',152,null);
INSERT INTO \`x_world\` VALUES (1523,119,197,1,18959,'00thor',1880,'loki',77,'DvG',603,null);
INSERT INTO \`x_world\` VALUES (3583,174,192,3,20511,'V 02',3016,'OOOP',171,'N.A',300,null);
INSERT INTO \`x_world\` VALUES (3586,177,192,3,19483,'V 01',3016,'AAAAAAAAAA',171,'N.A',528,null);`

async function dl_map_SQL() {
    // console.log("aaa")
    let olddata = await getData_old_SQL();
    // olddata = olddata.split(',');
    // console.log(typeof (olddata));
    let array = [];
    olddata.forEach(element => {
        array.push(element._id);
    });
    // console.log(array)
    // console.log("AAAZ");

    let DATA_FROM_TG = await getData_new_SQL();
    // let DATA_FROM_TG = DATA_TEST_TG;

    DATA_FROM_TG = ");" + DATA_FROM_TG.replace(/\r|\n/g, '').replace(/\); INSERT INTO `x_world` VALUES \(/g, '\);INSERT INTO `x_world` VALUES \(');
    // DATA_FROM_TG = DATA_FROM_TG;
    // console.log(DATA_FROM_TG)
    let DATA_FROM_TG_ARRAY = DATA_FROM_TG.split(');INSERT INTO `x_world` VALUES (');
    DATA_FROM_TG_ARRAY[0] = DATA_FROM_TG_ARRAY[0].substring(34);
    // console.log(DATA_FROM_TG_ARRAY);
    let aaa = DATA_FROM_TG_ARRAY.shift();
    console.log(DATA_FROM_TG_ARRAY);
    let testYY;
    // testYY = [DATA_FROM_TG_ARRAY[0]];
    testYY = DATA_FROM_TG_ARRAY;
    // console.log(testYY);
    // let testa = "156630,39,-190,3,19716,'102. BoulZ TowN',2880,'Magicmush',0,'',108,null";
    // testYY = [testa];
    // console.log(testYY);
    let d = new Date();
    let test_date = d.getDate() + "/" + (d.getMonth() + 1);
    console.log(test_date);


    testYY.forEach(element => {
        element = element.split(',');
        // console.log(element);
        // console.log("aaa")
        if (!array.includes(parseInt(element[4]))) {

            console.log("faut enregistrer");
            // let ERROR_test = element[5];
            // console.log(ERROR_test);
            if (element[5] != "") { element[5] = element[5].substring(1, element[5].length - 1) }
            // if(element[7]!=""){element[5].substring(1, element[5].length - 1)}
            // if(element[9]!=""){element[5].substring(1, element[5].length - 1)}

            // let test_date = getDate();
            // console.log(test_date);

            let element_attaque = {
                F: element[0],
                X: element[1],
                Y: element[2],
                T: element[3],
                _id: element[4],
                Vn: element[5],
                Uid: element[6],
                Un: element[7].substring(1, element[7].length - 1),
                Aid: element[8],
                An: element[9].substring(1, element[9].length - 1),
                Pop: [{p : element[10], d : test_date}]
            };

            // console.log(element_attaque);
            // console.log(element_attaque);
            // console.log(element);
            let url_api;
              url_api ="https://test-trav.herokuapp.com/test/sql/s2";
            // url_api = "http://localhost:3000/test/sql/s2";

            postData_SQL(url_api, element_attaque)
                .then(data => {
                    // console.log(data); // JSON data parsed by `data.json()` call
                });

        } else {
            // console.log("aaa")
            console.log("faut maj");
            element[10] = {test_date : element[10]};

            let element_attaque = {
                F: element[0],
                X: element[1],
                Y: element[2],
                T: element[3],
                _id: element[4],
                Vn: element[5],
                Uid: element[6],
                Un: element[7].substring(1, element[7].length - 1),
                Aid: element[8],
                An: element[9].substring(1, element[9].length - 1),
                Pop: [{p : element[10], d : test_date}]
            };

            // url_api = "http://localhost:3000/test/sql/s2";
            url_api ="https://test-trav.herokuapp.com/test/sql/s2";

            updateDATA_SQL(url_api, element_attaque)
                .then(data => {
                    // console.log(data); // JSON data parsed by `data.json()` call
                });
        }
    });

};

async function getData_new_SQL() {
    let url_SQL;
    // url_SQL = "https://ts2.travian.fr/map.sql";
    // url_SQL = "https://test-trav.herokuapp.com/test/sql";
    url_SQL = "https://test-trav.herokuapp.com/sql/travian/s2";
    // url_SQL = "https://test-trav.herokuapp.com/test/sql";
    // url_SQL = "http://localhost:3000/sql/travian/s2";

    const response = await fetch(url_SQL, {
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
    // console.log(response);
    // console.log(response.json());
    return response.text();
};

async function getData_old_SQL() {
    let url_SQL;
    // url_SQL = "https://ts2.travian.fr/map.sql";
    // url_SQL = "https://test-trav.herokuapp.com/test/sql";
    url_SQL = "https://test-trav.herokuapp.com/sql/mongo/s2";
    // url_SQL = "https://test-trav.herokuapp.com/test/sql";
    // url_SQL = "http://localhost:3000/sql/mongo/s2";

    const response = await fetch(url_SQL, {
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
    // console.log(response);
    // console.log(response.json());
    return response.json();
};

// Example POST method implementation:
async function postData_SQL(url = '', data = {}) {
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
    console.log("data_saved")
    return response.json(); // parses JSON response into native JavaScript objects
}

async function updateDATA_SQL(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
    console.log("data_changed")
    return response.json(); // parses JSON response into native JavaScript objects
}

// ===================================================================
// ===================================================================

// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }

// const fs = require('fs');

const BTN_TEST = document.getElementById("BTN_TEST");
const FIELD_TEST = document.getElementById("FIELD_TEST");
// const content = fs.readFileSync('./test_map_sql.sql');

BTN_TEST.addEventListener('click', test_fct);
// BTN_TEST.addEventListener('change', loadFile2(this.files[0]));

async function test_fct() {

    let field = document.getElementById("FILE_TEST").files[0];
    let field_content = await field.text();

    // console.log(field_content);
    // console.log(typeof (field_content));

    field_content = ");  " + field_content.replace(/\r|\n/g, ' ');
    // console.log(field_content);

    let field_content_array = field_content.split(');  INSERT INTO `x_world` VALUES (');
    // console.log(field_content_array);
    // console.log(typeof (field_content_array));
    field_content_array.shift();
    console.log(field_content_array);
    // console.log(typeof (field_content_array));

    // envoie_nouvelle_BDD(field_content_array);

    // field_content_array.forEach(element => {
    //     let attaque = element;
    //     // console.log(element);
    //     let url_api;
    //     // url_api = "https://test-trav.herokuapp.com/api/test";
    //     url_api = "http://localhost:3000/api/test";

    //     postData(url_api, element)
    //         .then(data => {
    //             console.log(data); // JSON data parsed by `data.json()` call
    //         });
    // });

}

// function envoie_nouvelle_BDD(array_data) {

//     let data = array_data;

//     data.forEach(element => {
//         let attaque = element;

//         let url_api;
//         url_api = "https://test-trav.herokuapp.com/api/sql";
//         // url_api = "http://localhost:3000/api/stuff";

//         postData(url_api, element)
//             .then(data => {
//                 console.log(data); // JSON data parsed by `data.json()` call
//             });
//     });

// }

// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }