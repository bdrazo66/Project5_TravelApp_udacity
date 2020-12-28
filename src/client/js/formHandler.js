function handleSubmit(event) {
    event.preventDefault()
    UI();

    let inputText1 = document.getElementById('first_name').value
    let inputText2 = document.getElementById('last_name').value
    let inputText3 = document.getElementById('datepicker1').value
    let inputText4 = document.getElementById('datepicker2').value
    let results = document.getElementById('results')
    let results1 = document.getElementById('results1')
    let results2 = document.getElementById('results2')
    sendData({ cityOrg: inputText1, cityDes: inputText2, Dep: inputText3, Arr: inputText4 })

    //const TripInfo = document.getElementById('');
    results.innerHTML = `your Trip is From ${inputText1} to ${inputText2}`;
    results1.innerHTML = `your Depture Date is From ${inputText3} And Arrive Date on  ${inputText4}`;
    //results1.innerHTML = `your Depture Date is From ${inputText3} And Arrive Date on  ${inputText4}`;


    console.log(`your Trip is From ${inputText1} to ${inputText2}`);

    // check what text was put into the form field
    console.log("::: Form Submitted :::")

    async function sendData(data) {

        try {

            const request = await fetch('http://localhost:3223/s', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(data),
                mode: 'cors'

            });

            const response = await request.json();
            //UI();

        } catch (error) {
            console.log('/a throw this', error);
            //const text1 = document.getElementById('results')
            //text1.innerHTML = "there was an error, /a throw this";
            //conf.innerHTML = "there was an error, /a throw this";
            //agree.innerHTML = "there was an error, /a throw this";


        };

    };


    //Disable 
    async function UI() {
        const request = await fetch('http://localhost:3223/g')
        const data = await request.json();

        try {
            const results2 = document.getElementById('results2');
            results2.innerHTML = `${inputText2}  hight Temp is : ` + data.hTemp + `  and lowest Temp is  :` + data.mTemp + ` and the weather is : ` + data.Desc;

            console.log(`your Trip is From ${inputText1} to ${inputText2}`);
            console.log(`${inputText2} hight Temp is ${data.hTemp} and lowest Temp is ${data.mTemp} and the weather is ${data.Desc}`);
            console.log(data.image);
            console.log(data);

            const img = document.getElementById('img');
            img.src = data.image;
            //img.innerHTML = data.image;


            //const originCity = document.getElementById('results1');
            // originCity.innerHTML = "Origin City is   : " + data.name;
            //const destiCity = document.getElementById('results2');
            //destiCity.innerHTML = "Destination City is   :   " + data.name;


            //const depaDate = document.getElementById('results3');
            // depaDate.innerHTML = "Depature Date is    :  " + data.Agree;
            // const arriveDate = document.getElementById('results4');
            // arriveDate.innerHTML = "Arrive Date is    :  " + data.Agree;
            //console.log(data);
            //console.log(data.name);
            //console.log(data.Confidence);
            // console.log(data.Agree);

        } catch (error) {
            console.log("error3", error);
            //const TripInfo = document.getElementById('TripInfo');

            //TripInfo.innerHTML = "there was an error, /a throw this";
            //const conf = document.getElementById('results2')
            //conf.innerHTML = "there was an error, /a throw this";
            //const agree = document.getElementById('results1')
            //agree.innerHTML = "there was an error, /a throw this";

        }
    }; // end updatapi

}

export { handleSubmit }