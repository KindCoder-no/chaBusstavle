import React from "react";
import moment from "moment";
import "moment-timezone"
import "moment/locale/nb"
moment.locale('nb')

export default function BusCard(props){
    const [busData, setBusData] = React.useState();

    React.useEffect(() => {
        const fetchBusdata = async venueToSearchFor => {
              const response = await fetch(
                'https://api.entur.io/journey-planner/v3/graphql',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    query: `{
                        stopPlace(id: "NSR:StopPlace:43916") {
                          description
                          name
                          estimatedCalls(numberOfDepartures: 20) {
                            actualArrivalTime
                            actualDepartureTime
                            date
                            realtime
                            destinationDisplay {
                                frontText
                            }
                            expectedDepartureTime
                            serviceJourney {
                              line {
                                name
                                publicCode
                              }
                            }
                          }
                        }
                      }
                      `
                  })
                }
              );
              const enturJSON = await response.json();
              const data = enturJSON.data.stopPlace;
              const departures = data.estimatedCalls;
              //console.log(departures)
    
              setBusData(departures)
        
            
        } 
        fetchBusdata()
        setInterval(fetchBusdata, 1000 * 60);
    }, []);


    return (
        <section id="busCard">
                    {busData &&
                        busData.map((data, index) => {
                            return (
                                <div key={index} style={{border: "1px black", borderTopStyle: "dotted"}}>
                                    <h2 style={{fontSize: "7vh"}}>
                                  
                                    {data.realtime == false && "ca "}
                                    {moment(data.expectedDepartureTime).diff(moment(), 'seconds') <= 60 && "Nå"} 
    
                                    {(((moment(data.expectedDepartureTime).diff(moment(), "seconds") > 60) && (moment(data.expectedDepartureTime).diff(moment(), "seconds") < 60*10)) && (moment(data.expectedDepartureTime).diff(moment(), "minutes") + " min"))} 
    
                                    {(moment(data.expectedDepartureTime).diff(moment(), "seconds") >= 60*10 && moment(data.expectedDepartureTime).format('LT'))} 
                                    
                                    &nbsp;- {data.serviceJourney.line.publicCode} {data.destinationDisplay.frontText}</h2>
                                </div>
                            )
                        })
                       
                    }
                    
                    <div style={{border: "1px black", borderBottomStyle: "dotted"}}></div>
            
          
        </section >
    );

}