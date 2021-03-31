const btn_validate_trav = document.getElementById("btn_validate_trav");

btn_validate_trav.addEventListener("click", post_attack);

function post_attack() {


  envoie("attack_field");

  const attack_field = document.getElementById("attack_field");

  var test = change_format_attaque(Parse_PR(attack_field.value));

  const results = document.getElementById("results");
  let results_child = document.createElement("TR");

  // console.log("aaa : " + test.length);
  for (let i = 0; i < test.length; i++) {
    results_child.innerHTML +=
      '<td>' + test[i].Vdef_X + '/' + test[i].Vdef_Y + '</td>' +
      '<td>' + test[i].Voff_X + '/' + test[i].Voff_Y + '</td>' +
      '<td>' + test[i].time_server + '</td>' +
      '<td>' + test[i].time_impact + '</td>' +
      '<td>' + test[i].vague + '</td>';
  }

  results.appendChild(results_child);

}

function Parse_PR(pr) {

  var pr = pr.replace(/\u2212/g, "-").replace(/\r|\n/g, ' ').replace(/[^\x20-\xFF]+/g, '').replace(/\s\s+/g, ' ');
  // console.log(pr);
  if (pr == "") { return "pr vide en entrée" };
  //=============  TEMP SERVEUR  ========================
  var temp = pr.match(/Heure du serveur: (\d{1,2}):(\d{2}):(\d{2})/);

  var time_server = new Date();

  time_server.setSeconds(temp[3])
  time_server.setMinutes(temp[2])
  time_server.setHours(temp[1])
  time_server.setMilliseconds(0)

  //=============  VIVI OFF : X / Y  ========================
  var re_one = new RegExp('attaque (.{1,20}) \\((-*\\d{1,3})\\|(-*\\d{1,3})\\).{110,180} {0,1}([?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}] {0,1}[?\\d{1,2}]) Arrivée {0,1}dans (\\d{1,2}):(\\d{1,2}):(\\d{1,2}) h {0,1}à (\\d{1,2}):(\\d{1,2}):(\\d{1,2})')
  var Attaque = ["Attaque"]

  var re = new RegExp('attaque (.{1,20}) \\(-*\\d{1,3}\\|-*\\d{1,3}\\).{110,200} Arrivée {0,1}dans \\d{1,2}:\\d{1,2}:\\d{1,2} h {0,1}à \\d{1,2}:\\d{1,2}:\\d{1,2}', 'g')
  var pr_attaque = pr.match(re)

  var i = 0;
  for (i = 0; i < pr_attaque.length; i++) {
    var temp = pr_attaque[i].match(re_one)
    var Nom_Village = temp[1]
    var Voff_X = parseInt(temp[2].replace(" ", ''), 10);
    var Voff_Y = parseInt(temp[3].replace(" ", ''), 10);
    var troupes = temp[4];
    var dans_hour = temp[5];
    var dans_min = temp[6];
    var dans_sec = temp[7];
    var time_impact_hour = temp[8];
    var time_impact_min = temp[9];
    var time_impact_sec = temp[10];

    var time_impact = new Date(time_server.getTime() + 3600 * 1000 * temp[5] + 60 * 1000 * temp[6] + 1000 * temp[7]);
    time_impact.setMilliseconds(0)

    var re2 = new RegExp('\\(-*\\d{1,3}\\|-*\\d{1,3}\\) {1,10}' + Nom_Village + ' {1,10}\\((-*\\d{1,3})\\|(-*\\d{1,3})\\)')
    var tempre = pr.match(re2)

    if (tempre == null) {

      var re3 = new RegExp('Villages: \\d{1,2}\\/\\d{1,2}.' + Nom_Village + ' {1,10}\\((-*\\d{1,3})\\|(-*\\d{1,3})\\)')
      var tempre = pr.match(re3)
    }
    // console.log(tempre)
    // console.log(tempre[1])
    // console.log(tempre[2])
    var Vdef_X = parseInt(tempre[1].replace(" ", ''), 10)
    var Vdef_Y = parseInt(tempre[2].replace(" ", ''), 10)

    var attaque = {
      Vdef_X: Vdef_X,
      Vdef_Y: Vdef_Y,
      Voff_X: Voff_X,
      Voff_Y: Voff_Y,
      time_server: time_server,
      time_impact: time_impact,
      vague: 1,
      troupes: troupes,
      numero: (Attaque.length)
    }

    Attaque.push(attaque);

  }
  var i = 1;
  var j = 2;
  for (i = 1; i < Attaque.length; i++) {
    for (j = i + 1; j < Attaque.length; j++) {

      if (Attaque[i]["time_impact"].getTime() === Attaque[j]["time_impact"].getTime() &&
        Attaque[i]["Vdef_X"] === Attaque[j]["Vdef_X"] &&
        Attaque[i]["Vdef_Y"] === Attaque[j]["Vdef_Y"] &&
        Attaque[i]["Voff_X"] === Attaque[j]["Voff_X"] &&
        Attaque[i]["Voff_Y"] === Attaque[j]["Voff_Y"]) {

        Attaque[i]["vague"] = Attaque[i]["vague"] + Attaque[j]["vague"]
        Attaque[j]["vague"] = 0

      }
    }
  }

  var Attaque1 = ["Attaques"]
  for (i = 1; i < Attaque.length; i++) {
    if (Attaque[i]["vague"] > 0) {
      Attaque1.push(Attaque[i])
    }
  }
  return (Attaque1)
}

function change_format_attaque(format_1) {
  // console.log(format_1);
  var format_2 = [];      // la nouvelle liste des attaques en format x-x-x-x


  for (i = 1; i < format_1.length; i++) {

    for (j = i + 1; j < format_1.length; j++) {                                  // boucle for pour prendre une deuxième attaque (j)

      if (format_1[i]["Vdef_X"] === format_1[j]["Vdef_X"] &&              // comparaison des deux attaques sur plusieurs paramètres
        format_1[i]["Vdef_Y"] === format_1[j]["Vdef_Y"] &&
        format_1[i]["Voff_X"] === format_1[j]["Voff_X"] &&
        format_1[i]["Voff_Y"] === format_1[j]["Voff_Y"]) {

        if (format_1[i]["time_impact"].getTime() === format_1[j]["time_impact"].getTime() - 1000 &&  //comparaison des deux attaques sur le temps : 
          format_1[j]["time_impact"] != false &&
          format_1[i]["vague"] != false &&
          format_1[j]["vague"] != false
        ) {

          format_1[i]["vague"] = format_1[i]["vague"] + "=" + format_1[j]["vague"]      //et le paramètre vague passe de x à x-y
          format_1[i]["time_impact"] = format_1[j]["time_impact"]
          format_1[j]["vague"] = false
        }

      }
    }
  }

  for (i = 1; i < format_1.length; i++) {
    if (format_1[i]["vague"] != false) {

      if (format_1[i]["vague"].length > 1) {
        var nbr = (format_1[i]["vague"].length - 1) / 2
      } else { var nbr = 0 };

      format_1[i]["time_impact"] = new Date(format_1[i]["time_impact"].getTime() - 1000 * nbr)

      format_2.push(format_1[i])
    }
  }

  console.log(format_2);
  return (format_2)
}