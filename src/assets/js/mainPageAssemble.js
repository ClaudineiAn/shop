import api from '../../services/api.ts'
export const setProperMetrics = async () => {
    const headerHeight = document.querySelector("header").offsetHeight;
    document.querySelector(".banner > div.box > div.titles").setAttribute('style', `top:${headerHeight}px`);
    document.querySelectorAll('.banner div.box>div.titles>h2>div:nth-child(4)').forEach(element => {
      element.setAttribute("style",`width:${element.parentNode.offsetWidth}px;height:${element.parentNode.offsetHeight}px`)
    })
    document.querySelectorAll('.banner div.box>div.titles>h2>div:last-child').forEach(element => {
      const translateY=element.parentNode.offsetHeight-10
      element.setAttribute("style",`width:${element.parentNode.offsetWidth}px;`)
      document.documentElement.style.setProperty('--main-title-ani-from', element.parentNode.offsetHeight-10+"px")
      document.documentElement.style.setProperty('--main-title-ani-to', element.parentNode.offsetHeight/2+"px")
    })
  }
  let ani;
  const startsAni = (target,to) => {
    var from=parseInt(target.parentNode.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.getAttribute("offset").match(/\d+/)[0])
    if(ani)
      clearInterval(ani)
    if(from>to)
      ani = setInterval(function() {
          from--
          const parent = target.parentNode.previousElementSibling;
          for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].firstElementChild.firstElementChild.nextElementSibling.setAttribute("offset", from + "%");
            parent.children[i].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.setAttribute("offset", from + "%");
          }
          if(from===to)
            clearInterval(ani)
      }, 200)
    if(from<to)
      ani = setInterval(function() {
          from++
          const parent = target.parentNode.previousElementSibling;
          for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].firstElementChild.firstElementChild.nextElementSibling.setAttribute("offset", from + "%");
            parent.children[i].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.setAttribute("offset", from + "%");
          }
          if(from===to)
            clearInterval(ani)
      }, 200)
  }
  export const assemble = async () => {
    try {
        const res = await api.get("/home")
        if(res){
        console.log(res)
        const boxDimensions = {width:100,height:100}
        const reductions = document.querySelector(".banner div.box>div.titles").offsetHeight+document.querySelector("header").offsetHeight
        var height=true
        var manyHeight=reductions
        var countHeight=0
        while(height){
            manyHeight+=boxDimensions.height
            if(manyHeight>=document.querySelector("body").offsetHeight)
            height=false
            else
            countHeight++
        }
        var width=true
        var manyWidth=0
        var countWidth=0
        while(width){
            manyWidth+=boxDimensions.width
            if(manyWidth>=document.querySelector("body").offsetWidth)
            width=false
            else
            countWidth++
        }
        var template=""
        var templatePopup=""
        var count=0
        for(var y=0;y<countHeight;y++){
            template+="<div>"
            for(var x=0;x<countWidth;x++){
            if(res.data[count]!==undefined){
                template+="<div>"
                template+=`<img src="${require(`@/assets/images/${res.data[count].imagem.split(', ')[0]}`)}" />`
                template+="<div><div><div></div><div></div></div><div><div></div><div></div></div></div>"
                template+="<div><div>"
                template+=`<svg viewBox="0 0 1024 1024" fill="#000000" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><linearGradient id="gradient">
            <stop offset="0%" stop-color="#F8EB6B">
            <animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite" />
            </stop>
        </linearGradient><path fill="url(#gradient)" d="M983.902 815.94H40.096c-22.05 0-39.992-17.934-39.992-39.992V248.056c0-22.058 17.942-39.992 39.992-39.992h943.806c22.058 0 39.992 17.934 39.992 39.992v527.892c0 22.058-17.934 39.992-39.992 39.992zM40.096 224.06c-13.23 0-23.994 10.762-23.994 23.996v527.892c0 13.23 10.764 23.994 23.994 23.994h943.806c13.23 0 23.992-10.764 23.992-23.994V248.056c0-13.232-10.762-23.996-23.992-23.996H40.096zM98.476 899.438c-7.654 0-15.168-2.234-21.77-6.53-8.982-5.86-15.128-14.826-17.316-25.262l-7.138-34.07a7.99 7.99 0 0 1 6.186-9.466c4.282-1 8.57 1.874 9.466 6.186l7.14 34.07c1.312 6.25 5.006 11.624 10.396 15.138 5.406 3.53 11.794 4.716 18.004 3.404L387.68 823.36c4.282-0.968 8.57 1.86 9.466 6.186a7.988 7.988 0 0 1-6.186 9.466L106.74 898.562a40.158 40.158 0 0 1-8.264 0.876zM638.348 200.066a7.99 7.99 0 0 1-7.812-6.358 7.992 7.992 0 0 1 6.188-9.466l280.582-58.816c21.622-4.546 42.79 9.358 47.336 30.932l7.136 34.07a7.99 7.99 0 0 1-6.184 9.466c-4.25 0.968-8.578-1.86-9.468-6.186l-7.136-34.072c-2.718-12.95-15.422-21.214-28.402-18.558L640.004 199.894a7.514 7.514 0 0 1-1.656 0.172z" /><path fill="url(#gradient)" d="M983.902 815.94H40.096c-22.05 0-39.992-17.934-39.992-39.992V248.056c0-22.058 17.942-39.992 39.992-39.992h943.806c22.058 0 39.992 17.934 39.992 39.992v527.892c0 22.058-17.934 39.992-39.992 39.992zM40.096 224.06c-13.23 0-23.994 10.762-23.994 23.996v527.892c0 13.23 10.764 23.994 23.994 23.994h943.806c13.23 0 23.992-10.764 23.992-23.994V248.056c0-13.232-10.762-23.996-23.992-23.996H40.096zM218.068 999.728c-3.49 0-7.014-0.454-10.49-1.39-10.35-2.766-18.972-9.374-24.284-18.59l-36.868-63.862a7.988 7.988 0 0 1 2.93-10.92c3.802-2.234 8.716-0.906 10.926 2.922l36.868 63.862c3.178 5.514 8.358 9.466 14.576 11.138 6.194 1.656 12.67 0.844 18.208-2.36l269.382-155.514c3.804-2.25 8.702-0.906 10.926 2.92a7.988 7.988 0 0 1-2.928 10.92l-269.382 155.532a39.544 39.544 0 0 1-19.864 5.342zM520.692 200.066a8.004 8.004 0 0 1-6.934-4 7.986 7.986 0 0 1 2.93-10.92l269.378-155.53c9.204-5.326 19.934-6.716 30.34-3.968 10.34 2.78 18.964 9.374 24.274 18.59l36.82 63.816a7.978 7.978 0 0 1-2.918 10.918 7.988 7.988 0 0 1-10.922-2.92l-36.836-63.814c-3.188-5.516-8.36-9.466-14.558-11.138-6.266-1.64-12.714-0.828-18.2 2.36L524.684 198.988a7.894 7.894 0 0 1-3.992 1.078z" /><path d="M983.902 320.04H40.096a7.994 7.994 0 0 1-7.998-7.998 7.994 7.994 0 0 1 7.998-7.998h943.806a7.994 7.994 0 0 1 7.996 7.998 7.992 7.992 0 0 1-7.996 7.998zM983.902 432.018H40.096a7.994 7.994 0 0 1-7.998-8 7.994 7.994 0 0 1 7.998-7.998h943.806a7.994 7.994 0 0 1 7.996 7.998c0 4.422-3.578 8-7.996 8zM72.09 396.696a7.99 7.99 0 0 1-7.53-10.7l15.996-44.662c1.492-4.17 6.076-6.28 10.224-4.828a7.992 7.992 0 0 1 4.834 10.232l-15.996 44.664a7.994 7.994 0 0 1-7.528 5.294zM120.082 396.696a7.99 7.99 0 0 1-7.53-10.7l15.998-44.662c1.492-4.17 6.084-6.28 10.224-4.828a7.994 7.994 0 0 1 4.834 10.232l-15.996 44.664a8.004 8.004 0 0 1-7.53 5.294zM168.056 396.696a7.99 7.99 0 0 1-7.53-10.7l15.998-44.662c1.484-4.17 6.076-6.28 10.224-4.828a7.994 7.994 0 0 1 4.834 10.232l-15.996 44.664a8.004 8.004 0 0 1-7.53 5.294zM216.03 396.696a7.992 7.992 0 0 1-7.53-10.7l15.998-44.662c1.492-4.17 6.068-6.28 10.224-4.828a7.99 7.99 0 0 1 4.834 10.232l-15.996 44.664a8 8 0 0 1-7.53 5.294zM264.02 396.696a7.992 7.992 0 0 1-7.53-10.7l15.998-44.662c1.484-4.17 6.078-6.28 10.224-4.828a7.99 7.99 0 0 1 4.834 10.232l-15.996 44.664a8 8 0 0 1-7.53 5.294zM312.008 396.696a7.992 7.992 0 0 1-7.53-10.7l15.998-44.662c1.492-4.17 6.054-6.28 10.224-4.828a7.99 7.99 0 0 1 4.834 10.232l-15.998 44.664a7.992 7.992 0 0 1-7.528 5.294zM359.984 396.696a7.99 7.99 0 0 1-7.528-10.7l15.998-44.662c1.5-4.17 6.084-6.28 10.224-4.828a7.992 7.992 0 0 1 4.836 10.232l-15.998 44.664a8.006 8.006 0 0 1-7.532 5.294zM407.958 396.696a7.99 7.99 0 0 1-7.528-10.7l15.996-44.662c1.492-4.17 6.078-6.28 10.224-4.828a7.992 7.992 0 0 1 4.836 10.232l-15.998 44.664a8 8 0 0 1-7.53 5.294zM455.948 396.696a7.99 7.99 0 0 1-7.528-10.7l15.996-44.662c1.484-4.17 6.084-6.28 10.224-4.828a7.99 7.99 0 0 1 4.834 10.232l-15.998 44.664a7.994 7.994 0 0 1-7.528 5.294zM503.938 396.696a7.992 7.992 0 0 1-7.53-10.7l15.996-44.662c1.492-4.17 6.06-6.28 10.224-4.828a8 8 0 0 1 4.836 10.232l-15.998 44.664a7.994 7.994 0 0 1-7.528 5.294zM551.914 396.696a8 8 0 0 1-7.532-10.7l15.996-44.662c1.484-4.14 6.078-6.264 10.234-4.828a8.002 8.002 0 0 1 4.824 10.232l-15.996 44.664a7.996 7.996 0 0 1-7.526 5.294zM599.886 396.696c-0.89 0-1.812-0.156-2.704-0.468-4.156-1.484-6.308-6.06-4.828-10.232l16-44.662c1.5-4.14 6.074-6.264 10.23-4.828a8 8 0 0 1 4.828 10.232l-15.996 44.664a7.998 7.998 0 0 1-7.53 5.294zM647.878 396.696a8 8 0 0 1-7.532-10.7l15.996-44.662c1.484-4.14 6.078-6.264 10.234-4.828a8.002 8.002 0 0 1 4.824 10.232l-15.996 44.664a7.996 7.996 0 0 1-7.526 5.294zM695.868 396.696a8 8 0 0 1-7.532-10.7l16-44.662c1.496-4.14 6.058-6.264 10.23-4.828a8 8 0 0 1 4.828 10.232l-15.996 44.664a8 8 0 0 1-7.53 5.294zM743.856 396.696a8 8 0 0 1-7.528-10.7l15.996-44.662c1.5-4.14 6.078-6.264 10.23-4.828a8 8 0 0 1 4.828 10.232l-15.996 44.664a8 8 0 0 1-7.53 5.294zM791.848 396.696a8 8 0 0 1-7.532-10.7l15.996-44.662c1.484-4.14 6.094-6.264 10.234-4.828a8 8 0 0 1 4.828 10.232l-15.996 44.664a8 8 0 0 1-7.53 5.294zM839.836 396.696a8 8 0 0 1-7.528-10.7l15.996-44.662c1.5-4.14 6.062-6.264 10.23-4.828a8 8 0 0 1 4.828 10.232l-15.996 44.664a7.998 7.998 0 0 1-7.53 5.294zM887.828 396.696a8 8 0 0 1-7.532-10.7l15.996-44.662c1.484-4.14 6.078-6.264 10.234-4.828 4.156 1.484 6.308 6.062 4.828 10.232l-16 44.664a7.992 7.992 0 0 1-7.526 5.294zM935.816 396.696c-0.89 0-1.812-0.156-2.704-0.468a8.002 8.002 0 0 1-4.824-10.232l15.996-44.662c1.5-4.14 6.062-6.264 10.23-4.828a8 8 0 0 1 4.828 10.232l-15.996 44.664a7.998 7.998 0 0 1-7.53 5.294zM120.026 671.906a8 8 0 0 1-6.414-3.204c-11.466-15.324-17.528-33.554-17.528-52.722 0-48.506 39.468-87.982 87.982-87.982a7.994 7.994 0 0 1 7.998 7.998 7.994 7.994 0 0 1-7.998 7.998c-39.696 0-71.986 32.292-71.986 71.986 0 15.684 4.96 30.604 14.34 43.13a8.008 8.008 0 0 1-1.61 11.202 7.94 7.94 0 0 1-4.784 1.594zM184.068 703.962a7.994 7.994 0 0 1-7.998-8 7.994 7.994 0 0 1 7.998-7.998c39.696 0 71.984-32.29 71.984-71.984 0-10.03-2.014-19.73-5.998-28.822a7.988 7.988 0 0 1 4.116-10.53c4.078-1.75 8.772 0.062 10.538 4.124 4.874 11.124 7.342 22.98 7.342 35.228-0.002 48.506-39.468 87.982-87.982 87.982z" fill="url(#gradient)" /><path d="M168.072 607.982a7.996 7.996 0 0 1-5.656-13.654l95.98-95.982a7.996 7.996 0 1 1 11.31 11.31l-95.98 95.982a7.964 7.964 0 0 1-5.654 2.344z" fill="url(#gradient)" /><path d="M200.064 639.974a7.972 7.972 0 0 1-5.654-2.344l-31.994-31.992a7.996 7.996 0 1 1 11.31-11.31l31.994 31.994a7.994 7.994 0 0 1-5.656 13.652z" fill="url(#gradient)" /><path d="M104.084 735.956a7.994 7.994 0 0 1-5.656-13.652l95.98-95.98a7.996 7.996 0 1 1 11.31 11.308l-95.98 95.98a7.972 7.972 0 0 1-5.654 2.344zM663.968 575.988H360.03c-4.42 0-7.998-3.576-7.998-7.998s3.578-7.998 7.998-7.998h303.938c4.418 0 7.996 3.576 7.996 7.998s-3.578 7.998-7.996 7.998zM663.968 623.978H360.03a7.994 7.994 0 0 1-7.998-7.998 7.994 7.994 0 0 1 7.998-7.998h303.938a7.992 7.992 0 0 1 7.996 7.998 7.994 7.994 0 0 1-7.996 7.998z" fill="url(#gradient)" /><path d="M504 671.968h-143.97a7.994 7.994 0 0 1-7.998-7.998c0-4.422 3.578-8 7.998-8H504a7.994 7.994 0 0 1 7.998 8 7.992 7.992 0 0 1-7.998 7.998z" fill="url(#gradient)" /><path d="M791.942 607.982c-22.058 0-39.992-17.934-39.992-39.992s17.934-39.992 39.992-39.992 39.992 17.934 39.992 39.992-17.934 39.992-39.992 39.992z m0-63.988c-13.23 0-23.996 10.764-23.996 23.996 0 13.23 10.766 23.996 23.996 23.996s23.996-10.766 23.996-23.996c0-13.232-10.766-23.996-23.996-23.996z" fill="url(#gradient)" /><path d="M887.922 703.962c-22.058 0-39.992-17.934-39.992-39.992s17.934-39.992 39.992-39.992 39.992 17.934 39.992 39.992-17.934 39.992-39.992 39.992z m0-63.988c-13.23 0-23.996 10.764-23.996 23.996 0 13.23 10.766 23.994 23.996 23.994s23.996-10.764 23.996-23.994c0-13.232-10.766-23.996-23.996-23.996z" fill="url(#gradient)" /><path d="M759.886 703.9a7.996 7.996 0 0 1-5.656-13.654l159.886-159.904a8 8 0 0 1 11.312 11.31l-159.89 159.904a7.962 7.962 0 0 1-5.652 2.344z" fill="url(#gradient)" /></svg>`
                template+="</div>"
                template+="<div>"
                template+="<div>"
                template+=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.031 46.768">
        <linearGradient id="gradient">
            <stop offset="0%" stop-color="#F8EB6B">
            <animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite" />
            </stop>
        </linearGradient>
        <g id="shopping-cart-1989" transform="translate(566.599 540.01)">
            <g id="Grupo_3" data-name="Grupo 3" transform="translate(-566.599 -540.01)">
            <path id="Caminho_8" fill="url(#gradient)" data-name="Caminho 8" d="M384.753,355.806a3.144,3.144,0,0,0-2.541-1.273h-47.64l-.587-2.26a4.448,4.448,0,0,0-4.3-3.329H323.21a.855.855,0,1,0,0,1.711h6.471a2.737,2.737,0,0,1,2.648,2.048l7.78,29.96a.855.855,0,0,0,.828.641h36.374a.855.855,0,1,0,0-1.711H341.6l-1.589-6.116h36.935a4.467,4.467,0,0,0,4.259-3.182l4.048-13.692A3.139,3.139,0,0,0,384.753,355.806Zm-1.14,2.311-4.048,13.692a2.746,2.746,0,0,1-2.619,1.956h-37.38l-4.55-17.522h47.2a1.46,1.46,0,0,1,1.4,1.873Z" transform="translate(-322.354 -348.944)"></path>
            <path id="Caminho_9" fill="url(#gradient)" data-name="Caminho 9" d="M788.239,1211.888a4.912,4.912,0,1,1,4.913-4.913A4.918,4.918,0,0,1,788.239,1211.888Zm0-8.114a3.2,3.2,0,1,0,3.2,3.2A3.205,3.205,0,0,0,788.239,1203.774Z" transform="translate(-763.365 -1165.12)"></path>
            <path id="Caminho_10" fill="url(#gradient)" data-name="Caminho 10" d="M1316.04,1211.888a4.912,4.912,0,1,1,4.913-4.913A4.918,4.918,0,0,1,1316.04,1211.888Zm0-8.114a3.2,3.2,0,1,0,3.2,3.2A3.205,3.205,0,0,0,1316.04,1203.774Z" transform="translate(-1268.31 -1165.12)"></path>
            </g>
        </g>
    </svg>`
                template+="</div>"
                template+="<div>"
                template+=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.025 41.768">
        <linearGradient id="gradient">
            <stop offset="0%" stop-color="#F8EB6B">
            <animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite" />
            </stop>
        </linearGradient>
        <g id="shopping-cart-1988" transform="translate(-511.094 416.046)">
            <g id="Grupo_2" data-name="Grupo 2" transform="translate(511.094 -416.046)">
            <path id="Caminho_7" fill="url(#gradient)" data-name="Caminho 7" d="M118.644,58.758l-.6-.35c-4.692-2.728-12-9.141-15.041-13.195-6.4-8.545-7.735-18.653-3.164-24.034A11.767,11.767,0,0,1,108.48,17a14.4,14.4,0,0,1,10.164,4.018A14.444,14.444,0,0,1,128.807,17a11.77,11.77,0,0,1,8.644,4.181h0c4.569,5.38,3.239,15.488-3.164,24.034-3.041,4.056-10.35,10.468-15.04,13.195ZM108.925,19.57c-.12,0-.24,0-.361.006a9.357,9.357,0,0,0-6.876,3.313c-3.718,4.379-2.317,13.294,3.262,20.736,2.7,3.605,9.285,9.431,13.694,12.167,4.407-2.736,10.99-8.561,13.692-12.167,5.669-7.564,7.041-16.286,3.261-20.736h0a9.355,9.355,0,0,0-6.876-3.313,12.331,12.331,0,0,0-9.21,4.115l-.868.89-.868-.89A12.525,12.525,0,0,0,108.925,19.57Z" transform="translate(-97.13 -16.99)"></path>
            </g>
        </g>
    </svg>`
                template+="</div>"
                template+="</div>"
                template+="<div>"
                template+=`<svg fill="#000000" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><linearGradient id="gradient">
            <stop offset="0%" stop-color="#F8EB6B">
            <animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite" />
            </stop>
        </linearGradient><path fill="url(#gradient)" d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path></svg>`
                template+="</div></div>"
                template+="<div></div></div>"
                //if(count===0)
                //templatePopup+="<div class='view'>"
                //else
                templatePopup+="<div class='view' style='display:none'>"
                templatePopup+="<div>"
                templatePopup+=`<img src="${require(`@/assets/images/${res.data[count].imagem.split(', ')[0]}`)}" />`
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+="<h2>"
                if(res.data[count].edicao!==0)
                templatePopup+=`<span>${res.data[count].edicao}</span>`
                templatePopup+=`<span>${res.data[count].nome}</span>`
                templatePopup+="</h2>"
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+=`<p>${res.data[count].descricao}</p>`
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                var starGradient=0
                if(res.data[count].score>3.74)
                starGradient=25
                else if(res.data[count].score>2.49)
                starGradient=50
                else if(res.data[count].score>0)
                starGradient=75
                else if(res.data[count].score===0)
                starGradient=100
                for(var i=0;i<5;i++)
                templatePopup+=`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="fill${count}" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style="stop-color: rgba(255, 215, 0, 0.5); stop-opacity: 1" />
    <stop offset="${starGradient}%" style="stop-color: rgba(255, 215, 0, 0.5); stop-opacity: 0" />
    <stop offset="${starGradient}%" style="stop-color: #453100; stop-opacity: 1" />
    <stop offset="100%" style="stop-color: #453100; stop-opacity: 1" />
    </linearGradient>
    <path d="M11.5245 4.46353C11.6741 4.00287 12.3259 4.00287 12.4755 4.46353L13.9084 8.87336C13.9753 9.07937 14.1673 9.21885 14.3839 9.21885H19.0207C19.505 9.21885 19.7064 9.83866 19.3146 10.1234L15.5633 12.8488C15.3881 12.9761 15.3148 13.2018 15.3817 13.4078L16.8145 17.8176C16.9642 18.2783 16.437 18.6613 16.0451 18.3766L12.2939 15.6512C12.1186 15.5239 11.8814 15.5239 11.7061 15.6512L7.95488 18.3766C7.56303 18.6613 7.03578 18.2783 7.18546 17.8176L8.6183 13.4078C8.68524 13.2018 8.61191 12.9761 8.43667 12.8488L4.68544 10.1234C4.29358 9.83866 4.49497 9.21885 4.97933 9.21885H9.6161C9.83272 9.21885 10.0247 9.07937 10.0916 8.87336L11.5245 4.46353Z" stroke="#453100" fill="url(#fill${count})" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>`
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div></div>"
                templatePopup+="<div></div>"
                templatePopup+="<div></div>"
                templatePopup+="<div></div>"
                templatePopup+="<div></div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+=`<img src="${require(`@/assets/images/${res.data[count].imagem.split(', ')[0]}`)}" />`
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+="<input />"
                templatePopup+="<div>"
                templatePopup+="<span>0</span><span>1000</span>"
                templatePopup+="<input type='button' value='Submit' />"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+=`<img src="${require(`@/assets/images/${res.data[count].imagem.split(', ')[0]}`)}" />`
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+="<span>@name</span><span>since 2 years</span>"
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test"
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="Up<span>1377</span>Down<input type='button' value='Comment' />"
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<span>40</span> Answers"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="<div>"
                var formats = JSON.parse(res.data[count].formats)
                formats.forEach((format) => {
                    format.forEach((dataFormat) => {
                        switch (dataFormat.name) {
                            case 'Kindle':
                            templatePopup+=`<div><span>Dimensions</span><span>${res.data[count].dimensoes}</span></div>`
                            templatePopup+=`<div><span>Publishing</span><span>${res.data[count].editora}</span></div>`
                            if(res.data[count].idade_de_leitura!=="0")
                            templatePopup+=`<div><span>Age</span><span>${res.data[count].idade_de_leitura}</span></div>`
                            templatePopup+=`<div><span>Language</span><span>${res.data[count].idioma}</span></div>`
                            templatePopup+=`<div><span>Pages</span><span>${res.data[count].numero_de_paginas}</span></div>`
                            templatePopup+=`<div><span>Writer</span><span>${res.data[count].por}</span></div>`
                            templatePopup+=`<div><span>Published</span><span>${res.data[count].publicado}</span></div>`
                            templatePopup+=`<div class="new"><span>File Size</span><span>${res.data[count].tamanho_do_arquivo}</span></div>`
                            break;
                            default:
                            templatePopup+=`<div><span>Dimensions</span><span>${res.data[count].dimensoes}</span></div>`
                            templatePopup+=`<div><span>Publishing</span><span>${res.data[count].editora}</span></div>`
                            if(res.data[count].idade_de_leitura!=="0")
                            templatePopup+=`<div><span>Age</span><span>${res.data[count].idade_de_leitura}</span></div>`
                            templatePopup+=`<div><span>Language</span><span>${res.data[count].idioma}</span></div>`
                            templatePopup+=`<div><span>Pages</span><span>${res.data[count].numero_de_paginas}</span></div>`
                            templatePopup+=`<div><span>Writer</span><span>${res.data[count].por}</span></div>`
                            templatePopup+=`<div><span>Published</span><span>${res.data[count].publicado}</span></div>`
                        }
                    })
                })
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                formats.forEach((format, index) => {
                if(index===0)
                    templatePopup+="<div class='selected'>"
                else
                    templatePopup+="<div>"
                templatePopup+=`<span>${format.name}</span>`
                templatePopup+="<div>"
                if(format.discount===0)
                    templatePopup+=`<span>${res.data[count].current}</span><span>${format.price}</span>`
                else{
                    templatePopup+="<div>"
                    templatePopup+="<div>"
                    templatePopup+=`<span>${res.data[count].current}</span><span>${format.price}</span><span></span><div><span>Discount</span><div><span>${format.discount}</span><span>%</span></div></div>`
                    templatePopup+="</div>"
                    templatePopup+="<div>"
                    templatePopup+=`<span>${res.data[count].current}</span><span>${format.price*(format.discount/100)}</span>`
                    templatePopup+="</div>"
                    templatePopup+="</div>"
                }
                templatePopup+="</div>"
                templatePopup+="</div>"
                })
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<div>"
                templatePopup+=`<svg xmlns="http://www.w3.org/2000/svg" width="43.025" height="31.768" viewBox="0 0 43.025 41.768" class="options"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite"></animate></stop></linearGradient><g id="shopping-cart-1988" transform="translate(-511.094 416.046)"><g id="Grupo_2" data-name="Grupo 2" transform="translate(511.094 -416.046)"><path id="Caminho_7" fill="url(#gradient)" data-name="Caminho 7" d="M118.644,58.758l-.6-.35c-4.692-2.728-12-9.141-15.041-13.195-6.4-8.545-7.735-18.653-3.164-24.034A11.767,11.767,0,0,1,108.48,17a14.4,14.4,0,0,1,10.164,4.018A14.444,14.444,0,0,1,128.807,17a11.77,11.77,0,0,1,8.644,4.181h0c4.569,5.38,3.239,15.488-3.164,24.034-3.041,4.056-10.35,10.468-15.04,13.195ZM108.925,19.57c-.12,0-.24,0-.361.006a9.357,9.357,0,0,0-6.876,3.313c-3.718,4.379-2.317,13.294,3.262,20.736,2.7,3.605,9.285,9.431,13.694,12.167,4.407-2.736,10.99-8.561,13.692-12.167,5.669-7.564,7.041-16.286,3.261-20.736h0a9.355,9.355,0,0,0-6.876-3.313,12.331,12.331,0,0,0-9.21,4.115l-.868.89-.868-.89A12.525,12.525,0,0,0,108.925,19.57Z" transform="translate(-97.13 -16.99)"></path></g></g></svg><span></span>`
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+="<input type='button' value='Buy' />"
                templatePopup+="</div>"
                templatePopup+="<div>"
                templatePopup+=`<svg xmlns="http://www.w3.org/2000/svg" width="63.031" height="30.768" viewBox="0 0 63.031 46.768" class="options"><linearGradient id="gradient"><stop offset="0%" stop-color="#F8EB6B"><animate attributeName="stop-color" values="#F8EB6B; #453100; #F8EB6B" dur="5s" repeatCount="indefinite"></animate></stop></linearGradient><g id="shopping-cart-1989" transform="translate(566.599 540.01)"><g id="Grupo_3" data-name="Grupo 3" transform="translate(-566.599 -540.01)"><path id="Caminho_8" fill="url(#gradient)" data-name="Caminho 8" d="M384.753,355.806a3.144,3.144,0,0,0-2.541-1.273h-47.64l-.587-2.26a4.448,4.448,0,0,0-4.3-3.329H323.21a.855.855,0,1,0,0,1.711h6.471a2.737,2.737,0,0,1,2.648,2.048l7.78,29.96a.855.855,0,0,0,.828.641h36.374a.855.855,0,1,0,0-1.711H341.6l-1.589-6.116h36.935a4.467,4.467,0,0,0,4.259-3.182l4.048-13.692A3.139,3.139,0,0,0,384.753,355.806Zm-1.14,2.311-4.048,13.692a2.746,2.746,0,0,1-2.619,1.956h-37.38l-4.55-17.522h47.2a1.46,1.46,0,0,1,1.4,1.873Z" transform="translate(-322.354 -348.944)"></path><path id="Caminho_9" fill="url(#gradient)" data-name="Caminho 9" d="M788.239,1211.888a4.912,4.912,0,1,1,4.913-4.913A4.918,4.918,0,0,1,788.239,1211.888Zm0-8.114a3.2,3.2,0,1,0,3.2,3.2A3.205,3.205,0,0,0,788.239,1203.774Z" transform="translate(-763.365 -1165.12)"></path><path id="Caminho_10" fill="url(#gradient)" data-name="Caminho 10" d="M1316.04,1211.888a4.912,4.912,0,1,1,4.913-4.913A4.918,4.918,0,0,1,1316.04,1211.888Zm0-8.114a3.2,3.2,0,1,0,3.2,3.2A3.205,3.205,0,0,0,1316.04,1203.774Z" transform="translate(-1268.31 -1165.12)"></path></g></g></svg><span></span>`
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
                templatePopup+="</div>"
            }
            count++
            }
            template+="</div>"
        }
        document.querySelector(".banner div.box>div.data").innerHTML=template
        document.querySelector(".banner div.box>div.popup").innerHTML=templatePopup
        document.querySelectorAll(".banner div.box>div.data>div>div>div:nth-child(2)>div:last-child>div:last-child").forEach((element, index) => {
            element.addEventListener("click", function(event) {
                var i = index + 1;
                document.querySelectorAll(`.banner div.box>div.popup>div:nth-child(${i})`).forEach(popup => {
                    popup.removeAttribute("style");
                });
            });
        });
        document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div:last-child > div").forEach(element => element.addEventListener("mouseenter", function(event) {
            document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div:first-child").setAttribute("class","index")
        }));
        const hoverStar = document.querySelectorAll('.sow');
        hoverStar.addEventListener('mousemove', function(event) {
            const star = document.querySelector(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div>svg>path");
            const mouseY = (event.offsetY / star.height) * 100;
        });
        hoverStar.addEventListener('mouseleave', function() {
            hoverRect.style.background = '';
        });

        document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div:last-child > div:first-child").forEach(element => element.addEventListener("mouseenter", function(event) {
            event.target.parentNode.parentNode.firstElementChild.setAttribute("data-val","5")
            startsAni(event.target, 0)
        }));
        document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div:last-child > div:nth-child(2)").forEach(element => element.addEventListener("mouseenter", function(event) {
            event.target.parentNode.parentNode.firstElementChild.setAttribute("data-val","4")
            startsAni(event.target, 20)
        }));
        document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div:last-child > div:nth-child(3)").forEach(element => element.addEventListener("mouseenter", function(event) {
            event.target.parentNode.parentNode.firstElementChild.setAttribute("data-val","3")
            startsAni(event.target, 40)
        }));
        document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div:last-child > div:nth-child(4)").forEach(element => element.addEventListener("mouseenter", function(event) {
            event.target.parentNode.parentNode.firstElementChild.setAttribute("data-val","2")
            startsAni(event.target, 60)
        }));
        document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div:last-child > div:last-child").forEach(element => element.addEventListener("mouseenter", function(event) {
            event.target.parentNode.parentNode.firstElementChild.setAttribute("data-val","1")
            startsAni(event.target, 80)
        }));
        document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child").forEach(element => element.addEventListener("mouseleave", function(event) {
            document.querySelectorAll(".popup > .view > div:last-child > div:nth-child(3) > div:first-child > div > div:first-child > div:first-child").removeAttribute("class")
            const parent = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
            const children = parent.children
            function getChildPosition(child) {
            for(let i=0;i<children.length;i++)
                if(children[i]===child)
                    return i
            return -1
            }
            let score=res.data[getChildPosition(event.target.parentNode.parentNode.parentNode.parentNode.parentNode)].score
            event.target.firstElementChild.setAttribute("data-val",score)
            var starGradient=0
            if(score>3.74)
            starGradient=25
            else if(score>2.49)
            starGradient=50
            else if(score>0)
            starGradient=75
            else if(score===0)
            starGradient=100
            startsAni(event.target.lastElementChild.lastElementChild, starGradient)
        }));
        }
    } catch (error) {
        console.log(error)
    }
}