import { ref, watch, nextTick } from 'vue'
import axios from "axios"
import { updateCookie } from '../plugins/cookies.js'
import Cookies from 'js-cookie'
import { RouterView, useRoute, useRouter } from 'vue-router'
import {checkIfLogged} from '../views/HeaderView.vue'
import {clearintervalId,setPlaying,getPlaying,getCounter,startIntervalBooks} from '../views/BooksView.vue'
import {setEmail, setName} from '../components/Account.vue'
import api from '../services/api.ts'

const checkIfLog = () => {
    if(Cookies.get('id')==='undefined'||Cookies.get('email')==='undefined'||Cookies.get('name')==='undefined'||Cookies.get('typeProfile')==='undefined')
        return false
    else
        return true
}

export const makeLog = async (email, password) => {
    const router = useRouter()

    if(Cookies.get('id')==='undefined'||Cookies.get('email')==='undefined'||Cookies.get('name')==='undefined'||Cookies.get('typeProfile')==='undefined'){
        try {
        const res = await axios.get('https://cautious-puce-neckerchief.cyclic.app/checkLogin?email='+email.value+'&password='+password.value)
        if(res){
            updateCookie('id', res.data[0].idusuario)
            updateCookie('email', res.data[0].email)
            updateCookie('name', res.data[0].nome)
            updateCookie('typeProfile', res.data[0].perfil_idperfil)
            updateCookie('imageName', res.data[0].imagem_perfil_name)
            updateCookie('imageData', res.data[0].imagem_perfil_data)
            updateCookie('imageType', res.data[0].imagem_perfil_tipo)
            checkIfLogged()
            setEmail(Cookies.get('email'))
            setName(Cookies.get('name'))
            return 200
        }
        } catch (error) {
            if (error.response?.status === 401)
                return error.response.data.error
            else if (error.response?.status === 500)
                return error.response.data.error
        }
    }
}

export const showResponse = async (error) => {
    const errorEle = document.querySelector("#app > .error")
    if(errorEle===null){
        document.querySelector("#app").innerHTML+="<div class='error'>"+error+"</div>"
        const timeoutId = setTimeout(function() {
            const errorEle = document.querySelector("#app > .error")
            errorEle.remove()
        }, 5000)
    }else{
        errorEle.innerHTML=error
        clearTimeout(timeoutId)
        const timeoutId = setTimeout(function() {
            const errorEle = document.querySelector("#app > .error")
            errorEle.remove()
        }, 5000)
    }
}

export const updateUser = async () => {
    try {
        await api.get("/updateUser?e="+Cookies.get('email'))
    } catch (error) {
        console.log(error)
    }
}

