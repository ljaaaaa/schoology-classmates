/**
 * Schoology Classmates
 * 
 * 
 */

const red_main = "#c72c1e";
const green_main = "#38bd17";

const page_num_input = document.getElementById("num_pages");

let course_id = 0;

document.getElementById("submit_button").addEventListener("click", () => {
	get_members();
});

/**
 * Return the url of the current page
 */
function get_url(){
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          if (chrome.runtime.lastError) {
            
            return reject(chrome.runtime.lastError);
          }
    
          let activeTab = tabs[0];
          let activeTabUrl = activeTab.url;
    
          resolve(activeTabUrl);
        });
      });
}

/** Get the course ID from given URL */
function get_course_id(url) {
    console.log("LJA LOG: " + url)
    // URL object
    let url_obj = new URL(url);
  
    // Split pathname into parts
    let path_parts = url_obj.pathname.split('/');
  
    // Find the 'course' segment and get the following part as course ID
    let course_index = path_parts.indexOf('course');

    if (url.includes("fuhsd.schoology.com") && course_index !== -1 && course_index + 1 < path_parts.length) {
      return path_parts[course_index + 1];

    } else {
      return null; // Return null if course ID is not found
    }
}

/**
 * Update big_response with html members list + update popup
 */
function get_members(){
    let page_num = page_num_input.value; 
    let big_response = '';   

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        xhr.status === 200 ? big_response += `${xhr.response}\n` : console.error('Error!');

        update_popup(big_response);
    };
    xhr.open('GET', `https://fuhsd.schoology.com/enrollments/edit/members/course/${course_id}/ajax?ss=&p=${page_num}`);
    xhr.send();
}

/**
 * Update the popup with loaded members
 */
function update_popup(big_response){
	document.getElementById("popup").innerHTML = big_response;
}

/** Fetch the URL, get course ID */
get_url().then(url => {
    course_id = get_course_id(url);

    console.log("LJA LOG1: " + course_id);

    //GREEN: In schoology class
    if (course_id > 100){
        document.getElementById("header").style.backgroundColor = green_main;
        document.getElementById("header_message").innerHTML = "Welcome";
    
    //RED: Not in schoology class
    } else {
        document.getElementById("header").style.backgroundColor = red_main;
        document.getElementById("header_message").innerHTML = "Please open a class in Schoology";
    }
})