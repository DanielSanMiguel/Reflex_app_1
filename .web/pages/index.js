import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Card, CardBody, Center, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useColorMode, VStack } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import NextHead from "next/head"



export default function Component() {
  const form_state = useContext(StateContext)
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents.map((e) => ({...e})))
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])

  const ref_Calificacion = useRef(null); refs['ref_Calificacion'] = ref_Calificacion;
  const ref_Name = useRef(null); refs['ref_Name'] = ref_Name;
  const ref_Club = useRef(null); refs['ref_Club'] = ref_Club;
  const ref_Incidencias = useRef(null); refs['ref_Incidencias'] = ref_Incidencias;

  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {`http://localhost:8000`}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <VStack>
  <Card>
  <CardBody>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("form_state.handle_submit", {form_data:{"Incidencias": getRefValue(ref_Incidencias), "Club": getRefValue(ref_Club), "Calificacion": getRefValue(ref_Calificacion), "Name": getRefValue(ref_Name)}})], (_e0))}>
  <Image src={`/logo.png`} sx={{"width": "300px", "height": "auto"}}/>
  <Text>
  {`Nombre`}
</Text>
  <Input id={`Name`} placeholder={`Nombre`} ref={ref_Name} type={`text`}/>
  <Text>
  {`Club`}
</Text>
  <Input id={`Club`} placeholder={`Club`} ref={ref_Club} type={`text`}/>
  <Text>
  {`Incidencias`}
</Text>
  <Input id={`Incidencias`} placeholder={`Incidencias`} ref={ref_Incidencias} type={`text`}/>
  <Text>
  {`Calificacion`}
</Text>
  <Slider id={`Calificacion`} max={5} min={0} onChange={(_e0) => addEvents([Event("form_state.set_end", {value:_e0})], (_e0))} ref={ref_Calificacion}>
  <SliderTrack sx={{"bg": "#E0DFDB"}}>
  <SliderFilledTrack sx={{"bg": "grey"}}/>
</SliderTrack>
  <SliderThumb boxSize={`1.7em`} sx={{"borderSize": "1em", "borderColor": "gold", "bg": "yellow"}}>
  <StarIcon sx={{"color": "gold"}}/>
</SliderThumb>
</Slider>
  <Text>
  {`La puntuación es de ${form_state.value} estrellas`}
</Text>
  <Center>
  <Button colorScheme={`green`} type={`submit`}>
  {`Enviar`}
</Button>
</Center>
</Box>
</CardBody>
</Card>
</VStack>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
