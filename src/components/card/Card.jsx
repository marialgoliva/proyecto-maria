import Card from "react-bootstrap/Card";
import { useRouter } from "next/navigation";
/**
 * Componente de tarjeta simple.
 *
 * @component
 * @param {Object[]} cards - Lista de tarjetas.
 * @param {string} cards[].title - Título de la tarjeta.
 * @param {string} cards[].text - Texto de la tarjeta.
 * @param {string} cards[].link - Enlace de la tarjeta.
 * @returns {JSX.Element} Elemento JSX que representa las tarjetas.
 */
function SimpleCard({ cards }) {
  const router = useRouter();
  return (
    <>
      {cards.map((card) => (
        <Card
          bg="light"
          key={card.title}
          text="dark"
          style={{ width: "18rem", cursor: "pointer" }}
          className="mb-2 pointer"
          onClick={() => {
            router.push(card.link);
          }}
        >
          {/* <Card.Header>Header</Card.Header> */}

          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default SimpleCard;
