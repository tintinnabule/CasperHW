1) Go to the Google Homepage and create a jQuery selector to select the image.

$("#hplogo") 

    img id="hplogo" width="269" height="95" onload="window.lol&&lol()" style="padding-top:112px" src="/images/srpr/logo11w.png" alt="Google">

2) Go to the MOMA homepage and select the today's hours (aka the underlined section 10:30 a.m.-5:30pm). Note you will have to load jQuery in this page:

$(".moma-time")

    Object[a.moma-time /visit/plan]

3) Using the .html() method we can change the text of a selector. Use the .html() method to change the current hours.

$(".moma-time").html("11:30 p.m-3:00 a.m.")

4) Go to ESPN and select the h2 tag for the main headline story (**Note: it requires you to bring in jQuery*)

$("h2")

    Object[h2]

5) Go to the SF Gate site and change the title of the sports section in the main menu to "Sports Hour"

$(".subMenuLink.sports.hdn-analytics").html("Sports Hour")

what do?

6) Go to the Amazon site and change the "Hello, User" section to "Yo, User"

$("#nav-signin-title").html("Yo, User")

7) Go to the Damn You Autocorrect site and change title of the post using the .html() method. (**Note: it requires you to bring in jQuery*):

$(".post-title").html("New Words for Thing")
