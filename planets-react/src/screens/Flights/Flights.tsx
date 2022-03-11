import { FlightFinder, Summary } from "../../components";
import styled from "@emotion/styled";
import { useState } from "react";
import { Flight } from "../../api/flights/get/types";
import { diffDays } from "../../utils";
import { colors } from "../../theme";

export const Flights = () => {
  const [outboundFlight, setOutboundFlight] = useState<Flight>();
  const [inboundFlight, setInboundFlight] = useState<Flight>();

  const onPurchaseHandler = () => {
    alert("Thank you for your purchase.");
  };

  const days = diffDays(outboundFlight?.date, inboundFlight?.date);

  return (
    <Container>
      <Title>Interplanetary Flight Finder</Title>
      <Description>
        Purchase as many trips as needed to visit all the planets you love.
      </Description>
      <FlightSearchContainer>
        <Section>
          <SectionTitle>Outbound 🚀</SectionTitle>
          <FlightFinder
            defaultDate="2021-11-16"
            defaultOrigin="NAB"
            defaultDestination="HOH"
            selectedFlight={outboundFlight}
            setSelectedFlight={setOutboundFlight}
          />
        </Section>
        {outboundFlight && (
          <Section>
            <SectionTitle>Inbound 🚀</SectionTitle>
            <FlightFinder
              defaultDate={outboundFlight.date}
              defaultOrigin={outboundFlight?.destination}
              defaultDestination="NAB"
              selectedFlight={inboundFlight}
              setSelectedFlight={setInboundFlight}
            />
          </Section>
        )}
      </FlightSearchContainer>
      {outboundFlight != null && inboundFlight != null ? (
        <Summary
          days={days}
          planetCode={outboundFlight.destination}
          onPurchaseHandler={onPurchaseHandler}
          price={outboundFlight.price + inboundFlight.price}
        />
      ) : (
        <InvalidTripMessage>
          Please select a valid outbound and inbound flight.
        </InvalidTripMessage>
      )}
    </Container>
  );
};

const Container = styled.div({});

const Title = styled.h1({
  color: colors.white,
  marginBottom: 0,
});

const Description = styled.h3({
  color: colors.white,
  fontSize: "0.8rem",
});

const FlightSearchContainer = styled.div({
  display: "flex",
  gridGap: "2rem",
  justifyContent: "center",
});

const Section = styled.div({});

const SectionTitle = styled.h2({
  color: colors.white,
  textAlign: "left",
});

const InvalidTripMessage = styled.div({
  lineHeight: 2,
  textAlign: "center",
  display: "block",
  marginBottom: "0.8rem",
  marginTop: "1.4rem",
  color: colors.white,
  fontSize: "1.2rem",
  fontWeight: 200,
});
