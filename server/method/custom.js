
module.exports = {
    dateToString(date) {
        let dd = date.getDate();
        let mm = date.getMonth()+1; //January is 0!
    
        let yyyy = date.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
        
        yyyy = yyyy.toString();
        mm = mm.toString();
        dd = dd.toString();
        
        let m = date.getHours();
        let s = date.getMinutes();

        if(m<10){m='0'+m} if(s<10){s='0'+s}
        m = m.toString();
        s = s.toString();
    
        let s1 = yyyy+mm+dd;
        return s1;
    },
    randomString(num,origin) {
        return this.dateToString(new Date()) + '-' + Math.random().toString(36).substring(0,num) + '-' + origin;
    }
}