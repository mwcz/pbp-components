# pbp-loading

A bare-bones, square-ish, loading bar.  Web Component.

**Only defaults**

```html
<pbp-loading></pbp-loading>
```

**Set the number of boxes in the loading bar**

```html
<pbp-loading box-count=10></pbp-loading>
```

**Set the duration, in seconds, of all the squares pulsing**

```html
<pbp-loading duration=1></pbp-loading>
```

**Customize the appearance**

```html
<style>
pbp-loading {
  --pbp-loading-box-size: 30px; /* change the box size */
  --pbp-loading-border: 2px dotted rebeccapurple; /* change the border on the boxes */
  --pbp-loading-gap: 0px; /* change the grid-gap between boxes */
  --pbp-loading-grow: 400%; /* how big the boxes grow */
}
</style>
<pbp-loading></pbp-loading>
```
