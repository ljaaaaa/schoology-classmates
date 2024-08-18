/**
 * Schoology Classmates
 * 
 * 
 */

const red_main = "#c72c1e";
const green_main = "#38bd17";

//Setup Vars
const course_id_input = document.getElementById("course_id_input");
const num_pages_input = document.getElementById("num_pages");
let globalTimerID = 0;

//Photos Vars
let count = 1; // request count
let massiveResponse = '';
let status = 'idle'; //idle, running, stopped

document.getElementById("submit_button").addEventListener("click", () => {
	get_members();
});

/**
 * Fetch the url of the current page
 */
function find_course_id(){
    
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        /** Get URL */
        let activeTab = tabs[0];
        let activeTabUrl = activeTab.url;
        
        if (activeTabUrl.includes("fuhsd.schoology.com/course/")) {
            document.getElementById("header").style.backgroundColor = green_main;
            document.getElementById("header_message").innerHTML = "Welcome";
        } else {
            document.getElementById("header").style.backgroundColor = red_main;
            document.getElementById("header_message").innerHTML = "Please open a class in schoology";
        }
    });


}

/**
 * Start separate thread to update massiveResponse with a html page of all members
 */
function get_members(){
	const timeout = 500; // time between requests (ms)
	const timerID = setInterval(get_members_inner, timeout);
	globalTimerID = timerID;
}

/**
 * Inner function to be run until all members are fetched
 */
function get_members_inner() {
    let course_id = course_id_input.value;
    let num_pages = num_pages_input.value;

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        xhr.status === 200 ? massiveResponse += `${xhr.response}\n` : console.error('Error!');
    };
    xhr.open('GET', `https://fuhsd.schoology.com/enrollments/edit/members/course/${course_id}/ajax?ss=&p=${count}`);
    xhr.send();

    if (count % 50 === 0)
        console.log("LJA LOG: " + count);

    if (count >= num_pages) {
    	console.log("LJA LOG: Finished");
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

/**
 * Update the popup with loaded members
 */
function update_popup(){
	document.getElementById("popup").innerHTML = massiveResponse;
}

find_course_id();