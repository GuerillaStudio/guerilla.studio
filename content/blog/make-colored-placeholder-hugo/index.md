---
title: How to make colored placeholder on Hugo
description: "A way to generate a colored placeholder for images with a little trick"
date: 2020-03-17T18:41:53.010Z
author:
  name: "Tixie Salander"
  url: "https://tixie.name"
  email: "blog@guerilla.studio"
  fedi_nickname: "@tixie@guerilla.studio"
  social_link: "https://mastodon.guerilla.studio/@tixie"
  kofi: "https://ko-fi.com/J3J3F2YAT"
social_card_url: "/img/social-card/colored-placeholder-music-albums.gif"
social_card_width: "584"
social_card_height: "551"
---

While using [Hugo](https://gohugo.io/) as a static site generator, I've found a way to generate a colored placeholder with a little trick.

I used it on my [music sharing website](https://music.guerilla.studio/) for example:

![colored placeholder example](./colored-placeholder-music-albums.gif)

The trick is pretty simple in itself:

* Firstly use the [Hugo's image processing](https://gohugo.io/content-management/image-processing/) to generate a version of your image resized at 1px by 1px (your image must be a [page resource](https://gohugo.io/content-management/page-resources/)).
* Secondly generate a base64 version using the \`base64Encode\` function.
* Then add it as an inlined background-image using the base64 version prefixed by the media type. That way this image not gonna be an external resource and will be visible before your final image.
* Finally specify your image size to define a space for your placeholder to expand

The final result will look at something like that:

```html{% raw %}
{{ $original := resources.Get '/img/your-image.jpg' }}
{{ $visual := $original.Resize "x400" }}
{{ $placeholder := $visual.Resize "x1" }}
<div style="background-image: url(data:{{ $placeholder.MediaType }};base64,{{ $placeholder.Content | base64Encode }});">
  <img src="{{ $visual.Permalink }}" width="400" height="400">
</div>
{% endraw %}
```

To go a bit further, I can imagine a solution where you generate a placeholder of 50x50px and add a `background-size: cover` in your css to have a blurred version for your placeholder.

Don't hesitate to contact me if you use this trick on your own project. I'm always curious of what can be done with it!
