const btn = document.getElementById("btn");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const email_doc = document.getElementById("email");
const name_doc = document.getElementById("name");
const pass_doc = document.getElementById("pass");

btn.addEventListener("click", Inscription);
btn2.addEventListener("click", Connexion);
btn3.addEventListener("click", test_function);


async function Inscription() {
    console.log("aaa1");
    console.log(this);
    this.loading = true;
    // const email = this.signupForm.get('email').value;
    const email = email_doc.value;
    // const password = this.signupForm.get('password').value;
    const pass = pass_doc.value;
    const name = name_doc.value;
    // console.log(this);
    let qqq = await createNewUser(email, pass, name);
    console.log(qqq);

}

async function createNewUser(email, password, name) {
    // return new Promise((resolve, reject) => {
    // //   this.http.post(
    // //     'http://localhost:3000/api/auth/signup',
    // //     { email: email, password: password })
    // //     .subscribe(
    // //       () => {
    // //         this.login(email, password).then(
    // //           () => {
    // //             resolve();
    // //           }
    // //         ).catch(
    // //           (error) => {
    // //             reject(error);
    // //           }
    // //         );
    // //       },
    // //       (error) => {
    // //         reject(error);
    // //       }
    // //     );
    // });
    const obj = {
        email: email,
        password: password,
        name: name
    }
    console.log(obj);

    const response = await fetch('http://localhost:3000/api/auth/signup', {
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
        body: JSON.stringify(obj) // body data type must match "Content-Type" header
    });

    return response.json()
}

async function Connexion() {

    console.log("2");
    let testr;
    testr = await login();
    console.log(testr);
}

async function login() {

    let email = email_doc.value;
    let password = pass_doc.value;
    // email = "AA";
    // password = "QQ";

    const obj = {
        email: email,
        password: password
    }

    const response = await fetch('http://localhost:3000/api/auth/login', {
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
        body: JSON.stringify(obj) // body data type must match "Content-Type" header
    });

    return response.json()
}

async function test_function() {

    let testr = await login();
console.log(testr)

    const token = testr.token;
    const user = testr.userId;
    const name = testr.name;

    localStorage.setItem('token', token);
    localStorage.setItem('name', name);

    update_name();

    let tempa = await get_test(localStorage.getItem('token'));

    console.log(tempa);

}
async function get_test(token, user) {

    const response = await fetch('http://localhost:3000/api/stuff', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify({userId: user }) // body data type must match "Content-Type" header
    });

    return response.json()
};

function update_name() {
    console.log('er')
    const name_place = document.getElementById("name_place");
    console.log(localStorage.getItem('name'))
    if(localStorage.getItem('name') == "undefined"){
        name_place.innerText = "Non connecté"
    } else {
        name_place.innerText = localStorage.getItem('name')
    }
    
    name_place.style.visibility = "visible"
}