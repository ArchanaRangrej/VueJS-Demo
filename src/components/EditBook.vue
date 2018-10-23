<template>
  <div>
    <h2> Edit Book</h2>
      <form @submit.prevent="validateForm()">
          <label>Enter Title : </label>
          <input v-validate="'required|alpha'" id="title" name="title" type="text" v-model="book.title"></input>
          <br />
          <small v-show="errors.has('title')" class="error">{{ errors.first('title') }}</small>
          <br/><br/>
          <label>Enter Author : </label>
          <input v-validate="'required|alpha'" id="author" name="author" type="text" v-model="book.author"></input>
          <br/>
          <small v-show="errors.has('title')" class="error">{{ errors.first('title') }}</small>
          <br/><br/>
          <label>Enter Description : </label>
          <textarea id="description"
                       v-model="book.description"
                       placeholder="Enter something"
                       :rows="2"
                       :max-rows="6">{{book.description}}</textarea>
          <br/><br/>
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
  name: 'EditBook',
  data () {
    return {
      book: {}
    }
  },
  created() {
    axios.get(`http://localhost:8081/book/get/` + this.$route.params.id)
    .then(response => {
      this.book = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit() {
      axios.put(`http://localhost:8081/book/update/` + this.$route.params.id, this.book) 
      .then(response => {
        this.$router.push({
          name: 'Book List',
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    validateForm() {
      this.$validator.validateAll().then((result) => {
        console.log(result);
        if (result) {
          this.onSubmit()
        }

      });
    }
  }
}
</script>