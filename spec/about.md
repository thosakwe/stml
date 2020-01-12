# About STML
STML is an `s-expression`-based format for encoding static content (note: the
actual markup may be dynamically-created, but this does not happen on the
client side).

The goals of STML:

* Remain lightweight. No complex layout or styling rules should ever be added
to STML. Writing an STML viewer should not be a high-difficulty endeavor.
* STML documents should be accessible (both in terms of being able to consume
content regardless of physical abilities, and in terms of data usage).
* STML should primarily be a vehicle for transporting content, STML provides
[form controls](#form-controls), in order to allow for interacting with servers,
but these forms cannot be used automatically, or without the user's approval.
Intrusive advertisements and tracking tools that invade user privacy should be
considered dark patterns, and actively prevented by both the specification, and
STML viewers.