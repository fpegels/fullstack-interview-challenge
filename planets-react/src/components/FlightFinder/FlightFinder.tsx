import { useForm } from "react-hook-form";
import { api } from "../../api";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Flight } from "../../api/flights/get/types";
import { useStoreState } from "../../providers/storeProvider";
import { colors } from "../../theme";

interface FlightFinderProps {
  defaultDate?: string;
  defaultOrigin?: string;
  defaultDestination?: string;
  selectedFlight?: Flight;
  setSelectedFlight: (flight: Flight | undefined) => void;
}

export const FlightFinder = ({
  defaultDate = "",
  defaultOrigin = "",
  defaultDestination = "",
  selectedFlight,
  setSelectedFlight,
}: FlightFinderProps) => {
  const [{ planets }] = useStoreState();
  const [flights, setFlights] = useState<Flight[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: defaultDate,
      origin: defaultOrigin,
      destination: defaultDestination,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  useEffect(() => {
    setSelectedFlight(undefined);
  }, [flights, setSelectedFlight]);

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(({ date, origin, destination }) => {
          setSelectedFlight(undefined);
          api.flights
            .get({ date, origin, destination })
            .then((flights) => setFlights(flights));
        })}
      >
        <Label>Date (Greater than...)</Label>
        <InputContainer>
          <Input
            {...register("date", {
              required: true,
              pattern: {
                value: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
                message: "Please enter a valid date. Ex.: 2021-11-15",
              },
            })}
          />
          {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
        </InputContainer>
        <Label>Origin</Label>
        <Select {...register("origin", { required: true, maxLength: 10 })}>
          {planets.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </Select>
        {errors.origin && <ErrorMessage>This field is required</ErrorMessage>}
        <Label>Destination</Label>
        <Select {...register("destination", { required: true, maxLength: 10 })}>
          {planets.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </Select>
        {errors.destination && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}
        <SearchButton type="submit">🔍 Search</SearchButton>
      </Form>
      {flights.length > 0 ? (
        <List>
          {flights.map((flight, index) => (
            <ListRow
              key={flight.id}
              onClick={() => setSelectedFlight(flight)}
              isSelected={flight.id === selectedFlight?.id}
            >
              {`opt${index + 1} -> $${flight.price} on ${flight.date}`}
            </ListRow>
          ))}
        </List>
      ) : (
        <Label>
          Your search returned no available flights or you still need to click
          on Search.
        </Label>
      )}
    </Container>
  );
};

const Container = styled.div({
  width: "350px",
});

const List = styled.div({});

interface ListRowProps {
  isSelected: boolean;
}

const ListRow = styled.div<ListRowProps>(({ isSelected }) => ({
  display: "flex",
  backgroundColor: isSelected ? colors.roseDark : "transparent",

  lineHeight: 2,
  textAlign: "left",
  cursor: "pointer",

  color: colors.white,
  fontSize: "1.2rem",
  fontWeight: 200,

  "&:hover": {
    backgroundColor: colors.roseMain,
  },
}));

const Form = styled.form({});

const Label = styled.label({
  lineHeight: 2,
  textAlign: "left",
  display: "block",
  marginBottom: "0.4rem",
  marginTop: "1.4rem",
  color: colors.white,
  fontSize: "1.2rem",
  fontWeight: 200,
});

const InputContainer = styled.div({
  position: "relative",
});

const Input = styled.input({
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  borderRadius: "4px",
  border: `1px solid ${colors.white}`,
  padding: "10px 15px",
  marginBottom: "10px",
  fontSize: "14px",
});

const Select = styled.select({
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  borderRadius: "4px",
  border: `1px solid ${colors.white}`,
  padding: "10px 15px",
  marginBottom: "10px",
  fontSize: "14px",
});

const ErrorMessage = styled.p({
  color: colors.roseMain,
  position: "absolute",
  top: "30px",
  fontSize: "0.8rem",
});

const SearchButton = styled.button({
  appearance: "none",
  margin: "20px 0",
  textTransform: "uppercase",
  padding: "10px 20px",
  borderRadius: "8px",
  width: "100%",
  background: colors.roseMain,
  color: colors.white,
  fontSize: "1rem",

  "&:hover": {
    backgroundColor: colors.roseDark,
  },
});
