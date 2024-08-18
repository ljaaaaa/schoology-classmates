// Preface (to those reading)
// I do not write JS, in fact do barely any webdev at all.
// This code is filled with horrendous code because I was writing this at 1am, including data races, and other atrocious things. I don't care enough to write proper JS
// This is a build-upon of something a friend (MV co23') wrote, can only claim partial credit for this

//Setup Vars

const course_id_input = document.getElementById("course_id_input");

let course_id = 0;

const num_pages_input = document.getElementById("num_pages");

let num_pages = 0; 

let globalTimerID = 0;

//Photos Vars

let count = 1; // request count

let massiveResponse = '';

let status = 'idle'; //idle, running, stopped

course_id_input.addEventListener("change", () => {
	course_id = course_id_input.value;
});

num_pages_input.addEventListener("change", () => {
	num_pages = num_pages_input.value;
});

document.getElementById("submit_button").addEventListener("click", () => {
	get_members();
});

function get_members(){
	console.log("me?");
	const timeout = 500; // time between requests (ms)
	const timerID = setInterval(get_members_inner, timeout);
	globalTimerID = timerID;
}

function get_members_inner() {
	console.log("me too?");
	console.log(num_pages);
	console.log(course_id);
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        xhr.status === 200 ? massiveResponse += `${xhr.response}\n` : console.error('Error!');
    };
    xhr.open('GET', `https://fuhsd.schoology.com/enrollments/edit/members/course/${course_id}/ajax?ss=&p=${count}`);
    xhr.send();

    if (count % 50 === 0)
        console.log(count);

    if (count >= num_pages) {
    	console.log("I'm done!!");
        clearInterval(globalTimerID);
        setTimeout(() => {
            console.log(massiveResponse);
            console.log(count);
            update_popup();
        }, 2000);
    }
    else
        count++;
}

function update_popup(){
	console.log("hey, i'm being done");
	document.getElementById("popup").innerHTML = massiveResponse;
}

console.log("running");
