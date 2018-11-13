import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  getForm(id){
    let data = {};
    if (id== 6){
      data = {
        formId: 6,
        name: 'Youtube',
        steps: [{
          id:1,
          title: 'Youtube Channel',
          namespace: 'socialmedia.youtube',
          items:[
            {
              id: 'channel',
              type: 'CHECKBOX',
              text: 'Do you have a youtube channel?'
            }
          ],
          next: 2
        }, {
          id:2,
          title: 'Do you like to block ads?',
          namespace: 'socialmedia.youtube',
          items:[],
          next: null
        }]
      }
    }
    if (id== 3){
      data = {
        formId: 3,
        name: 'Social Media',
        steps: [{
          id:1,
          title: 'Youtube',
          namespace: 'socialmedia.youtube',
          items:[
            {
              id: 'used',
              type: 'CHECKBOX',
              text: 'Do you use youtube?'
            }
          ],
          branch: function(data){
            if (data.socialmedia && data.socialmedia.youtube && data.socialmedia.youtube.used){
              return [6]
            }
            return [];
          },
          next: 2
        }, {
          id:2,
          title: 'Twitter',
          namespace: 'twitter',
          items:[],
          next: null
        }]
      }
    }
    if (id== 4){
      data = {
        formId: 4,
        name: 'Color',
        steps: [{
          id:1,
          title: 'Green',
          namespace: 'green',
          items:[],
          next: 2
        }, {
          id:2,
          title: 'Yellow',
          namespace: 'yellow',
          items:[],
          next: null
        }]
      }
    }
    if (id== 5){
      data = {
        formId: 5,
        name: 'Fruits',
        steps: [{
          id:1,
          title: 'Strawberry',
          namespace: 'fruits',
          items:[
            {
              id: 'strawberry',
              type: 'CHECKBOX',
              text: 'Do you like strawberries?'
            }
          ],
          next: 2
        }, {
          id:2,
          title: 'Apple',
          namespace: 'fruits',
          items:[
            {
              id: 'apple',
              type: 'CHECKBOX',
              text: 'Do you like apples?'
            }
          ],
          next: function(data){
            if (data.fruits.apple){
              return 3;
            }
            return null;
          }
        }, {
          id:3,
          title: 'Cool you like apples',
          namespace: 'fruits',
          items:[
            
          ],
          next: null
        }, ]
      }
    }
    if (id == 2){
      data = {
        formId: 2,
        title: 'MVP #1',
        steps:[
          {
            id: 1,
            title: 'Enter Your Name',
            namespace: 'mpv1',
            description: 'Please Provide your full legal name',
            items:[
              {
                id: 'fullName',
                type: 'TEXTFIELD',
              }
            ],
            next: 2
          },
          {
            id: 2,
            title: 'Welcome {{mpv1.fullName}}, what state do you live in?',
            namespace: 'mpv1',
            items:[
              {
                id: 'state',
                type: 'DROPDOWN',
                text: 'Legal Name',
                parse: function(data){
                  for (var iData = 0; iData < data.length; iData++){
                    data[iData].name = data[iData].state;
                    data[iData].value = data[iData].state;
                  }
                  return data;
                },
                source: {
                  url: 'https://safety-b379.restdb.io/rest/us-states?h={"$fields": {"state": 1} }',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': '5bae9c02bd79880aab0a781f'
                  }
                }
              }
            ],
            next: 3
          },
          {
            id: 3,
            title: 'What county do you live in?',
            namespace: 'mpv1',
            items:[
              {
                id: 'county',
                type: 'DROPDOWN',
                text: 'Legal Name',
                parse: function(data){
                  for (var iData = 0; iData < data.length; iData++){
                    data[iData].name = data[iData].county;
                    data[iData].value = data[iData].county;
                  }
                  return data;
                },
                source: {
                  url: 'https://safety-b379.restdb.io/rest/us-state-counties?q={"state":"{{mpv1.state}}"}&h={"$fields": {"county": 1} }',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': '5bae9c02bd79880aab0a781f'
                  }
                }
              }
            ],
            next: 4
          },
          {
            id: 4,
            title: 'What do you like: Cookies/ Ice Cream?',
            namespace: 'mvp1',
            items:[
              {
                id: 'dessert',
                type: 'RADIOBUTTON',
                text: '',
                options: [
                  {name: 'Cookies', value: 'cookies'},
                  {name: 'Ice Cream', value: 'ice cream'},
                ]
              }
            ],
            next: function(data){
              
              return (data.mvp1.dessert == 'cookies' ? 5 : 6);
            }
          },
          {
            id: 5,
            title: 'Great, What is your favorite cookie:',
            namespace: 'mvp1',
            items: [
              {
                id: 'cookie',
                type: 'RADIOBUTTON',
                text: '',
                options: [
                  {name: 'Oreos', value: 'oreos'},
                  {name: 'Chips Ahoy', value: 'chips-ahoy'},
                  {name: 'Other', value: {
                    type: 'TEXTFIELD'
                  }}
                ]
              }
            ],
            next: 7
          },
          {
            id: 6,
            title: 'Great, What is your favorite flavor:',
            namespace: 'mvp1',
            items: [
              {
                id: 'ice-cream',
                type: 'RADIOBUTTON',
                text: '',
                options: [
                  {name: 'Vanilla', value: 'vanilla'},
                  {name: 'Chocolate', value: 'chocolate'},
                  {name: 'Other', value: {
                    type: 'TEXTFIELD'
                  }}
                ]
              }
            ],
            next: 7
          },
          {
            id: 7,
            title: 'What are your favorite movie Genres:',
            namespace: 'mvp1',
            items: [
              {
                id: 'movies.horror.like',
                type: 'CHECKBOX',
                image: '../../assets/horror.jpg',
                text: 'Horror'
              },
              {
                id: 'movies.comedy.like',
                type: 'CHECKBOX',
                image: '../../assets/comedy.jpg',
                text: 'Comedy'
              },
              {
                id: 'movies.romance.like',
                type: 'CHECKBOX',
                image: '../../assets/romance.jpg',
                text: 'Romantic'
              }
            ],
            next: function(data){
              var movies = (data.mvp1 && data.mvp1.movies) || {};
              console.log(movies);
              if (movies.horror && movies.horror.like){
                return 8;
              }
              if (movies.comedy && movies.comedy.like){
                return 9;
              }
              if (movies.romance && movies.romance.like){
                return 10;
              }
              return 11;
            }
          },
          {
            id: 8,
            title: 'Is Boris Karlov your favorite actor? {Horror}',
            namespace: 'mvp1',
            items: [
              {
                id: 'movies.horror.borisFavorite',
                type: 'RADIOBUTTON',
                text: '',
                options: [
                  {name: 'Yes', value: true},
                  {name: 'No', value: false}
                ]
              }
            ],
            next: function(data){
              var movies = (data.mvp1 && data.mvp1.movies) || {};
              if (movies.comedy && movies.comedy.like){
                return 9;
              }
              if (movies.romance && movies.romance.like){
                return 10;
              }
              return 11;
            }
          },
          {
            id: 9,
            title: 'Is Adam Sander funnier than David Spade? {Comedy}',
            namespace: 'mvp1',
            items: [
              {
                id: 'movies.comedy.actor',
                type: 'RADIOBUTTON',
                text: '',
                options: [
                  {name: 'Yes', value: 'Adam Sander'},
                  {name: 'No', value: 'David Spade'}
                ]
              }
            ],
            next: function(data){
              var movies = (data.mvp1 && data.mvp1.movies) || {};
              if (movies.romance && movies.romance.like){
                return 10;
              }
              return 11;
            }
          },
          {
            id: 10,
            title: 'Team Pitt or Team Clooney? {Romantic}',
            namespace: 'mvp1',
            items: [
              {
                id: 'movies.romance.actor',
                type: 'RADIOBUTTON',
                text: '',
                options: [
                  {name: 'Team Pitt', value: 'Pitt'},
                  {name: 'Team Clooney', value: 'Clooney'},
                  {name: 'Other', value: {
                    type: 'TEXTFIELD'
                  }}
                ]
              }
            ],
            next: 11
          },
          {
            id: 11,
            title: 'What is your favorite movie?',
            namespace: 'mvp1',
            description: 'Multi-Add feature. You can add multiple records per question. Click on the + below to add a second answer to the question. Use the - button to remove and answer.',
            next: 12
          },
          {
            id: 12,
            title: 'Sign the form?',
            namespace: 'mvp1.sign',
            items:[
              {
                id: 'name',
                type: 'TEXTFIELD',
                text: 'Name'
              },
              {
                id: 'date',
                type: 'DATE',
                text: 'Date'
              },
              {
                id: 'signature',
                type: 'SIGNATURE',
                text: 'Signature'
              }
            ]
          }
          //{%22state%22:%22Alabama%22}&h={%22$fields%22:%20{%22county%22:%201}%20}
        ]
      }
    }
    if (id == 12){
      data = {
        formId: 12,
        name: 'Example 1',
        steps: [{
          id:1,
          title: 'General Information',
          namespace: 'info',
          items:[
            {
              id: 'science',
              type: 'CHECKBOX',
              text: 'Science Fiction'
            }
          ],
          next: function(data){
            return (data.info && data.info.science) ? 1.1 : 2;
          }
        }, {
          id:1.1,
          title: 'So you really like sciene fiction',
          namespace: 'info',
          items:[
          ],
          next: 2
        }, {
          id:2,
          title: 'Address',
          namespace: 'address',
          items:[],
          next: 3,
          branch: function(){
            return [3, 4];
          }
        }, {
          id:3,
          title: 'Movie Genres',
          namespace: 'categories',
          items:[
            
          ],
          next: function(data){
            return (data.science ? 4 : 5);
          }
        }, {
          id:4,
          title: 'Fruits',
          namespace: 'fruits',
          items:[
            {
              id: 'like',
              type: 'CHECKBOX',
              text: 'Do you like fruits?'
            }
          ],
          next: 5,
          branch: function(data){
            if (data.fruits && data.fruits.like){
              return [5];
            }
            return [];
          }
        }, {
          id:5,
          title: 'Thanks',
          namespace: 'thanks',
          items:[],
          next: null
        }]
      }
    }
    
    var request:any = {};
    request.subscribe = function(success, failure){
      request.success = success;
      request.failure = failure;
    }
    setTimeout(function(){
      request.success && request.success(data)
    }, 500);
    return request;
  }
}
