import allRegions from './regions.js'
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');




async function currentTime (city, region) {
    const result = await fetch(`https://worldtimeapi.org/api/timezone/${region}/${city}`)
    .then((response) => {
        if (!response.ok) {
            alert("No  found.");
            clearInterval(intervalId)
            throw new Error("No  found.");
        } return response.json();
    })
    .then((data) => data);
    
    return result.datetime;  
};

// ogo('London')

async function formatDate(city, region){
    const timeLondn = await currentTime(city, region)
    const qwe = timeLondn.split('T').pop().split('.')[0];
    const lastRes = qwe.split(':')
    return lastRes;
}


async function setDate(city = 'London', region = 'Europe') {
    const lastRes = await formatDate(city, region);
    
    const hour = lastRes[0];
    const mins = lastRes[1];
    const seconds = lastRes[2];

    let hh = hour;
    let mm = mins;
    let ss = seconds;
    let session = "AM";
  
    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "" + hh : hh;
     mm = (mm < 10) ? "" + mm : mm;
     ss = (ss < 10) ? "" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 


    // const now = new Date();

    
    
    document.querySelector('h2').textContent = `Current time in '${city}'`;
    // const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    // const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    // const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}


document.querySelector('.city').addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        obj.set(e.target.value);
        clearValue()
    }
})
function clearValue () {
    document.querySelector(".city").value = "";
}

let intervalId;
const obj = {
    
    set: function (city) {
        // this.city = city;
        const region = this.findRegion(city);
        clearInterval(intervalId)
       intervalId = setInterval(() => setDate(city, region), 1000) 
       console.log(intervalId)
    },
    findRegion: function (city) {
        const res = Object.entries(allRegions).find(element => element[1].includes(city))
        if ( !res ) {
            clearValue()
            alert("No  found.");
            throw new Error("No  found.");
        } 

        return res[0]
    },
}

obj.set('London')
console.log(intervalId)