export const events = () => {
    const account = () => {
        document.querySelector('.accont').addEventListener("click", () => {
            let popup = document.querySelector('.accountPopUp')
            if(popup.getAttribute('style')===null)
              popup.setAttribute('style','display:none')
            else
              popup.removeAttribute('style')
        })
        document.querySelector('.cameraIcon').addEventListener("click", () => {
            document.querySelector('.cameraIcon').nextSibling.click()
        })
        document.querySelector('#upload').addEventListener("change", async (event) => {
            const selectedFile = event.target.files[0];

            if (!selectedFile) {
                return;
            }
            const formData = new FormData()
            formData.append('image', selectedFile)
            formData.append('email', Cookies.get('email'))
            try {
                const res = await api.put("/upload", formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    }
                })
                nextTick(() => {
                    events()
                })
                console.log(res)
                updateCookie('imageName', res.data[0].imagem_perfil_name)
                updateCookie('imageData', res.data[0].imagem_perfil_data)
                updateCookie('imageType', res.data[0].imagem_perfil_tipo)
                showResponse('Profile Image Updated')
            } catch (error) {
                showResponse(error)
                nextTick(() => {
                    events()
                })
            }
        })
    }
    const bookView = () => {
        const copyButtons = document.querySelectorAll("#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:last-child > div:last-child")

        copyButtons.forEach(element => {
            element.addEventListener('click', () => {
            autoSelectandCopy(element.previousSibling.firstChild)
            })
        })

        const copyBar = document.querySelectorAll("#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:last-child > div:first-child > div")

        copyBar.forEach(element => {
            element.addEventListener('click', () => {
            autoSelectandCopy(element)
            })
        })

        const buyButtons = document.querySelectorAll("#booksList > div > div:first-child > div:last-child > div:last-child")

        buyButtons.forEach(element => {
            element.addEventListener('mouseover', () => {
                clearintervalId()
                setPlaying(false)
            })
        })

        buyButtons.forEach(element => {
            element.addEventListener('mouseleave', () => {
            if(element.previousSibling.lastChild.classList.value==="")
                startIntervalBooks()
            })
        })

        const shareButtons = document.querySelectorAll("#booksList > div > div:first-child > div:last-child > div:nth-child(2) > button")

        shareButtons.forEach(element => {
            element.addEventListener('click', () => {
            if(element.nextSibling.classList.value===""){
                element.nextSibling.classList.add("show")
                clearintervalId()
                setPlaying(false)
            }
            else{
                element.nextSibling.classList.remove("show")
                startIntervalBooks()
            }
            })
        })

        const closeShare = document.querySelectorAll("#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div > div:first-child > span")

        closeShare.forEach(element => {
            element.addEventListener('click', () => {
                element.parentNode.parentNode.classList.remove("show")
                startIntervalBooks()
            })
        })

        const showController = (element) => {
            if(element.firstChild!==null)
            if(getPlaying()){
                element.firstChild.classList.add("show")
                element.nextSibling.classList.remove("show")
                element.nextSibling.nextSibling.classList.add("show")
            }else{
                element.firstChild.classList.add("show")
                element.nextSibling.classList.add("show")
                element.nextSibling.nextSibling.classList.remove("show")
            }
        }

        const hiddenController = (element) => {
            element.innerHTML="<span>" + getCounter().value + "</span>"
            element.nextSibling.classList.remove("show")
            element.nextSibling.nextSibling.classList.remove("show")
        }

        const controllerNav = document.querySelectorAll("#booksList > div > ul > div > li")

        controllerNav.forEach(element => {
            element.addEventListener('mouseover', () => {
            if(element.classList.value==="active")
                showController(element)
            })
        })

        controllerNav.forEach(element => {
            element.addEventListener('mouseleave', () => {
            if(element.classList.value==="active")
                hiddenController(element)
            })
        })

        const controllerButtons = document.querySelectorAll("#booksList > div > ul > div > svg")

        controllerButtons.forEach(element => {
            element.addEventListener('mouseover', () => {
            if(element.parentNode.firstChild.classList.value==="active")
                showController(element.parentNode.firstChild)
            })
        })

        controllerButtons.forEach(element => {
            element.addEventListener('mouseleave', () => {
            hiddenController(element.parentNode.firstChild)
            })
        })

        const controllerImg = document.querySelectorAll("#booksList > div > ul > div > li")

        controllerImg.forEach(element => {
            element.addEventListener('mouseover', () => {
            if(element.classList.value!=="active")
                element.parentNode.lastChild.classList.add("show")
            })
        })

        controllerImg.forEach(element => {
            element.addEventListener('mouseleave', () => {
            element.parentNode.lastChild.classList.remove("show")
            })
        })

        const buttonPause = document.querySelectorAll("#booksList > div > ul > div > svg:nth-child(3)")

        buttonPause.forEach(element => {
            element.addEventListener('click', async () => {
            clearintervalId()
            setPlaying(false)
            element.classList.remove("show")
            element.previousSibling.classList.add("show")
            })
        })

        const buttonPlay = document.querySelectorAll("#booksList > div > ul > div > svg:nth-child(2)")

        buttonPlay.forEach(element => {
            element.addEventListener('click', async () => {
            document.querySelectorAll("#booksList > div > div:first-child > div:last-child > div:nth-child(2) > div.show").forEach(element => {
                element.classList.remove("show")
            })
            element.classList.remove("show")
            element.nextSibling.classList.add("show")
            setPlaying(true)
            startIntervalBooks()
            })
        })
    }
    if(checkIfLog())
        account()
    bookView()
}