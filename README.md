# @authnomicon/prompts

Prompt components for the Authnomicon project.

`@authnomicon/prompts` is a set of components for prompting the user within a
web browser.

The prompts form a [challenge-response](https://en.wikipedia.org/wiki/Challenge–response_authentication)
protocol to authenticate the user.  Prompts may also perform related access
control operations, such as identity proofing or obtaining authorization for
third-party access.

Prompts are presented in a web browser, and as such present challenges to the
user by rendering HTML.  The user provides a response by submitting an HTML
form.  Sequences of prompts are strung together using a series of redirects.
Optionally, prompts may be [progressively enhanced](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
using client-side JavaScript to enhance the user experience and take advantage
of richer capabilities.  If so, the response may be submitted programmatically
via [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or
`XMLHttpRequest`(https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API).

Within the context of a overarching authentication or authorization protocol,
a prompt or sequence of prompts is often referred to as a "flow" (in the case of
[OAuth](https://datatracker.ietf.org/doc/html/rfc6749)) or a "ceremony" (in the
case of [WebAuthn](https://www.w3.org/TR/webauthn-2/)).  Such flows often
require relatively complex per-request state management, which is accomplished
using [`flowstate`](https://github.com/jaredhanson/flowstate).

<div align="right">
  <sup>Developed by <a href="#authors">Jared Hanson</a>.</sub>
</div>

## See Also

- [@authnomicon/prompts-oob](https://github.com/authnomicon/prompts-oob) -
  Components to present prompts to the user via out-of-band channels.  Typically
  used when authorization is needed in non-web-based environments, such as
  point-of-sale transactions with a cashier or teller and self-service kiosks.

## Authors

- [Jared Hanson](https://www.jaredhanson.me/) { [![WWW](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/globe-12x12.svg)](https://www.jaredhanson.me/) [![Facebook](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/facebook-12x12.svg)](https://www.facebook.com/jaredhanson) [![LinkedIn](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/linkedin-12x12.svg)](https://www.linkedin.com/in/jaredhanson) [![Twitter](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/twitter-12x12.svg)](https://twitter.com/jaredhanson) [![GitHub](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/github-12x12.svg)](https://github.com/jaredhanson) }

## License

[The MIT License](https://opensource.org/licenses/MIT)

Copyright (c) Jared Hanson
