"""Welcome to Reflex! This file outlines the steps to create a basic app."""

import reflex as rx
import json
import requests
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.environ.get('Token_flyfut')


headers = {"Authorization" : f"Bearer {api_key}",  "Content-Type" : 'application/json' }



class Form_state(rx.State):
    value: int = 3
    
    def set_end(self, value: int):
        self.value = value

    form_data = {}
    def handle_submit(self, form_data):
        """Handle the form submit."""
        self.form_data = json.dumps({"records":[{"fields":form_data}]})
        data_r = self.form_data.replace("\\", "")
        data = data_r.replace("\\", "")
        requests.post(r'https://api.airtable.com/v0/appFezarrh9fv6WrS/cuestionario', data,headers=headers)
        
def index():
    return rx.vstack(
        rx.card(
        rx.form(
            rx.image(src='/logo.png', width="300px", height="auto"),
            rx.text('Nombre'),
            rx.input(
                placeholder="Nombre",
                id="Name",
                ),
            rx.text('Club'),
            rx.input(
                placeholder="Club",
                id="Club",
                ),
            rx.text('Incidencias'),
            rx.input(
                placeholder="Incidencias",
                id="Incidencias",
                ),
            rx.text('Calificacion'),
            rx.slider(
                rx.slider_track(
                    rx.slider_filled_track(bg="grey"),
                    bg="#E0DFDB",
                ),                
                rx.slider_thumb(
                    rx.icon(tag="star", color="gold"),
                    box_size="1.7em",
                    border_size = "1em",
                    border_color= 'gold',
                    bg="yellow",
                ),
                id='Calificacion',
                on_change=Form_state.set_end,
                min_=0, max_=5,
                ),
            rx.text(
                f"La puntuación es de {Form_state.value} estrellas"
                ),
            rx.center(rx.button('Enviar', type_='submit', color_scheme='green')),
                on_submit=Form_state.handle_submit,
            ),
            ))
        

# Add state and page to the app.
app = rx.App()
app.add_page(index)
app.compile()
