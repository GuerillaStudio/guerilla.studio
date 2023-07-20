---
title: "Accessibility and CSS customisation in Mastodon: The “Publish” button"
description: "Why you probably shouldn't use custom CSS labels"
date: 2023-07-19T21:43:16.114Z
author: Tixie
---

{% image "./custom-mastodon-publish-button-banner.png", "Banner of publish buttons in different colors and labels (Toot, Oot, Pouet, Launch)", [560, 1120, 'auto'], [560px, 1120px, 1404px] %}

\
For context since its [v4.0](https://github.com/mastodon/mastodon/releases/tag/v4.0.0), Mastodon changed the post button's label previously called “Toot” to “Publish” [for clarity reasons](https://mastodon.social/@Gargron/108352418240054955). However many people were attached to that [historically funny](https://mastodon.social/@Hbomberguy/146524) label, and due to its limited customisability Mastodon wasn't allowing admins to setup a custom label for this button.\
\
At this time I've seen many instance admins sharing a CSS hack to customize that label and reverse that change or just be creative. It was possible because Mastodon allows admins to apply additional custom CSS to their instance through their administration panel (Site Settings → Appearance).\
\
However I'm not sure everyone knows the accessibility issue who come with: [screen readers](https://en.wikipedia.org/wiki/Screen_reader) will read (and speak) **both of the labels**.\
\
Why? Let's start with taking common snippet I seen (found [here](https://ricard.dev/gists/2022-12-18/) and [here](https://github.com/mastodon/mastodon/issues/20751#issuecomment-1315329065) for example):

```css
.compose-form__publish-button-wrapper button {
  text-indent: -9999px;
  line-height: 0;
}

.compose-form__publish-button-wrapper button::after {
  content:'Toot!';
  text-indent: 0;
  display: block;
  line-height: initial;
}
```

## The original label will be read screen readers

Screen readers won't read(/speak) hidden content in a web page. And for being hidden its requires to match one of these conditions :

* contains a `display:none`
* contains a `visibility: hidden`
* take **no space** in the page (this one is tricky I agree)

In our snippet, the first two conditions can't be used since it would hide completely the button. \
So the trick was to:

1. Throw the text backward with `text-indent:-9999px` (ew a magic number 🥴)
2. Remove any-height to the text with line-height:0
3. Use a [pseudo element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) (here ::after) to create a child element inside button and fill it with the custom label through the [content property](https://developer.mozilla.org/en-US/docs/Web/CSS/content).

With that made, our original label still being rendered, because even if it's thrown backward and its line-height reduced to 0, your text will still take some space:

1. line-height: 0 won't hide text outside of its height
2. the text still have a non-null width

So there is a good chance that the original label will still be read by screen readers.

## The content property is read by screen readers

It's a misconception I've encounter several time while talking to other developers. Maybe because since it's in CSS it shouldn't end up in the accessibility tree? Well **it does**.

I haven't made a test on all screen-readers myself, but [someone did](https://jhalabi.com/blog/before-after-accessibility) in 2017. I don't have more recent stats but since it's the behavior expected in [the W3C specification](https://www.w3.org/TR/css-content-3/#accessibility), I think it's safe to imagine it's gonna be more adopted through the years.

## What screen-readers will probably read

“Publish!Toot!” (or “Toot!Publish!” if `:before` is used instead of `:after`).

I haven't figured a CSS-only way to either hide the original label for screen readers too or hide the custom label for screen readers only. If someone have an idea (and tested it), I would be happy to edit this post to share the solution!

## To conclude

If you're a sighted user and wanna use this snippet just for yourself (with a browser extension like [Stylus](https://en.wikipedia.org/wiki/Stylus_%28browser_extension%29)), go for it, enjoy! \
However I wouldn't advise deploying that kind of hack instance-wide.
