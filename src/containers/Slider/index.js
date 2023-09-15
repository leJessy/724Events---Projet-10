import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // Ajout d'une vérification pour une erreur console sur le length undefined
    if (byDateDesc) {
      // () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      // 5000
      setTimeout(() => setIndex((index + 1) % byDateDesc.length), 5000)
    }
      
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Key mise dans une div qui englobe tout
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Changement de la key pour la rendre unique
                  // key={`${event.id}`}
                  key={`${radioIdx * 1}`}
                  type="radio"
                  name="radio-button"
                  // checked={idx === radioIdx}
                  checked={index === radioIdx}
                  // Read Only pour corriger une erreur console
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
