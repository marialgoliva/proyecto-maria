import { IoIosStar, IoIosStarOutline } from "react-icons/io";
/**
 * Componente que muestra una serie de estrellas de puntuación.
 * @module Stars
 * @param {number} puntuacion - La puntuación a representar con estrellas.
 * @returns {JSX.Element} El componente de estrellas.
 */
function Stars({ puntuacion }) {
  const totalStars = 5;

  const starIcons = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= puntuacion) {
      starIcons.push(<IoIosStar key={i} />);
    } else {
      starIcons.push(<IoIosStarOutline key={i} />);
    }
  }

  return <div>{starIcons}</div>;
}

export default Stars;
