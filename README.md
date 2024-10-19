# React + Vite




After 30+ hours I can officially say I have learned a lot from this haha! I had to do LOTS of research but am proud of it. Here are my hooks and context files and there intended purposes.






HOOKS:

useApi.jsx - Mainly used in the authentication process such as logging in and registering. It allowed me to make the api calls inside the AuthContext to login, register, and logout. It is tied very closely to the AuthContext.jsx as that file uses the Api calls to update the state of authentication. Without the api calling, I was not able to change the states of whether someone was logged in or not. Now I tried to use it in different ways but this ultimatley was the only way I could figure it out. And it works well. 

useModules.jsx - In other words, this is where the useEffect is being used. When I named it useModules, I did that because I knew it would tie into the modules page and I had it working with that name and did want to change it and risk breaking anything. I also learned how to utilize the useCallback. In my mind, this was a centeral link between module and page related stuff. I really struggled to get the pages to show on the modules page with the JOIN function stuff. But this hook will load data from the local storage and will update the local storage as changes are made. 






CONTEXT:

AuthContext.jsx - This is my AuthProvider (the const is name AuthProvider in it). I had to restart my project at one point and was getting confused on where I needed to keep this file, so I renamed it to line up with the Context folder haha. This part in my mind was the bread and butter of the whole website. This was maintaing the authentication state through out the entire project and would allow easy(ier) access to all the components that needed it. It felt like all of them needed it. It, like many any things, utilizes localStorage to keep track of things when page reloads happen. To an extent I just built this out like a hook, you'll see I export it at the bottom naming it useAuth. Another big thing with this is that it would keep track of who has access to what, depending on their authentication state. One thing I did not take into consideration until this was testing my code after clearing the local storage. This made it so I had to update my login const in the context to set the default profile to Student so it could show the correct pages in the navbar. Before that fix, the navbar was not showing anything it was supposed to after signing in.

ThemedContent.jsx - Yeah this was rough, I waited till the end to add this in and it wasn't fun, though it didn't seem to hard in the beginning. This context wraps everything in the App file so if someone hits the toggle button in the nav bar, it would switch themes, making certain boxes and everything darker. If you refresh the page, it uses (you guessed it) localstorage to "remember" what the user had selected. Maybe next time I won't wait until the end because I feel like I could better incorporate a dark mode if I plan it out in the beginning. 