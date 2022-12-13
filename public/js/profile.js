const updateButton = document.querySelector(".updateButton");
const username = document.querySelector("#username")
const weight = document.querySelector("#weight")
const target_weight = document.querySelector("#target_weight")
const level = document.querySelector("#level")
const height = document.querySelector("#height")
const BMI = document.querySelector("#bmi")
const calories = document.querySelector("#calories")
const protien = document.querySelector("#protien")
const age = document.querySelector("#age").value



const showUpdates = async (user_id) => {


    fetch(`/profile/${user_id}/update`).then(res => res.json()).then(res => {

        username.value = '';
        username.placeholder = res.username;

        weight.value = '';
        weight.placeholder = res.weight;

        target_weight.value = '';
        target_weight.placeholder = res.target_weight;

        height.value = '';
        height.placeholder = res.height;

        level.value = res.level;
        level.placeholder = res.level;


        let heightInMeters = res.height * 0.01;
        let bmi = (res.weight / (heightInMeters * heightInMeters)).toFixed(2);
        let protiens = res.weight * 1.5;

        let calorie;

        //daily calories
        if (res.gender === "male")
            calorie = 66.47 + (13.75 * res.weight) + (5.003 * res.height) - (6.755 * age) + 200;
        else
            calorie = 655.1 + (9.563 * res.weight) + (1.850 * res.height) - (4.675 * age) + 200;

        console.log(bmi)
        BMI.placeholder = bmi;
        calories.placeholder = calorie;
        protien.placeholder = protiens;

    })
}

const sendUpdates = async (user_id) => {

    const username = document.getElementById('username').value
    const weight = document.getElementById('weight').value
    const height = document.getElementById('height').value
    const age = document.getElementById('age').value
    const level = document.getElementById('level').value
    const target_weight = document.getElementById('target_weight').value

    let data = { username, weight, height, age, level, target_weight }

    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    await fetch(`/profile/${user_id}`, option).then(res => res.json()).then(res => {
        if (!res) alert("the username is not unique, please try another name");
        else showUpdates(user_id)
    });

    
}



updateButton.addEventListener("click", () => sendUpdates(updateButton.getAttribute("id")));