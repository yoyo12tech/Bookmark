const bookmark=document.getElementById("s-name");
const url=document.getElementById("s-url");
const tBody = document.getElementById("tBody")
const overlay = document.querySelector(".overlay");


let stored = localStorage.getItem("bookmarks");
let bookmarks = stored ? JSON.parse(stored) : [];
displayBookmarks();



function isValidName(){
    const siteNamePattern=/^.{3,25}$/;
    var result = siteNamePattern.test(bookmark.value.trim());

    bookmark.classList.remove("error", "success");
    document.getElementById("error-i").style.display = "none";
    document.getElementById("success-i").style.display = "none";
    if (bookmark.value.trim()==""){
        return false
    }
    if(!result){
        bookmark.classList.add("error");
        document.getElementById("error-i").style.display="inline-block";
    }
    else{
        bookmark.classList.add("success");
        document.getElementById("success-i").style.display="inline-block";
    }
    return result
}

function isValidUrl(){
    const siteUrlValid=/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-./?%&=]*)?$/;
    var result= siteUrlValid.test(url.value);

    url.classList.remove("error", "success");
    document.getElementById("error-i2").style.display = "none";
    document.getElementById("success-i2").style.display = "none";
    if (url.value.trim()==""){
        return false
    }
    if(!result){
        url.classList.add("error");
        document.getElementById("error-i2").style.display="inline-block";
    }
    else{
        url.classList.add("success");
        document.getElementById("success-i2").style.display="inline-block";
    }
    return result

}


function isValidBookmark(){
    
    var isNameValid=isValidName();
    var isUrlValid=isValidUrl();

    return (isNameValid&&isUrlValid);
}

function addBookmark(){
    if(isValidBookmark()){
        bookmarks.push({
        name:bookmark.value,
        url:url.value
        })

        bookmark.value="";url.value="";

        bookmark.classList.remove("error", "success");
        url.classList.remove("error", "success");

        document.getElementById("error-i").style.display = "none";
        document.getElementById("success-i").style.display = "none";
        document.getElementById("error-i2").style.display = "none";
        document.getElementById("success-i2").style.display = "none";

        localStorage.setItem("bookmarks",JSON.stringify(bookmarks)) //local storage can only store strings! It has max capacity of 5MB/store key-value pairs in the user's browser — permanently (until manually cleared) Even if broseer is reloaded. i need to stringiy it to convert array or bject to trimg. whe i take it back i use parse to get the array or object.  
    }
    else{
        document.getElementById('close').checked = false;
    }
    displayBookmarks();
}
function displayBookmarks(){
    var content = `
    <tr class="line-seprator"><td colspan="80%"></td></tr>
    <tr><td colspan="100%"></td></tr>
    <tr><td colspan="100%"></td></tr>
    <tr><td colspan="100%"></td></tr>
    <tr><td colspan="100%"></td></tr>
    <tr><td colspan="100%"></td></tr>
    `
    for(var i =0;i<bookmarks.length;i++){
        content+=`
        <tr>
            <td id="index">${i}</td>
            <td id="web-name">${bookmarks[i].name}</td>
            <td id="visit" class="visit"><a href=${bookmarks[i].url} target="_blank"><i class="fa-solid fa-globe"></i>Visit</a></td>
            <td id="delete" class="delete" onClick="deleteBookmark(${i})"><button><i class="fa-solid fa-trash-can"></i>Delete</button></td>
        </tr>
        <tr><td colspan="100%"></td></tr>
        <tr><td colspan="100%"></td></tr>
        <tr><td colspan="100%"></td></tr>
        <tr><td colspan="100%"></td></tr>
        <tr><td colspan="100%"></td></tr> 
        `
    }
    tBody.innerHTML=content;
}

function deleteBookmark(index){
    bookmarks.splice(index,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks)) 
    displayBookmarks();
}