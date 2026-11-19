---
# Settings for this article. Jekyll reads this block and fills in the article layout.
layout: article
title: Fishing Minigame Iteration in Sip Fisher
label: Design Breakdown
project: Sip Fisher
project_url: /projects/sip-fisher.html
# The web address of the finished page (keeps spaces out of the URL)
permalink: /articles/fishing-minigame-iteration.html
# Optional extras. Remove the # at the start of a line to use it.
# date: 2025-08-30
# lead: One or two sentences summarizing the article, shown under the title.
image: /assets/images/SipFisherScreenshot1.webp
---

## Combat & Mechanics

The mechanics of Sipping up water and fish went through a lot of iterations. However since the beginning all versions had similar goals to fulfill.

- Have several different variables and aspects to tune so that the player can incrementally upgrade different values.
- Create the feeling that the player was sipping up water by implementing effects like breath capacity and stamina. 
- A strong focus on simple to understand we want this mechanic to be very accessible. 
- A simplistic control scheme.


## The Final Sipping Decision (Less is more)

A pretty major flaw with a lot of these systems in the early stages was how they were separating the ideas of sipping water and catching fish so strongly. 

The solution we ended up choosing ended up being to simplify sipping of water. You drain water while you hold down left click. When you run out of breath you stop draining the water making it so that you have to release left click to regain your breath.

This allowed us to focus our complexity on sipping up the actual fish. While still allowing upgrades like Sipping Power and Breath Duration effect draining the lake.


## Combat Inspiration

While the limits of this game are literally 1 dimensional as you try to move the fish along your vertical progress bar. I wanted combat to have a push and pull feeling so that players could feel like they are truly earning their fish. So I turned to Elden Ring's design with it's combat for inspiration.

In Elden Ring in addition to dealing damage you deal Poise Damage which when an enemy exceeds their threshold of poise damage taken the player gets a huge opportunity to land a big attack on them. 

For Sip Fisher I decided to make this much more visual showing the player how much stagger damage the player needs to deal to the fish in order to stagger them. 

So now Fish constantly swim down the bar. As player's sip the fish get pulled up the bar. If the player clicks while their sipping region is overlapping a fish that fish gets stunned and takes Stagger Damage. If a fish takes enough Stagger Damage is gets staggered which is a huge stun.

## Creating Fish Personality and Enemy Variation

Fish were engaging to sip up at this point but if we are going to have many different kinds of fish then they should feel different to sip up.

Starting out I had 2 values which already allowed for some good variation:

- Swim Out Speed
- Sip Speed Percent 

Swim Out Speed determined how fast the fish moved down the straw. 

Sip Speed Percent determined how much the player's sipping effected the fish.

With these two values I was able to create fish that felt weightier to sip up but didn't move that fast and fish that were fast but got sipped up by the player also quickly. However just these two values had a lot of limits. If the player staggered a fish that had a high Sip Speed Percent they could just sip up the fish in a single breath. And if the Swim Out Speed was too fast the fish was too difficult to react to and the randomness of your sipping region could make the fish impossible inconsistently. 

  

At the same time of trying to create this variation between fish I was having some issues because fish were often way too predictable and felt more robotic than alive. 

My solution to both of these issues was the dashing system. 

Fish would now run a timer to switch between two different speeds normal and dashing. This not only gave the fish a bit of personality as it felt they are speeding up to break free of you but you also get moments where you can catch a fish speeding away by stunning it. And this created new variables that allowed for fish to have different dashing behavior. Minnows will now do short but quick dashes, Flounders don't dash quickly but they do so in long sprints, Salmon are almost always dashing and slow down to catch their breath briefly.