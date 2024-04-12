import Card from "react-bootstrap/Card";
import { useRouter } from "next/navigation";

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
