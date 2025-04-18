import { useNavigate, useParams } from 'react-router-dom';
 
const fakeArticles = {
  "introduction-tests-automatisés": {
    title: "Introduction tests automatisés",
    content: `
      Les tests automatisés permettent d'exécuter des scénarios de test sans intervention humaine.
      Ils sont essentiels dans les pipelines CI/CD modernes pour garantir la stabilité de l'application.
      
      Les principaux avantages sont :
      - Réduction du temps de test
      - Détection rapide des régressions
      - Intégration continue facilitée
 
      Outils populaires : Selenium, Cypress, Playwright, JUnit, Robot Framework...
    `
  },
  "cypress-vs-selenium": {
    title: "Cypress vs Selenium ",
    content: `
      Cypress et Selenium sont deux frameworks de test populaires.
 
      - Selenium est plus mature, compatible multi-navigateurs.
      - Cypress est moderne, rapide, mais limité à Chrome/Chromium.
 
      Le choix dépend de vos besoins en compatibilité, rapidité et type de test.
    `
  },
  "structurer-campagne-test": {
    title: "Comment structurer une campagne de test efficace ?",
    content: `
      Pour une campagne de test réussie, pensez à :
 
      1. Définir les objectifs
      2. Prioriser les cas de test
      3. Choisir les bons outils
      4. Impliquer les bonnes parties prenantes
      5. Documenter les résultats
 
      Une bonne organisation évite les bugs en production et améliore la qualité globale.
    `
  }
};
 
const ArticleDetails  = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = fakeArticles[slug];
 
  if (!article) {
    return <div className="p-8 text-center text-red-600">Article non trouvé.</div>;
  }
 
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Retour
      </button>
      <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
      <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">{article.content}</pre>
    </div>
  );
};
export default ArticleDetails;
