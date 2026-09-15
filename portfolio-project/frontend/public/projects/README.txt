Place your project media files in this folder, named to match src/App.jsx:

Cover images (shown on each card, ~16:9 works best, e.g. 800x450px):
  cinnaxchange-cover.jpg
  susl-connect-cover.jpg
  budget-manager-cover.jpg

Demos (shown in the "Watch Demo" modal):
  cinnaxchange-demo.mp4    (short screen-recording, ~10-30s, muted works well)
  susl-connect-demo.gif    (a looping GIF works if you don't have video)
  budget-manager-demo.mp4

If a cover image is missing, the card shows a neutral placeholder icon
instead of breaking. If a project has no demo field in App.jsx, the
"Watch Demo" button simply doesn't render for that card.

To use an external interactive demo instead of a video/GIF (e.g. a
CodeSandbox embed or a hosted live preview), change that project's
`demo` entry in App.jsx to:
  demo: { type: "iframe", src: "https://your-embed-url" }
