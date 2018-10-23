<template>
  <div class="container">
    <h1>Books</h1>
    <a href="#/add">Add New Book</a>
    <br/><br/>
    <div class="search-wrapper">
      <label>Search title:</label>
      <!-- <input type="text" v-model="search" placeholder="Search title.." v-on:keyup="fetchBooks()"/> -->
      <input type="text" v-model="search" placeholder="Search title.."/>
      <button v-on:click="searchBook()">Search</button>
    </div>
    <br />
   	<table id="bookTable">
   		<tr>
   			<th v-on:click="orderBy('title')">Title</th>
   			<th v-on:click="orderBy('author')">Author</th>
   			<th v-on:click="orderBy('description')">Description</th>
   		</tr>
   		<tr v-for="book in books">
   			<td>{{ book.title }}</td>
   			<td>{{ book.author }} </td>
   			<td>{{ book.description }}</td>
   			<td><button v-on:click="updateBook(book._id)">Edit</button></td>
   			<td><button v-on:click="deleteBook(book._id)">Delete</button></td>
   		</tr>
   	</table>
  </div>
</template>

<style>
table {
	margin: 0 auto;
}
</style>

<script>

import axios from 'axios'

export default{
	name: 'Book',
	data() {
        return {
            books:[],
            search: '',
            data: [],
        }
    },
    created: function() { 
        // this.fetchBooks();
        this.searchBook();
    },
    methods: {
        fetchBooks() {
          var result = [];
          if (this.search != '') {
            result = this.data.filter(book => {
              return book.title.toLowerCase().includes(this.search.toLowerCase());
            });

            if (result.length > 0) {
              this.books = result;
            } else {
              this.books = '';
            }

          } else {
              axios.get('http://localhost:8081/book/books').then((response) => {
                this.data = response.data;
                this.books = this.data;
            });
          }
        },
        deleteBook(id) {
            axios.delete('http://localhost:8081/book/delete/' + id).then((response) => {
            	if (response.data.message == 'success') {
            		this.fetchBooks();
            	}
            });
        },
        updateBook(bookId) {
			    this.$router.push({
				    name: 'Edit Book',
				    params: { id: bookId }
			   });
        },
        orderBy: function(sortKey) {
          this.books.sort(function(a, b){
            var x = a[sortKey].toLowerCase();
            var y = b[sortKey].toLowerCase();

            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
          });
        },
        searchBook() {
          axios.get('http://localhost:8081/book/searchbooks?search=' + this.search).then((response) => {
              this.data = response.data;
              this.books = this.data;
          });
        }
    }
}

</script>

