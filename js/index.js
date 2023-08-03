var siteName = document.getElementById("Name")
var url = document.getElementById("Url")
var searchInput = document.getElementById("searchBar")




var bookList = [];

var namelist = [];

if (localStorage.getItem("Book") != null) {
    bookList = JSON.parse(localStorage.getItem("Book"))
    bookDisplay()
}




function addBook() {

    if (validName() == true && validUrl() == true) {

        var bookName = siteName.value;

        if (namelist.includes(bookName) == false) {

            namelist.push(bookName);
            var book = {
                name: bookName,
                Link: url.value
            }
            bookList.unshift(book)
            localStorage.setItem("Book", JSON.stringify(bookList))
            bookDisplay()
            bookClear()
        } else {
            alert("This Book has already beeb added!");
        }
    } else {
        alert("Site Name or Url is not valid \n\n Site name must contain at least 3 characters \n Site URL must be a valid one ")
    }
}



function deleteBook(index) {
    bookList.splice(index, 1)
    localStorage.setItem("Book", JSON.stringify(bookList))
    bookDisplay()

}



function bookDisplay() {
    var temp = "";
    for (var i = 0; i < bookList.length; i++) {
        temp += `<tr>
        <td>`+ (i + 1) + `</td>
        <td>`+ bookList[i].name + `</td>
        <td><button class="btn btn-visit btn-success" onclick="bookVisit(`+ i + `)">
            <i class="fa-solid fa-eye pe-2"></i>Visit
        </button></td>
        <td><button class="btn btn-delete btn-danger " onclick="deleteBook(`+ i + `)">
            <i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
        </td>
      </tr>`;
    }
    document.getElementById("bookTable").innerHTML = temp;
}



function bookVisit(index) {
    window.open(bookList[index].Link);
}


function bookClear() {
    document.getElementById("Name").value = ""
    document.getElementById("Url").value = ""
}


function searchProduct() {
    var temp = "";
    var term = searchInput.value.toLowerCase();
    var found = false;
    for (var i = 0; i < bookList.length; i++) {

        if (bookList[i].name.toLowerCase().includes(term) && bookList[i].name.slice(0, 1).toLowerCase() === term.slice(0, 1)) {
            temp += `<tr>
                <td>` + (i + 1) + `</td>
                <td>` + bookList[i].name + `</td>
                <td><button class="btn btn-visit btn-success" onclick="bookVisit(` + i + `)">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                </button></td>
                <td><button class="btn btn-delete btn-danger" onclick="deleteBook(` + i + `)">
                    <i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
                </td>
            </tr>`;

            found = true
        }
    }
    if (found) {
        document.getElementById("bookTable").innerHTML = temp;
    } else {
        bookDisplay()
    }

}





siteName.addEventListener("input", function () {
    if (validName(siteName.value)) {
        siteName.classList.add("is_Valid");
        siteName.classList.remove("non_Valid");
    } else {
        siteName.classList.remove("is_Valid");
        siteName.classList.add("non_Valid");
    }
});

// Add event listener for the "input" event on the "Url" input element
url.addEventListener("input", function () {
    if (validUrl(url.value)) {
        url.classList.add("is_Valid");
        url.classList.remove("non_Valid");
    } else {
        url.classList.remove("is_Valid");
        url.classList.add("non_Valid");
    }
});


function validUrl() {
    var regex_url = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    return regex_url.test(url.value);
}


function validName(value) {
    var regex_name = /.{3}/;
    return regex_name.test(value);
}