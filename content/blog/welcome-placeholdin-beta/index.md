---
title: "Welcome the beta of Placehold.in"
description: "An image placeholder service to help during mockups"
date: 2023-07-25T11:56:03.837Z
author:
  name: "Tixie Salander"
  url: "https://tixie.name"
  email: "blog@guerilla.studio"
  fedi_nickname: "@tixie@guerilla.studio"
  social_link: "https://mastodon.guerilla.studio/@tixie"
  kofi: "https://ko-fi.com/J3J3F2YAT"
---

**Now available at <span aria-hidden="true">→</span>&nbsp;[https://placehold.in](https://placehold.in?from=guerillablog)**

## Why?

For context, I was kind of pissed of after seen placehold.it being bought by placeholder.com (no big deal at this point, only had a search & replace urls in my ongoing projects)… and now placeholder.com have been being recently bought by some warehouse place renting (for the domain SEO ranking I guess 🙄).

So I decided it was time to buid our own placeholder image generator to be independant of that.\
I talked about it with Milia and she ended up having a working prototype pretty quickly.

For now it’s on beta because we didn’t had the time to make a proper landing page with branding & fancy things, so it’s very… minimalist.

However the essential infos on how to use the service are here. And if you were using placeholder.com, our API is very similar so you shouldn’t be lost.

## Features

It’s the kind without photos (unlike [Lorem Picsum](https://picsum.photos/)), with informations displayed to help debuging when you have to integrate optimized and responsive visuals:
- **size** (`{width}` or `{width}x{height}`)
- **format** (png, jpeg, svg, webp, avif and heif)
- **dpr** (inspired by [imgix's dpr attribute](https://docs.imgix.com/apis/rendering/pixel-density/dpr) if it can save you some time doing the calculation yourself)
- and even a **light/dark mode**

All that to easily be sure the right image is showing when you want to.

{% image "./placeholdin-url-example.png", "https://placehold.in/560x200@1x.svg/dark", [560, 1120, 'auto'], [560px, 1120px, 1404px] %}

would for example render this:\
\
<img src="https://placehold.in/560x200@1x.svg/dark" alt="example of image" width="560" height="200" loading="lazy">


## Infrastructure

Behind we use [Netlify’s On Demand Builders](https://docs.netlify.com/configure-builds/on-demand-builders/) to generate images only when needed and cache them as long as possible (Netlify say 10000 cached max so depending of the usage, we’ll see if we need to put a caching CDN in the middle to help with the cache).

Also that way we take avantage of Netlify’s CDN to make it fastly (and always) available pretty much anywhere is the world.

And overall so far it cost me only a domain a year.

## Improvements we're considering

- Adding JPEGXL (`.jxl`). It's for now not suppored because it’s not packaged inside *libvips* (the image processing library used) by default. That would require to make an extra step to compile our own version version libvips with libjxl. And then make [sharp](https://sharp.pixelplumbing.com) (the node package around libvips we use in the serverless function)
- Make an interactive version of the example URL (currently at the top of the landing) where visitors could enter their own values, have an preview displayed dynamically + a button to copy the URL in their clipboard
- Make interactive examples with `<picture>` code on one side and result on the other, with toggles to showcase differents situations (browsers not handling a format, DPR changes, or viewport resizing)

## To conclude

**First**, if you have sucessfully read everything: bravo! 😅

**Secondly**: This is still in beta because we want to be sure everything is working as expected. And potentially have a first wave of feedbacks to fix the more problematic problems.
So you are more than welcome to test it and reach us if you have any feedbacks, problems, ideas for things to improve, anything!

Don’t Hesitate ❤️
