import styled from "@emotion/styled";
import { useStoreState } from "../../providers/storeProvider";

interface SummaryProps {
  days: number;
  price: number;
  planetCode: string;
  onPurchaseHandler: () => void;
}

export const Summary = ({
  days,
  price,
  planetCode,
  onPurchaseHandler,
}: SummaryProps) => {
  const [{ planets }] = useStoreState();
  const planetName = planets.find((planet) => planet.code === planetCode)?.name;

  return (
    <Container>
      <Text>{`You would stay a total of ${days} days at ${planetName} planet for a Total Price of $${price.toFixed(
        2
      )} `}</Text>

      <PurchaseButton onClick={onPurchaseHandler}>Purchase</PurchaseButton>
    </Container>
  );
};

export const Container = styled.div({
  marginTop: "1.4rem",
});

export const Text = styled.p({
  lineHeight: 2,
  textAlign: "center",
  display: "block",
  margin: 0,
  color: "white",
  fontSize: "1.2rem",
  fontWeight: 200,
});

const PurchaseButton = styled.button({});
