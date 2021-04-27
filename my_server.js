async function getData_new_SQL(type) {
    let url_SQL;

    // url_SQL = "https://test-trav.herokuapp.com/sql/travian/s2";
    // url_SQL = "https://trav-server-0-2.herokuapp.com/";
    // url_SQL = "https://git.heroku.com/trav-server-0-2.git"; FALSE

    // url_SQL = "http://localhost:3000/sql/travian/s2";

    url_SQL = url + "/sql/travian/s2";

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