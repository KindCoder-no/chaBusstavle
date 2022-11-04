import Head from 'next/head'
import Image from 'next/image'
import "../styles/Home.module.css"
import 'bootstrap/dist/css/bootstrap.css';

import BusCard from '../components/BusCard'
import WeatherCard from '../components/WeatherCard';
import NrkCard from '../components/NrkCard';

export default function Home() {
  return (
    <div style={{width: "100%"}}>
      <Head>
        <title>Busstavla - Charlottenlund VGS</title>
        <meta name="description" content="Monkies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className='mt-5'></div>
          <div className='row justify-content-center'> 
              <div className='col-10'>
                <div style={{backgroundColor: "rgb(93, 120, 30, 0.5)", color: "white", height: "70vh", maxHeight: "70vh", overflow: "hidden",whiteSpace: "nowrap", borderRadius: "10px"}}>
                  <h1 className='text-center' style={{fontSize: "350%"}}>Charlottenlund VGS</h1>
                  <BusCard />
                </div>
              </div>
            </div>
        
        <div className="mt-5"></div>
      
        <div className='row justify-content-center'> 
          <div className='col-10'>
            <div style={{backgroundColor: "rgb(93, 120, 30, 0.5)", color: "white", height: "15vh", maxHeight: "15vh", overflow: "hidden",whiteSpace: "nowrap", borderRadius: "10px"}}>
              <div className='row'>
                <div className='col-2'>
                  <WeatherCard />
                </div>
                <div className='col-10'>
                  <NrkCard news={"trondelag"}/>

                </div>
              </div>
            </div>
          </div>
        </div>
        
      </main>

     
    </div>
  )
}
