import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  // IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
// import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

import Navbar from "./Navbar";

import styled from "styled-components";

const center = { lat: 48.8584, lng: 2.2945 };

function App() {
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

  /*
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  */

  return (
    <>
      <Opening>
        <Navbar />
      </Opening>

      <Flex
        position="fixed"
        flexDirection="row"
        alignItems="flex-start"
        h="100vh"
        w="100vw"
        // margin="100px"
        mt="82px"
        bgColor="#f4f8fa"
      >
        <Box
          p={4}
          borderRadius="lg"
          // m={"15%"}
          mt={"4%"}
          ml="80px"
          // bgColor="#f4f8fa"
          // shadow="base"
          W="50%"
          height="100%"
          zIndex="modal"
          display="inline"
          fontWeight={"bold"}
        >
          <HStack justify={"space-around"} flexDirection="column">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Box width="250px" height="15vh">
                  <Text>Origin:</Text>
                  <Autocomplete>
                    <Input
                      type="text"
                      placeholder="Origin"
                      ref={originRef}
                      bgColor="#fff"
                    />
                  </Autocomplete>
                </Box>

                <Box width="250px" height="15vh">
                  <Text>Stop:</Text>
                  <Autocomplete>
                    <Input
                      type="text"
                      placeholder="Current Stop"
                      ref={destiantionRef}
                      bgColor="#fff"
                    />
                  </Autocomplete>
                </Box>

                <Box width="250px" height="15vh">
                  <Text>Destination:</Text>
                  <Autocomplete>
                    <Input
                      type="text"
                      placeholder="Destination"
                      ref={destiantionRef}
                      bgColor="#fff"
                    />
                  </Autocomplete>
                </Box>
              </div>

              <div style={{ marginTop: "110px", paddingLeft: "120px" }}>
                <ButtonGroup>
                  <Button
                    color="#ffffff"
                    backgroundColor={"#1B31A8"}
                    type="submit"
                    onClick={calculateRoute}
                    borderRadius="32px"
                    width={"141px"}
                    height={"62px"}
                    top={"-30px"}
                    gap={"10px"}
                  >
                    Calculate
                  </Button>

                  {/* Button to clear the input field  */}
                  {/* <IconButton
                    aria-label="center back"
                    icon={<FaTimes />}
                    onClick={clearRoute}
                  /> */}
                </ButtonGroup>
              </div>
            </div>
          </HStack>

          <div style={{ backgroundColor: "#ffffff", height: "120px" }}>
            <div style={{ height: "50%", alignItems: "center" }}>
              <HStack spacing={4} mt={4} justifyContent="space-between">
                <Text justify="space-between" margin="5px">
                  Distance: <span style={{ color: "#0079FF" }}>{distance}</span>
                </Text>
                {/* Duration  */}
                {/* 
                <Text>
                  Duration: <span style={{ color: "#0079FF" }}>{duration}</span>{" "}
                </Text>
                 */}
                {/* 

                {/* Relocation arrow  
                <IconButton
                  aria-label="center back"
                  icon={<FaLocationArrow />}
                  isRound
                  onClick={() => {
                    map.panTo(center);
                    map.setZoom(15);
                  }}
                />
                */}
              </HStack>
            </div>

            <div
              style={{
                backgroundColor: "#f4f8fa",
                height: "50%",
                padding: "5px",
              }}
            >
              The distance via the seleted route is {distance} kms.
            </div>
          </div>
        </Box>

        <Box
          h="60%"
          w="50%"
          mt="6%"
          mb="5"
          ml="10%"
          mr="5%"
          padding="4"
          justifyContent="space-between"
        >
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
      </Flex>
    </>
  );
}

const Opening = styled.div`
  position: absolute;
  height: 80px;
  left: 0px;
  right: 0px;
  top: 0px;
`;

export default App;
