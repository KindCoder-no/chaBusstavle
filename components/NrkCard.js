import * as React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

//import XMLParser from 'react-xml-parser';

import xml2js from "xml2js"

export default function NrkCard(props) {
    const [news, setNews] = React.useState(null);
    
    var url = "";
    const nrkselect = props.news



    

    React.useEffect(() => {
        switch(nrkselect) {
            case 'troms':
                url = "https://www.nrk.no/troms/siste.rss";
                break;
            case 'nordland':
                url = "https://www.nrk.no/nordland/siste.rss";
                break;
            case 'oslo':
                url = "https://www.nrk.no/ostlandssendingen/siste.rss"
                break;
            case 'buskerud':
                url = "https://www.nrk.no/buskerud/siste.rss";
                break;
            case 'trondelag':
                url = "https://www.nrk.no/trondelag/siste.rss";
                break;
            default:
                url = "https://www.nrk.no/nyheter/siste.rss";
                break;
        }

        var newsArray = []

        fetch(url)
            .then(res => res.text())
            .then(data => {
                //var xml = new XMLParser().parseFromString(data); 
                //console.log(data)
                var parser = new xml2js.Parser();
                parser.parseString(data, function (err, xml) {
                    if(err) console.log(err)
                    console.dir(xml.rss.channel[0].item);
                    xml.rss.channel[0].item.forEach(data => {
                        //if(data.name === "item"){
                            newsArray.push({ title: data.title[0], description: data.description[0] })
                        //}
                    })
                });
                //console.log(xml.children[0].children)
              

            //console.log(newsArray)
            setNews(newsArray)
            })
            .catch(err => console.log(err));

    }, [url]);

    if(news === null){
        return (
            <div>
                <h3>Laster nyheter</h3>
                <CircularProgress />
            </div>
        )
    }else{
        
        
        return (
            <div>
                <h1>NRK</h1>

                <marquee scrollamount="4" style={{ color: 'white'}}>
                    {news.map((data, key) => {
                        return (
                            <div key={key} style={{display: "inline-block"}}>
                            <h2>{data.title} - {data.description}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h2>
                            </div>
                        )
                    })}
                </marquee>
                
            </div>
        )
    }
}