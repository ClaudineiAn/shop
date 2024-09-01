import { createRouter, createWebHistory } from 'vue-router'
import api from '../services/api.ts'

const cat = []

const getCat = async () => {
  try {
    const response = await api.get('/getcatvue')
    cat.push(...response.data)
    return cat
  } catch (error) {
    console.error(error)
  }
}

export { getCat, cat }