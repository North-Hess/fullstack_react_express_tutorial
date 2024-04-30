# Purpose
---
After creating my [StickyNotes project](https://github.com/North-Hess/StickyNotes) I felt like my undestanding of frontend and backend
was lacking. There were many instances where I was guessing as to how the frontend and backend should interact because I had no concept of
both sides. I knew frontend made the graphics and was where the user interacted, but how could I implement some pieces that NextJS takes
care of on my own using just React? The there was the backend which is where... data was generated? I really had no clue.
I had hints but really felt I would benefit from seeing the interactions between both sides in a more explicit way.

So, I dove into trying to see how I could implement something to fill in this gap. I had heard about Node and Express before and that they should
be able to fit my need. As I was looking into the documentation though, a lot of what was being referenced was still confusing. What is a request
and response? How can they be manipulated? How do I ensure type safety betwen frontend and backend? With many more questions that appeared the
more I looked.

I had just as many when it came to using basic React, especially when it came to routes, JWTs, and common React hooks like useEffect. Reading
documentation helps, but I still felt like I was missing the basics that limited me from having everthing start to "click".

# Next Step
---
So I went looking for something to help me fill the gap and I found [this tutorial series](https://www.youtube.com/watch?v=Hl7diL7SFw8&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL) by PedroTech on YouTube.
This was extremely helpful in teaching me about the interactions between frontend and backend. Pedro implemented the project using React, Express,
MySQL, and CJS. I took the opportunity to take the lessons about React and Express, but implement them using Typescript and ES modules with a
Turso (LibSQL) database. This allowed me to learn about how requests are made, how responses are sent back, CORS and its importance, React routing,
JWTs, and so much more while also allowing me to harp on my experiences with Typescript and Turso (as well as configuring package.json to allow
for ES modules instead of CJS).

Overall, I am very grateful for the series as I feel like I now have the fundamentals to go off and explore other tech (like maybe a Go backend?)
using the lessons about basic interactions used in this video series.
