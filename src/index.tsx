import React from 'react'; // Importe la bibliothèque React pour utiliser ses fonctionnalités.
import ReactDOM from 'react-dom/client'; // Importe la méthode de rendu de React pour le DOM.
import './index.css'; // Importe les styles globaux pour l'application.
import App from './App'; // Importe le composant principal de l'application.
import reportWebVitals from './reportWebVitals'; // Importe la fonction pour mesurer les performances de l'application.

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Sélectionne l'élément avec l'ID 'root' dans le document HTML.
);

root.render(
  <React.StrictMode>
    <App /> {/* Rend le composant principal App dans l'élément root, en mode strict pour détecter les erreurs potentielles. */}
  </React.StrictMode>
);

reportWebVitals(); // Appelle la fonction pour mesurer les performances de l'application.
