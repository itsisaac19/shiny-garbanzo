function time() {
    var clientHM = document.querySelector('.clientHourMinute')
    clientHM.innerHTML = moment().format('h' + ':' + 'mm') 

    var ampmNode = document.createElement('span'); ampmNode.innerHTML = '&nbsp ' + moment().format('a'); ampmNode.style.fontSize = '22px'
    clientHM.appendChild(ampmNode) 
}
time()

setInterval(time, 1000)