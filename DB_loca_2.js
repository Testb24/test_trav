const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

var db="";

window.onload = function () {
    let request = window.indexedDB.open('notes', 1);

    request.onerror = function () {
        console.log("fail sry ^^");
    };

    request.onsuccess = function () {
        console.log("gg wp !");

        db = request.result;
        console.log("db");
        console.log(db);
        displayData();
    };

    request.onupgradeneeded = function (e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore('notes', { keyPath: 'id' });

        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('body', 'body', { unique: false });

        console.log('Database setup complete');
    };

    // function clic_charge_test() {
    //     addData();
    // }

    form.onsubmit = addData;

    function addData(e) {
        // empêcher le formulaire d'être soumis vers le serveur
        e.preventDefault();

        // récupérer les valeurs entrées dans les champs du formulaire
        // et les stocker dans un objet qui sera inséré en BDD
        let newItem = { title: titleInput.value, body: bodyInput.value };

        // ouvrir une transaction en lecture/écriture
        let transaction = db.transaction(['notes'], 'readwrite');

        // récupérer l'object store de la base de données qui a été ouvert avec la transaction
        let objectStore = transaction.objectStore('notes');

        // demander l'ajout de notre nouvel objet à l'object store
        var request = objectStore.add(newItem);
        request.onsuccess = function () {
            // vider le formulaire, pour qu'il soit prêt pour un nouvel ajout
            titleInput.value = '';
            bodyInput.value = '';
        };

        // attendre la fin de la transaction, quand l'ajout a été effectué
        transaction.oncomplete = function () {
            console.log('Transaction completed: database modification finished.');

            // mettre à jour l'affichage pour montrer le nouvel item en exécutant displayData()
            displayData();
        };

        transaction.onerror = function () {
            console.log('Transaction not opened due to error');
        };
    }

    // Définit la fonction displayData()
    function displayData() {
        // Vide le contenu de la liste à chaque fois qu'on la met à jour
        // Si on ne le faisait pas, des duplicats seraient affichés à chaque ajout
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        // Ouvre l'object store puis récupère un curseur - qui va nous permettre d'itérer
        // sur les entrées de l'object store
        let objectStore = db.transaction('notes').objectStore('notes');
        // console.log("objectStore : " + objectStore);
        // console.log(objectStore.openCursor());
        // console.log("ALL");
        console.log(objectStore.getAll());
        objectStore.getAll().onsuccess = function (e) {
            let data2 = e.target.result;
            console.log(data2);
        };
        objectStore.openCursor().onsuccess = function (e) {
            // Récupère une référence au curseur
            let cursor = e.target.result;
            // console.log("333");
            // console.log(cursor.value);
            // S'il reste des entrées sur lesquelles itérer, on exécute ce code
            if (cursor) {
                // Crée un li, h3, et p pour mettre les données de l'entrée puis les ajouter à la liste
                let listItem = document.createElement('li');
                let h3 = document.createElement('h3');
                let para = document.createElement('p');

                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(listItem);

                // Récupère les données à partir du curseur et les met dans le h3 et p
                h3.textContent = cursor.value.title;
                para.textContent = cursor.value.body;

                // Met l'ID de l'entrée dans un attribut du li, pour savoir à quelle entrée il correspond
                // Ce sera utile plus tard pour pouvoir supprimer des entrées
                listItem.setAttribute('data-note-id', cursor.value.id);

                // Crée un bouton et le place dans le li
                let deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'Delete';

                // Définit un gestionnaire d'événement pour appeler deleteItem() quand le bouton supprimer est cliqué
                deleteBtn.onclick = deleteItem;

                // Continue l'itération vers la prochaine entrée du curseur
                cursor.continue();
            } else {
                // Si la liste est vide, affiche un message "Aucune note n'existe"
                if (!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored.';
                    list.appendChild(listItem);
                }
                // Il n'y a plus d'entrées dans le curseur
                console.log('Notes all displayed');
            }
        };
    }

    // Définit la fonction deleteItem()
    function deleteItem(e) {
        // Récupère l'id de l'entrée que l'on veut supprimer
        // On doit le convertir en nombre avant d'essayer de récupérer l'entrée correspondante dans IDB
        // les clés sont sensibles à la casse
        let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

        // Ouvre une transaction et supprime la note ayant l'id récupéré ci-dessus
        let transaction = db.transaction(['notes'], 'readwrite');
        let objectStore = transaction.objectStore('notes');
        let request = objectStore.delete(noteId);

        // Indique à l'utilisateur que l'entrée a été supprimée
        transaction.oncomplete = function () {
            // supprime l'élément parent du bouton, le li
            // pour qu'il ne soit plus affiché
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            console.log('Note ' + noteId + ' deleted.');

            // Si la liste est vide, affiche un message qui l'indique
            if (!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No notes stored.';
                list.appendChild(listItem);
            }
        };
    }
};
