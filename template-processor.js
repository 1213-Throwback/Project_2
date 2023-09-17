'use strict';

function TemplateProcessor (template) {
    this.template = template;
    this.fillIn = function(dictionary){
        while(this.template.indexOf("{{")!==-1){
            let location = this.template.indexOf("{{");
            let endLocation = this.template.indexOf("}}");
            let key = this.template.substring(location+2,endLocation);
            // console.log("Start Location:", location);
            // console.log("End Location:", endLocation);
            // console.log("Key:", key);
            // console.log("Response:", dictionary[key])
            // console.log(typeof dictionary[key] != "undefined")
            if(typeof dictionary[key] != "undefined"){
                let first = this.template.substring(0,location);
                let second = dictionary[key];
                let third = this.template.substring(endLocation+2);
                this.template = first + second + third;
            }else{
                this.template.replace(key, "");
            }
        }
        return this.template;
    }
}

let template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
let dateTemplate = new TemplateProcessor(template);

let dictionary = {month: 'July', day: '1', year: '2016'};
let str = dateTemplate.fillIn(dictionary);
console.log(str);
console.log('My favorite month is July but not the day 1 or the year 2016');
console.log(str === 'My favorite month is July but not the day 1 or the year 2016');

//Case: property doesn't exist in dictionary
let dictionary2 = {day: '1', year: '2016'};
let str2 = dateTemplate.fillIn(dictionary2);

console.log(str2);
console.log('My favorite month is  but not the day 1 or the year 2016');
console.log(str2 === 'My favorite month is  but not the day 1 or the year 2016');