import { useState } from 'react';

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'

    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null);

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.length > 0) fetchClima();
    }

    const fetchClima = async () => {

        const API_KEY = '772eaf8b240f9e45bcee36fb8245f169';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error en la consulta');
            const data = await response.json();
            setDataClima(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">

            <h1>Aplicación de Clima</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit">Buscar</button>
            </form>
            {dataClima && (
                <div>
                    
                    <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <span class="text-inline"><h2>{dataClima.name}</h2></span>
                            </div>
                            <div class="col-6">
                                <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} class="img-fluid" />
                            </div>
                        </div>
                    </div>

                    <p>País: {dataClima.sys.country}</p>
                    <p>Temperatura: {dataClima.main.temp} °C</p>
                    <p>Descripción: {dataClima.weather[0].description}</p>
                    <p>Humedad: {dataClima.main.humidity} %</p>
                    <p>Viento: {dataClima.wind.speed} m/s</p>
                    <p>Presión: {dataClima.main.pressure} hPa</p>
                    <p>Latitud: {dataClima.coord.lat}</p>
                    <p>Longitud: {dataClima.coord.lon}</p>
                    <p>Temperatura máxima: {dataClima.main.temp_max} °C</p>
                    <p>Temperatura mínima: {dataClima.main.temp_min} °C</p>
                    <p>Temperatura de sensacion: {dataClima.main.feels_like} °C</p>
                    <p>Visibilidad: {dataClima.visibility} m</p>
                    <p>Tiempo de salida del sol: {new Date(dataClima.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Tiempo de puesta del sol: {new Date(dataClima.sys.sunset * 1000).toLocaleTimeString()}</p>
                    <p>Zona horaria: {dataClima.timezone / 3600} horas</p>
                    <p>Condiciones del mar: {dataClima.main.sea_level} hPa</p>
                    <p>Condiciones de la tierra: {dataClima.main.grnd_level} hPa</p>
                    {/* <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} /> */}
                </div>
            )}
        </div>
    )
}
