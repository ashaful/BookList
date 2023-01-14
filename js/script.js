//get the UL element

let form = document.querySelector('#book-form');
let  booklist = document.querySelector('#book-list')


//  book class

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn =isbn;

    }
}
//UI Class

class UI {
    
    static addBookList(book){
       let list = document.querySelector('#book-list');
       let row = document.createElement('tr');
       row.innerHTML = `
       <td> ${book.title}</td>
       <td> ${book.author}</td>
       <td> ${book.isbn}</td>

       <td><a href ='#' class="delete">X</a></td> ` ;

       list.appendChild(row);


    }
    static clearFields(){
       document.querySelector("#title").value = ' ';
       document.querySelector("#author").value = ' ';
       document.querySelector("#isbn").value = ' ';


    }


    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout( () => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteFromBook(target){
        if(target.hasAttribute('href'));{
        target.parentElement.parentElement.remove();
        Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
        UI.showAlert('Book Removed!' , 'success');

    }
}
}

//add local storage

class Store {
    static getBook (){
        let books;
        if (localStorage.getItem('books')=== null){
            books =[];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook (book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }


    static displayBooks(){
        let books = Store.getBooks();

        books.forEach(book =>{
            UI.addBookList(book);
        });
    }

    static removeBook(isbn){
        let books = Store.getBook();


        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books',JSON.stringify(books));
    }


}




// add event listener

form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());

// call function 

function newBook (e){


    let title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;
        
        

        if(title === '' || author === '' || isbn === ' '){    
           
        UI.showAlert("Plz fill all the fields !", "error");

        } else {

            let book =  new Book (title, author, isbn);
            UI.addBookList(book);
            UI.clearFields();
            UI.showAlert("book added", "success"); 

            Store.addBook(book);
            e.preventDefault();
        

         

         

         }


        e.preventDefault();
    
}




function removeBook(e){


   
    UI.deleteFromBook (e.target);
   



    e.preventDefault();
}
