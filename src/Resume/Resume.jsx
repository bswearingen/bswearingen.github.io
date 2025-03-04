function Resume({language}) {
  if(language === "english"){
    return (
      <div>
        <h2>Education</h2>
        <h3>Bachelor in Computer Engineering</h3>
        <h4>Graduated Dec. 2014</h4>
        <p>Completed courses in Computer Engineering, Digital System Design, Microelectronics, Microprocessors, Algorithms, Data Structures, HCI, AI, Software Validation, and Computer Architecture</p>
        <h5>McGill University, Montreal, Quebec</h5>

        <h3>Francization Course</h3>
        <h4>March 2024 – October 2024</h4>
        <p>Fulltime course to achieve conversational fluency in French</p>
        <p>Recognized for community involvement</p>
        <h5>CEA Outremont, Outremont, Quebec</h5>

        <h2>Programming Experience</h2>
        <p>C#, JavaScript, Python, SQL Server, React, NoSQL (Cassandra), Apache Kafka</p>

        <h2>Work Experience</h2>
        <h3>Software Developer - Yelp</h3>
        <h4>October 2020 - March 2024</h4>
        <ul>
          <li>
            <p>Developer on backend Marketing support teams</p>
            <ul>
              <li>Maintained and improved a rule-based notification system that sends 1M to 30M notifications a day across multiple channels</li>
              <li>Led a project to standardize how data is synced to third party Marketing Systems</li>
              <li>Identified an efficiency improvement that resulted in a 99% reduction in data synced for a single feature, reducing third party data point consumption by millions</li>
            </ul>
          </li>
          <li>
            <p>Developer on a full-stack Marketing support team</p>
            <ul>
              <li>Led a quality of life improvement effort that reduced pages by 50%</li>
            </ul>
          </li>
          <li>
            <p>Leader in several cross-team communities</p>
            <ul>
              <li>Built an in-person Montreal community from the ground up</li>
              <li>Contributed to efforts focused on integrating new remote developers into the company</li>
            </ul>
          </li>
        </ul>

        <h3>Dialog Developer - Cerence Inc.</h3>
        <h4>December 2017 - April 2020</h4>
        <ul>
          <li>
            <p>Developer on a project for Fiat Chrysler Automobiles</p>
            <ul>
              <li>Improved the Wake-Up-Word feature from a complaint area to a customer highlight</li>
            </ul>
          </li>
          <li>
            <p>Developer on a project for General Motors</p>
            <ul>
              <li>Helped reduce the backlog from 100+ tickets to under ten before production began</li>
              <li>Ported a tool that created mock speech recognition results into the project</li>
            </ul>
          </li>
        </ul>

        <h3>Software Developer I - AZUR Group</h3>
        <h4>September 2015 - December 2017</h4>
        <ul>
          <li>Lead developer on a small Microsoft BI team (SSIS, SSAS, and SSRS)</li>
          <li>Developer on a fund transfer and management system for a multi-national client</li>
          <li>Developer on the internal Salesforce team</li>
          <li>Developer on a Treasury Management and Cashflow Forecasting system</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Formation</h2>
        <h3>Baccalauréat en ingénierie informatique</h3>
        <h4>Diplôme obtenu en décembre 2014</h4>
        <p>Cours : génie informatique, conception de systèmes numériques, microélectronique, microprocesseurs, algorithmes, structures de données, interaction personne-machine, IA, validation de logiciels et architecture d’ordinateur</p>
        <h5>Université McGill (Montréal, Québec)</h5>

        <h3>Cours de francisation</h3>
        <h4>De mars à octobre 2024</h4>
        <p>Cours à temps plein pour apprendre à parler et écrire couramment le français</p>
        <p>Marque de reconnaissance pour implication communautaire</p>
        <h5>CEA Outremont (Outremont, Québec)</h5>

        <h2>Expérience en programmation</h2>
        <p>C#, JavaScript, Python, SQL Server, React, NoSQL (Cassandra), Apache Kafka</p>

        <h2>Expérience professionnelle</h2>
        <h3>Développeur de logiciels - Yelp</h3>
        <h4>D’octobre 2020 à mars 2024</h4>
        <ul>
          <li>
            <p>Développeur – équipes de soutien au marketing (back end)</p>
            <ul>
              <li>Maintenance et amélioration d’un système de notification à base de règles qui envoie de 1 M à 30 M de notifications par jour sur plusieurs canaux</li>
              <li>Responsable d’un projet visant à standardiser la synchronisation des données avec les systèmes de marketing tiers</li>
              <li>Identification d’un gain d’efficacité → réduction du nombre de données synchronisées pour une seule fonctionnalité à hauteur de 99 % → réduction de la consommation de points de données tiers à hauteur de plusieurs millions</li>
            </ul>
          </li>
          <li>
            <p>Développeur – équipe de soutien au marketing (full stack)</p>
            <ul>
              <li>Responsable d’une initiative d’amélioration de la qualité → réduction des alertes en dehors des heures de travail à hauteur de 50 %</li>
            </ul>
          </li>
          <li>
            <p>Leader dans plusieurs communautés interéquipes</p>
            <ul>
              <li>Création d’une toute nouvelle communauté montréalaise (rencontres en personne)</li>
              <li>Participation à l’intégration des nouveaux développeurs et développeuses en télétravail</li>
            </ul>
          </li>
        </ul>

        <h3>Développeur – dialogue - Cerence Inc.</h3>
        <h4>De décembre 2017 à avril 2020</h4>
        <ul>
          <li>
            <p>Développeur – projet pour Fiat Chrysler Automobiles</p>
            <ul>
              <li>Amélioration de la fonction de mot réveil (problème récurrent devenu un élément prisé)</li>
            </ul>
          </li>
          <li>
            <p>Développeur – projet pour General Motors</p>
            <ul>
              <li>Participation à la réduction d’une liste de plus de 100 tickets à moins de 10 avant production</li>
              <li>Port d’un outil qui simulait des résultats de reconnaissance vocale</li>
            </ul>
          </li>
        </ul>

        <h3>Développeur de logiciels I - AZUR Group</h3>
        <h4>De septembre 2015 à décembre 2017</h4>
        <ul>
          <li>Développeur principal – petite équipe, suite de veille stratégique Microsoft (SSIS, SSAS, SSRS)</li>
          <li>Développeur – système de gestion et de transfert de fonds pour une multinationale</li>
          <li>Développeur – équipe Salesforce à l’interne</li>
          <li>Développeur – système de gestion et de prévisions de trésorerie</li>
        </ul>
      </div>
    );
  }
}
  
export default Resume
  