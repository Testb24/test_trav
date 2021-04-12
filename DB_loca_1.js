//Base de données locale
//
//Pour stocker l'array des attaques accessibles et ne pas recharger plusieurs fois l'ensemble
//
// V:1.0
// 07/04/2021

//Décommenter pour voir le résultat
let db = '';
let openRequest = indexedDB.open('db', 1);

openRequest.onupgradeneeded = function(){
    db = openRequest.result;

    //Si l'objet de stockage users n'existe pas, on le crée
    if (!db.objectStoreNames.contains('users')){
        db.createObjectStore('users', {keyPath: 'id'});
    }
};

openRequest.onerror = function(){
    alert('Impossible d\'accéder à IndexedDB');
};

openRequest.onsuccess = function(){
    db = openRequest.result;
    let transaction = db.transaction('users', 'readwrite');
    transaction.oncomplete = function(){alert('Transaction terminée');};
    let users = transaction.objectStore('users');
    
    let user = {
        id: 1,
        prenom: 'Pierre',
        mail: 'pierre.giraud@edhec.com',
        inscription: new Date()
    };
    
    let ajouter = users.put(user);
    ajouter.onsuccess = function(){ 
        alert('Utilisateur ajouté avec la clef ' + ajouter.result);
    };
    ajouter.onerror = function(){
        alert('Erreur : ' + ajouter.error);
    };
    
    let lire = users.get(1);
    lire.onsuccess = function(){ 
        alert('Nom de l\'utilisateur 1 : ' + lire.result.prenom);
    };
    lire.onerror = function(){
        alert('Erreur : ' + lire.error);
    };
    
    let supprimer = users.delete(1);
    supprimer.onsuccess = function(){ 
        alert('Utilisateur supprimé de la base de données');
    };
    supprimer.onerror = function(){
        alert('Erreur : ' + supprimer.error);
    };
};