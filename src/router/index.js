import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Book from '@/components/Book'
import CreateBook from '@/components/CreateBook'
import EditBook from '@/components/EditBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path: '/book',
    	name: 'Book List',
    	component: Book
    },
    {
      path: '/add',
      name: 'Add New Book',
      component: CreateBook
    },
    {
      path: '/edit/:id',
      name: 'Edit Book',
      component: EditBook
    }
  ]
})
