import { IoIosStar, IoIosStarOutline } from "react-icons/io";

function Stars({ puntuacion }) {
  const totalStars = 5;

  // Create an array of stars to render, filled based on the rating
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
