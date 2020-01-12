# Simple Text Markup Language
This is the home of `STML`, or the "Simple Text Markup Language."

*This is mainly an educational/for-fun project,
unless it gets so popular as to warrant long-term time investment. (unlikely)*

```stml
; This is a comment!
(version "0.0.0")
(document
  (title "Hello, STML!")
  (heading "This is a simple page.")
  (link "Github Page" "https://github.com/thosakwe/stml"))
```

## Why?
I don't think it's an exaggeration to say that the Web is a little bloated.
HTML, CSS, and JavaScript certainly have their uses, and can provide complex,
interactive experiences that users enjoy. Sometimes, though, you're just trying
to read some text. STML is an attempt at a lightweight hypertext format for creating
and viewing text documents, simple enough to be rendered in a simple `curses`-based
browser.

STML is:
* An `s-expression`-based format for encoding static content (note: the
actual markup may be dynamically-created, but there is no provision for a
document to change after it is rendered.)

## Interactivity
Of course, it is still possible to provide dynamic experiences with STML. It includes
support for `application/x-www-form-urlencoded` and `multipart/form-data` forms, and
payloads should typically be so small and easy to generate, that page loads should be
as close to instantaneous as possible.

## This Repository
* `SPEC.md` - The formal specification of STML.

Planned, but not yet present:

* `stmv` - A terminal-based Web browser for STML.
* `browser_extension` - A Chrome/Firefox extension that converts
STML responses to HTML, for display in regular browsers.
* `libstml` - A C library for generating, parsing, and validating
STML documents, and converting them to HTML-formatted text.
* `stml.js` - A JavaScript library for emitting and parsing compliant STML.
* `dart_stml` - A Dart library for emitting STML.
* `angel_stml` - An [Angel framework](https:/angel-dart-dev)
extension for sending STML responses.
