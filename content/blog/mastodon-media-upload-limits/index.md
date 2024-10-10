---
title: "The Mastodon media limitations final guide"
description: "Because who's not tired of mystical errors when uploading something?"
date: 2023-08-19T13:57:43.785Z
social_card_url: "/img/social-card-mastodon-media-upload-limits.png"
social_card_width: "1200"
social_card_height: "630"
twitter_card_type: "summary_large_image"
author: Tixie
kofi: https://ko-fi.com/J3J3F2YAT
mastodon: "@tixie@guerilla.studio"
---

{% image "header.png", "", [560, 1120, 'auto'], [560px, 1120px, 1200px] %}

## File extensions

- **Images**: .jpg, .jpeg, .png, .gif, .webp, .heic, .heif, .avif
- **Videos**: .webm, .mp4, .m4v, .mov

## Size, dimensions &amp; FPS

So, it's divided in two parts since [it's changing](https://github.com/mastodon/mastodon/pull/23726) starting in version 4.2.0. \
<sub>(no it's not a [weed joke](https://en.wikipedia.org/wiki/420_(cannabis_culture)), I'll stop you right here)</sub>

### Images

#### Before v4.2.0

- Size: **10 <dfn><abbr title="MegaBytes">MB</abbr></dfn>**
- <dfn><abbr title="What you can upload">Upload limit</abbr></dfn>: **3840&nbsp;× 2160 px** (4K)
- <dfn><abbr title="The maximum it's gonna be resize in">Target dimensions</abbr></dfn>: **1920&nbsp;× 1080 px** (1080p&nbsp;/ Full&nbsp;HD)

#### Starting v4.2.0

- Size: **16 <dfn><abbr title="MegaBytes">MB</abbr></dfn>**
- <dfn><abbr title="What you can upload">Upload limit</abbr></dfn>: **7680&nbsp;× 4320 px** (8K)
- <dfn><abbr title="The maximum it's gonna be resize in">Target dimensions</abbr></dfn>: **3840&nbsp;× 2160 px** (4K)

### Videos

#### Before v4.2.0

- Size: **40 <dfn><abbr title="MegaBytes">MB</abbr></dfn>**
- <dfn><abbr title="What you can upload">Upload limit</abbr></dfn>: **1920&nbsp;× 1080 px** (1080p&nbsp;/ Full&nbsp;HD)
- <dfn><abbr title="Frames Per Second, also called “Frame rate”">FPS</abbr></dfn> limit: **60 FPS**

#### Starting v4.2.0

- Size: **99 <dfn><abbr title="MegaBytes">MB</abbr></dfn>**
- <dfn><abbr title="What you can upload">Upload limit</abbr></dfn>: **3840&nbsp;× 2160 px** (4K)
- <dfn><abbr title="Frames Per Second, also called “Frame rate”">FPS</abbr></dfn> limit: **120 FPS**

### How to know on which version you are

In case you're wondering:
1. Write your instance's address (mastodon.social, octodon.social or eldritch.cafe or for example) in your web browser
2. Add `/about` at the end to access the about page
3. Scroll at the end where it's should displayed somewhere <sub>*(woaw thanks Tixie for this specific info lol)*</sub>\
\
{% image "mastodon-social-about-page-infos.png", "Bottom of mastodon.social/about page with the version (v4.2.0) circled", [560, 1120, 'auto'], [560px, 1120px, 1424px] %}

That's it, that's the ~~toot~~ post. Hope it helped.

I may improve it over time, so don't hesitate to give me feedbacks, searching into Mastodon's codebase is a pain in the ass already *(and I know what I'm talking about, [I'm french](https://www.linguee.com/english-french/translation/bread.html))*.
