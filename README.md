## Installation
```bash
npm install --save @trunqkj3n/scraper
```
## Use
```javascript
// CJS
const ttk = require("@trunqkj3n/scraper")
// ESM
import ttk from "@trunqkj3n/scraper"
```

## Meitu Cartoon
```js
import { meitu } from "@trunqkj3n/scraper"
import fs from "fs-extra"
meitu("https://i.imgur.com/D8fKa88.jpg").then(({ base64 }) => fs.writeFileSync("./meitu_cartoon.png", base64, "base64"))
```
## Y2Mate
```js
import { getY2mateResponse } from "@trunqkj3n/scraper"
getY2mateResponse("https://www.youtube.com/watch?v=GxldQ9eX2wo").then(console.log).catch(console.error);
```
## Snaptik
```js
import { snapTik } from "@trunqkj3n/scraper"
snapTik("https://www.tiktok.com/@huyleexxx/video/7042559928573168898?q=m%C6%B0a%20tuy%E1%BA%BFt&t=1680181448159").then(console.log).catch(console.error);
```

## Snapsave
```js
import { snapSave } from "@trunqkj3n/scraper"
snapSave("https://fb.watch/jBgNhRo-pc/").then(console.log).catch(console.error);
```

## Tools
```js
import { facebook_fuid } from "@trunqkj3n/scraper"
facebook_fuid("https://www.facebook.com/thieutrungki3n").then(console.log).catch(console.error)
```



## Author
<table>
  <tr>
<td align="center"><a href="https://github.com/TrunqKj3n" target="_blank"><img src="https://avatars.githubusercontent.com/u/87187870?v=4" width="100px;" alt=""/></a><br />
<sub><b>TrunqKj3n</b></sub><br /></td>
  </tr>
</table>

