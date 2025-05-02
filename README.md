# Guérilla.Studio Homepage

## Run it in local

1. Install dependencies

```
npm install
```

2. Run Eleventy

Generate a production-ready build to the `_site` folder:

```
npm run build
```

Or build and host on a local development server:

```
npm run dev
```

## License

The website source is under [“I'm so tired” 1.0](LICENSE) license. \
Please take the time to read and check if you're allowed to use it before doing so. \
*Thank you luna who made it ([source](https://olmewe.com/notes/istsl/)).*

## Credits

- The “raccoon handling a switchblade knife in its mouth” illustration have been made for Guérilla.Studio by [Fiona Kaerhon](https://www.instagram.com/kaerhon/)
- The Atkinson Hyperlegible font have been designed by the Braille Institue, Applied Design Works, Elliott Scott, Megan Eiswerth, Linus Boman, Theodore Petrosky (and distributed on Open Font License)

## Deployment

Don't forget to get working redirection for the Mastodon instance (you can use [this post](https://aubrielee.com/how-i-set-up-my-own-mastodon-server#8) as reference).

### Netlify

Works out of the box (using the [dedicated config file](netlify.toml))

## Deuxfleurs

1. Create bucket
2. (Important) Set redirections using the command: `aws s3api put-bucket-website --bucket guerilla.studio --website-configuration file://./s3-website-config.json` (only need to be done once)
3. Build and push content either through the [dxfl cli](https://git.deuxfleurs.fr/Deuxfleurs/dxfl)(experimental but simpler) or the <a href="https://guide.deuxfleurs.fr/prise_en_main/aws-cli/" lang="fr-FR">aws cli</a>(may be broken because of future AWS's changes). Can be authomatized with the Woodpecker config file.
