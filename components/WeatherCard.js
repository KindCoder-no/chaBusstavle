import * as React from 'react';

// MUI
import CircularProgress from '@mui/material/CircularProgress';

export default function WeatherCard(props) { 
    // States
    const [response, setresponse] = React.useState(false);
    const [icon, seticon] = React.useState()
    const [temperature, settemperature] = React.useState();

    React.useEffect(() => {

        fetch("https://api.met.no/weatherapi/nowcast/2.0/complete?lat=63.4203952&lon=10.4839164")
            .then((res) => res.json())
            .then((json) => {
                //console.log(json.properties.timeseries[0].data)
                seticon(json.properties.timeseries[0].data.next_1_hours.summary.symbol_code)
                settemperature(json.properties.timeseries[0].data.instant.details.air_temperature)
                setresponse(true)
            })
            .catch(err => console.log(err));

    }, []);

    if(response === false){
        return (
            <div>
                <h3>Laster Været</h3>
                <CircularProgress />
            </div>
        )
    }else{
        
        
        return (
            <div>
                <h1>Været</h1>
                <p style={{fontSize: "4vh"}}><img src={"https://skjer.men/weather_icons/" + icon + ".svg"} style={{height: "7vh"}} alt="Weather Icon"></img>{temperature} °</p>
                
            </div>
        )
    }

}