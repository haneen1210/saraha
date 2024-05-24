
function predictWeather() {
   
    const weatherToday = document.getElementById('weather-today').value;
    const rainfallToday = document.getElementById('rainfall-today').value;
    const temperatureToday = document.getElementById('temperature-today').value;
    const cloudCoverToday = document.getElementById('cloud-cover-today').value;

    let pRain = 0.5;
    let pDry = 0.5;

    if (weatherToday === 'rain') {
        const LS = 2.5;
        const LN = 0.6;
        let t_rain = pRain / (1 - pRain);//1
        let O_rain = LS * (t_rain);//2.5
        pRain = O_rain / (1 + O_rain);//.71
       
    } else if (weatherToday === 'dry') {
        const LS = 1.6;
        const LN = 0.4;
        let t_dry = pDry / (1 - pDry);//1
        let O_dry = LS * (t_dry );//.4
        pDry = O_dry / (1 + O_dry);//.29
        pRain=pRain;

    }

    if (weatherToday === 'rain' && rainfallToday === 'low') {
        const LS = 10;
        const LN = 1;
        let t_dry =pDry / (1 - pDry);//.41
        let O_dry = LS * (t_dry );//4.1
        pDry = O_dry / (1 + O_dry);//.8
        pRain=pRain;
     
    }

    if (weatherToday === 'rain' && rainfallToday === 'low' && temperatureToday === 'cold') {
        const LS = 1.5;
        const LN = 1;
        let t_dry=pDry / (1 - pDry);//4
        let O_dry = LS * (t_dry);//6
        pDry = O_dry / (1 + O_dry);//.86
        pRain=pRain;
    
    }

    if (weatherToday === 'dry' && temperatureToday === 'warm') {
        const LS = 2;
        const LN = 0.9;
        let t_rain=pRain / (1 - pRain);//2.45
        let O_rain = LS * (t_rain);//2.21
        pRain = O_rain / (1 + O_rain);//.69
        pDry =pDry;
        console.log(t_dry ,O_dry  ,pRain,pDry)
    }

    if (weatherToday === 'dry' && temperatureToday === 'warm' && cloudCoverToday === 'overcast') {
        const LS = 5;
        const LN = 1;
        let t_rain=pRain / (1 - pRain);//2.23
        let O_rain = LS * (t_rain);//2.23
        pRain = O_rain / (1 + O_rain);//0.69
       pDry =pDry;
       console.log(t_dry ,O_dry  ,pRain,pDry)
    }

    document.getElementById('result').innerHTML = `Prediction: <br> Tomorrow is dry: ${pDry.toFixed(2)} <br> Tomorrow is rain: ${pRain.toFixed(2)}`;
}
