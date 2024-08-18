// use this in the browser console in schoology's website

const courseID = 5237237093;
let count = 1; // request count

const timeout = 500; // time between requests (ms)
const timerID = setInterval(getMembers, timeout);

let massiveResponse = '';

function getMembers() {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        xhr.status === 200 ? massiveResponse += `${xhr.response}\n` : console.error('Error!');
    };
    xhr.open('GET', `/enrollments/edit/members/course/${courseID}/ajax?ss=&p=${count}`);
    xhr.send();

    if (count % 50 === 0)
        console.log(count);

    if (count >= 460) {
        clearInterval(timerID);
        setTimeout(() => {
            console.log(massiveResponse);
            console.log(count);
        }, 2000);
    }
    else
        count++;
}

console.log("yay runnin!");
