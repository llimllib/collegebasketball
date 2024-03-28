# svg loading bug

I have two identical zip files, `docs/data/logos.zip` and `docs/data/logos2.zip`:

```
$ md5 docs/data/logos.zip docs/data/logos2.zip
MD5 (docs/data/logos.zip) = ef888c8fb311301f148531ba146309ab
MD5 (docs/data/logos2.zip) = ef888c8fb311301f148531ba146309ab
```

Loading an image from `logos2` works as documented:

```js echo
display(
  await FileAttachment("data/logos2/uconn.svg").image({
    width: 30,
    alt: "Uconn logo",
  }),
);
```

but loading an image from `logos` fails with a generic error:

```js echo
display(
  await FileAttachment("data/logos/uconn.svg").image({
    width: 30,
    alt: "Uconn logo",
  }),
);
```
