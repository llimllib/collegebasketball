# testing images

The source for this page is [here](https://github.com/llimllib/collegebasketball)

Pulling a single image out of the logos zip file works:

```js echo
const marq = await FileAttachment("data/logos/marquette.svg").image({
  width: 30,
});
display(marq);
```

Loading every file from the muybridge zip from the [docs](https://observablehq.com/framework/lib/zip) works:

```js echo
const muybridge = await FileAttachment("data/muybridge.zip").zip();
display(muybridge.filenames);
const x = await Promise.all(
  muybridge.filenames.map((f) => muybridge.file(f).image()),
);
display(x);
```

But loading every file from my zip full of logos doesn't work:

```js echo
const logos = await FileAttachment("data/logos.zip").zip();
display(logos.filenames);
```

Debugging shows that there are many failures here, but observable only displays the first:

```js echo
const y = await Promise.all(
  logos.filenames.map((logo) => logos.file(logo).image()),
);
display(y);
```

It complains about being unable to load \_tbd.svg, but that's loadable if we ask for it singularly:

```js echo
display(await FileAttachment("data/logos/_tbd.svg").image({ width: 30 }));
```

We can pull single files out of the muybridge zip:

```js echo
display(await muybridge.file("deer.jpeg").image({ width: 100 }));
```

but not out of our zip file:

```js echo
display(await logos.file("_tbd.svg").image());
```

Using a smaller file doesn't help, this one only has a single file:

```js echo
const miss = await FileAttachment("data/miss.zip").zip();
display(miss.filenames);
console.log(miss);
// display(await miss.file(miss.filenames[0]).image());
```

```js echo
const y = await Promise.all(
  miss.filenames.map((logo) => miss.file(logo).image()),
);
display(y);
```

If we don't try to convert it into an `Image`, it works. We can see that it has a URL property, which is what `stdlib.js` tries to attach to `Image.src`:

```js echo
const z = await Promise.all(miss.filenames.map((logo) => miss.file(logo)));
display(z);
display(await z[0].url());
```

If it's a zip containing a png instead of an SVG, it works:

```js echo
const onepng = await FileAttachment("data/onepng.zip").zip();
display(await onepng.file(onepng.filenames[0]).image());
```

```js echo
const y = await Promise.all(
  onepng.filenames.map((logo) => onepng.file(logo).image()),
);
display(y);
```
