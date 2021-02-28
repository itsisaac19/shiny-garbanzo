function time() {
    document.querySelector('.clientHourMinute').innerHTML = moment().format('h' + ':' + 'mm') 

    if (moment().format('a')) {
        
    }
}
time()