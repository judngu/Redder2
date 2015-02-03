# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
post1 = Post.create(title: 'Cat/Nose/Lamp', description: 'ELI5: When my cat sits on my touch lamp, i can use his nose as an on/off button. How does this work?', url: 'http://www.reddit.com/r/explainlikeimfive/comments/2uk3rh/eli5_when_my_cat_sits_on_my_touch_lamp_i_can_use/')
post2 = Post.create(title: 'Cadillac Mountain', description: 'Sunset at Cadillac Mountain, Acadia National Park - Maine, USA [OC][2048x1365]', url: 'http://farm9.staticflickr.com/8653/16429447612_8226e2d65c_k.jpg')
post3 = Post.create(title: 'American Food', description: "I'm British and living in America. Here's a small sampling of what I've been eating and drinking these past few months. This country knows how to eat.", url: 'http://imgur.com/a/tAb0g')

post1.comments.create(body: "I would guess - I'm not entirely sure - is that your lamp detects changes in its capacitance. If the lamp stands by itself, it has a certain capacity. If the cat sits on it, that capacity changes. That means when the cat initially sits on the lamp, the lamp should toggle (Actually there might be a threshold the cat doesn't meet, or it might not toggle at that point for other reasons). Now when you touch your cat, you add to the whole system's capacity even more. The lamp detects that and toggles.")
post1.comments.create(body: 'This is the beginning of something beautiful, /u/maxpowerz2
And by that I mean a ton of people are going to take credit for this and repost it. Enjoy it while it lasts.')
post1.comments.create(body: "Thanks! Sassy seems very pleased with her internet points. I've included one of her glamour shots starring her and a Taco Bell beef burrito.")

post2.comments.create(body: 'I am from Maine, and would like to personally thank anyone who comes to Maine to vacation. Without you, our state would be in even deeper economic trouble than it is already.')

post3.comments.create(body: "Didn't recognize it was Ike's but the moment I saw the Dutch Crunch bread, I instantly thought OP was probably in the Bay (then seeing the Bacon truck confirmed it). Many Bay natives don't know that Dutch Crunch isn't that common in the the rest of the US.")
post3.comments.create(body: "Same, grew up in the bay and now I'm down in San Diego and goddamn do I crave turkey bacon avocado on dutch crunch. I prefer Roxie's to Ike's though.")
post3.comments.create(body: "Yep, I didn't know that until I left! It was at every other place in the Bay (Subways and Togos had it) so I didn't think it was anything special.")
post3.comments.create(body: 'For any other Dutchmen scrolling through, it is the tijger brood. They are referring to tijger brood. They could have had tiger bread but no, they called it dutch crunch.')
post3.comments.create(body: 'I recognized it right away. Love Ikes, my favorite is the Wondolowski. I think the donut is a Maple Bacon Apple from Dynamo Donuts.')
post3.comments.create(body: "Yes there is! Ike's has a bunch of sandwiches names after celebrities, some well known and some local including local sports figures like Wondo, Matt Cain, Barry Z., Lincecum, etc.
edit Here's the ingredients to a Wondo: Avocado, Godfather Sauce, Habanero, Provolone, Salami, Turkey")
