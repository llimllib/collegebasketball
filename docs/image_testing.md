# testing images

```js echo
const torvik = await FileAttachment("data/torvik_2024.csv").csv({
  typed: true,
});
display(torvik);
```

Pulling a single image out of the logos zip file works:

```js echo
const marq = await FileAttachment("data/logos/marquette.svg").image();
display(marq);
```

Loading every file from the muybridge zip works:

```js echo
const muybridge = await FileAttachment("data/muybridge.zip").zip();
const x = await Promise.all(
  muybridge.filenames.map((f) => muybridge.file(f).image()),
);
display(x);
```

But loading every file from our zip doesn't work:

```js echo
const logos = await FileAttachment("data/logos.zip").zip();
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
