* calcul8r
Made with React, CSS Grid, and green tea.
https://calcul8r.herokuapp.com/

** How to Start This App
+ fork and clone
+ npm install
+ run npm start
+ app will open on localhost:3000 in the browser

** How to contribute
+ rebase your local repo through 'git --rebase upstream master'
+ commit all changes you've made, then 'git push origin master'
+ make a pull request through your local forked copy of the project
+ the request will be checked before it gets merged

** Client state
|---------------+-------+---------|
| NAME          | VALUE | TYPE    |
|---------------+-------+---------|
| lastClick     | ''    | string  |
| operatorClick | false | boolean |
| operator      | '+'   | string  |
| resultSoFar   | 0     | number  |
| screen        | '0'   | string  |
|---------------+-------+---------|
