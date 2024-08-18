// Preface (to those reading)
// I do not write JS, in fact do barely any webdev at all, so this probably looks horrendous to any webdev programmers
// This is a build-upon of something a friend (MV co23') wrote
// Hence can only claim partial credit for this

const course_id_input = document.getElementById("course_id_input");

const course_id = 0;

const num_pages_input = document.getElementByID("num_pages");

const num_pages = 0; 

course_id_input.addEventListener("change", () => {
	course_id = course_id_input.value;
	load_members();
});

num_pages_input.addEventListener("change", () => {
	num_pages = course_id_input.value;
});

load_members(){

}

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
