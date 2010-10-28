/*
data structure
text, id, child, direct, height, area
*/

var RootNode
    = {"text":"hello html5", "id":0, "fold":1, "child":
       [  {"text":"html5 is gooooooood", "id":1, "fold":false, "direct":"left", "child":[]}
          ,{"text":"this is true", "id":2, "fold":false, "direct":"right", "child":
            [  {"text":"beonit", "id":3, "fold":false, "child":[]}
               ,{"text":"enoch", "id":4, "fold":true, "child":
                 [   {"text":"beonit", "id":5, "fold":false, "child":[]}
                     ,{"text":"loves2", "id":6, "fold":false, "child":[]}
                 ]
                }
               ,{"text":"loves", "id":7, "fold":false, "child":[]}
            ]
           }
          ,{"text":"test", "id":8, "fold":false, "child":[], "direct":"left"}
       ]
      };
