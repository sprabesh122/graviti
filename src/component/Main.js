import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { Autocomplete } from "@react-google-maps/api";
import { FaTimes } from "react-icons/fa";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { useRef, useState } from "react";

const Main = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  // const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    // setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  const center = { lat: 48.8584, lng: 2.2945 };

  return (
    <Container>
      <Navbar />

      <Content>
        <Opening>
          <p>
            Lets Calculate <b>distance</b> from Google Maps
          </p>
        </Opening>

        <HeroSection>
          <Box
            p={10}
            borderRadius="lg"
            m={6}
            zIndex="1"
            h="90vh"
            width={"50%"}
            fontWeight={"bold"}
          >
            <HStack spacing={2} justify={"space-between"}>
              <Box height="50vh">
                <Text align={"left"} m={2}>
                  Origin:{" "}
                </Text>

                <Autocomplete>
                  <Input type="text" placeholder="Origin" ref={originRef} />
                </Autocomplete>

                <Text align={"left"} m={2}>
                  Stop:{" "}
                </Text>

                <Autocomplete>
                  <Input type="text" placeholder="Stop" ref={destiantionRef} />
                </Autocomplete>

                <Text align={"left"} m={2}>
                  Destination:{" "}
                </Text>
                <Autocomplete>
                  <Input
                    type="text"
                    placeholder="Destination"
                    ref={destiantionRef}
                  />
                </Autocomplete>
              </Box>
              <ButtonGroup>
                <Button
                  colorScheme="blue"
                  type="submit"
                  onClick={calculateRoute}
                >
                  Calculate
                </Button>
                <IconButton
                  aria-label="center back"
                  icon={<FaTimes />}
                  onClick={clearRoute}
                />
              </ButtonGroup>
            </HStack>
            <HStack spacing={4} mt={4} justifyContent="space-between">
              <Box display={"flex"}>
                <Text display={"inline"}>
                  Distance: {distance}
                  <p>
                    The distance between and via the seleted route is {distance}{" "}
                    kms.
                  </p>
                </Text>
              </Box>
            </HStack>
          </Box>

          <Box position={"relative"} height="50%" width={"50%"}>
            {/* Google Map Box */}
            <GoogleMap
              center={center}
              // zoom={15}
              mapContainerStyle={{
                width: "80%",
                height: "125%",
                margin: "10%",
              }}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Box>
        </HeroSection>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f4f8fa; ;
`;

const Content = styled.div``;

const Opening = styled.p`
  justify-content: center;
  color: #1b31a8;
`;

const HeroSection = styled.div`
  display: flex;
  height: 90vh;
  background-color: #f4f8fa;
  margin: 4px;
`;

export default Main;
