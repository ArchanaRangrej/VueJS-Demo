<template>
  <div>
    <h2> Add Book</h2>
      <form @submit.prevent="validateForm()" enctype="multipart/form-data">
          <label>Enter Title : </label>
          <input v-validate="'required|alpha'" id="title" name="title" type="text" v-model="book.title"></input>
          <br/>
          <small v-show="errors.has('title')" class="error">{{ errors.first('title') }}</small>
          <br/><br/>
          <label>Enter Author : </label>
          <input v-validate="'required|alpha'" id="author" name="author" type="text" v-model="book.author"></input>
          <br/>
          <small v-show="errors.has('author')" class="error">{{ errors.first('author') }}</small>
          <br/><br/>
          <label>Enter Description : </label>
          <textarea id="description"
                       v-model="book.description"
                       placeholder="Enter something"
                       :rows="2"
                       :max-rows="6">{{book.description}}</textarea>
          <br /><br/>
          <label>Image :
            <input type="file" id="image" ref="image" v-on:change="handleFileUpload()"/>
          </label>
          <br /><br />
        <button type="submit" variant="primary">Save</button>
      </form>
    </div>
</template>

<style>
.error{
  color: red;
}
</style>

<script>

import axios from 'axios'

export default {
  name: 'CreateBook',
  data () {
    return {
      book: {},
      image: ''
    }
  },
  methods: {
    onSubmit (evt) {
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('book', JSON.stringify(this.book));
      var config = {
        headers: {'Content-type': 'multipart/form-data'}
      };
      axios.post(`http://localhost:8081/book/add`, formData, config)
      .then(response => {
        this.$router.push({
          name: 'Book List',
          params: { id: response.data._id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.onSubmit()
        }

      });
    },
    handleFileUpload(){.000000000000000000000000000000
    console.log(this.$refs.image.files[0]);
      this.image = this.$refs.image.files[0];
    }
  }
  
}
</script>