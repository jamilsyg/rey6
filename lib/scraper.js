const cheerio = require('cheerio')
const axios = require('axios')
const qs = require('qs')
const fetch = require("node-fetch");
const cookie = require("cookie");
const FormData = require("form-data");
const exec = require('child_process').exec;
const os = require("os");
const author = "X-Zons"

async function post(url, formdata = {}, cookies) {
let encode = encodeURIComponent;
let body = Object.keys(formdata)
.map((key) => {
let vals = formdata[key];
let isArray = Array.isArray(vals);
let keys = encode(key + (isArray ? "[]" : ""));
if (!isArray) vals = [vals];
let out = [];
for (let valq of vals) out.push(keys + "=" + encode(valq));
return out.join("&");
})
.join("&");
return await fetch(`${url}?${body}`, {
method: "GET",
headers: {
Accept: "*/*",
"Accept-Language": "en-US,en;q=0.9",
"User-Agent": "GoogleBot",
Cookie: cookies,
},
});
}

// Downloader
async function aiovideodl(link) {
return new Promise((resolve, reject) => {
axios({
url: 'https://aiovideodl.ml/',
method: 'GET',
headers: {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
"cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
}
}).then((src) => {
let a = cheerio.load(src.data)
let token = a('#token').attr('value')
axios({
url: 'https://aiovideodl.ml/wp-json/aio-dl/video-data/',
method: 'POST',
headers: {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
"cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"   
},
data: new URLSearchParams(Object.entries({ 'url': link, 'token': token }))
}).then(({ data }) => {
resolve(data)
})
})
})
}

// MediaFire
async function mediafire(url) {
let query = await axios.get(url) 
let cher = cheerio.load(query.data)
let hasil = []
let link = cher('a#downloadButton').attr('href')
let size = cher('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace(' ', '')
let seplit = link.split('/')
let name = seplit[5]
let mime = name.split('.')
mime = mime[1]
hasil.push({ author, name, mime, size, link })
return hasil
}

// StyleText
async function styletext(teks) {
return new Promise((resolve, reject) => {
axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
.then(({ data }) => {
let $ = cheerio.load(data)
let hasil = []
$('table > tbody > tr').each(function (a, b) {
hasil.push({ author, name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
})
resolve(hasil)
})
})
}

// TikTok Downloader
async function ttdownloader(url){
return new Promise(async(resolve, reject) => {
axios.get('https://ttdownloader.com/',{
headers: {
"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
}
})
.then(({ data }) => {
const $ = cheerio.load(data)
let token = $('#token').attr('value')
let config = {
'url': url,
'format': '',
'token': token
}
axios('https://ttdownloader.com/req/',{
method: 'POST',
data : new URLSearchParams(Object.entries(config)),
headers: {
"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
}
})
.then(({ data }) => {
const $ = cheerio.load(data)
resolve({
author,
nowm: $('div:nth-child(2) > div.download > a').attr('href'),
wm: $('div:nth-child(3) > div.download > a').attr('href'),
audio: $('div:nth-child(4) > div.download > a').attr('href')
})
})
})
.catch(reject)
})
}

// PlayStore
async function playstore(name){
return new Promise((resolve, reject) => {
axios.get('https://play.google.com/store/search?q='+ name +'&c=apps')
.then(({ data }) => {
const $ = cheerio.load(data)
let ln = [];
let nm = [];
let dv = [];
let lm = [];
const result = [];
$('div.wXUyZd > a').each(function(a,b){
const link =  'https://play.google.com' + $(b).attr('href')
ln.push(link);
})
$('div.b8cIId.ReQCgd.Q9MA7b > a > div').each(function(d,e){
const name = $(e).text().trim()
nm.push(name);
})
$('div.b8cIId.ReQCgd.KoLSrc > a > div').each(function(f,g){
const dev = $(g).text().trim();
dv.push(dev)
})
$('div.b8cIId.ReQCgd.KoLSrc > a').each(function(h,i){
const limk = 'https://play.google.com' + $(i).attr('href');
lm.push(limk);
})
for (let i = 0; i < ln.length; i++){
result.push({
author,
name: nm[i],
link: ln[i],
developer: dv[i],
link_dev: lm[i]
})
}
resolve(result)
})
.catch(reject)
})
}

// Search Group Whatsapp
async function linkwa(nama){
return new Promise((resolve,reject) => {
axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search='+ nama +'&searchby=name')
.then(({ data }) => {
const $ = cheerio.load(data);
const result = [];
const lnk = [];
const nm = [];
$('div.wa-chat-title-container').each(function(a,b){
const limk = $(b).find('a').attr('href');
lnk.push(limk)
})
$('div.wa-chat-title-text').each(function(c,d) {
const name = $(d).text();
nm.push(name)
})
for( let i = 0; i < lnk.length; i++){
result.push({
author,
nama: nm[i].split('. ')[1],
link: lnk[i].split('?')[0]
})
}
resolve(result)
})
.catch(reject)
})
}

// Instagram Downloader
async function igdl(url){
return new Promise(async(resolve, reject) => {
axios.request({
url: 'https://www.instagramsave.com/download-instagram-videos.php',
method: 'GET',
headers:{
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
}
})
.then(({ data }) => {
const $ = cheerio.load(data)
const token = $('#token').attr('value')
let config ={
headers: {
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
},
data: {
'url': url,
'action': 'post',
'token': token
}
}
axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
.then(({ data }) => {
resolve(data)
   })
})
.catch(reject)
})
}

// Instagram Story
async function igstory(username){
return new Promise(async(resolve, reject) => {
axios.request({
url: 'https://www.instagramsave.com/instagram-story-downloader.php',
method: 'GET',
headers:{
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
}
})
.then(({ data }) => {
const $ = cheerio.load(data)
const token = $('#token').attr('value')
let config ={
headers: {
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
},
data: {
'url':'https://www.instagram.com/'+ username,
'action': 'story',
'token': token
}
}
axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
.then(({ data }) => {
resolve(data)
   })
})
.catch(reject)
})
}

// Instagram Stalk
async function igstalk(username){
return new Promise((resolve,reject) => {
axios.get('https://www.instagram.com/'+ username +'/?__a=1',{
method: 'GET',
headers: {
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
"cookie": "mid=XBXl1AALAAEbFoAEfNjZlMMG9dwX; ig_did=91E66A48-5AA2-445D-BFE6-84DC4456DE8F; fbm_124024574287414=base_domain=.instagram.com; ig_nrcb=1; shbid=\"12737\0544008624962\0541656157971:01f72a5102dc07af6845adf923ca70eb86e81ab95fa9dbfdaf157c9eef0e82fd1f10fe23\"; shbts=\"1624621971\0544008624962\0541656157971:01f74841fba8e77a0066b47ea891dec8fba6fdf9216c0816f9fb3532292f769828800ae2\"; fbsr_124024574287414=86D8femzH4_KFW4hd3Z6XFdowU6lG-uXsXRQDNl44VM.eyJ1c2VyX2lkIjoiMTAwMDA0Njc2MDc4Nzg5IiwiY29kZSI6IkFRQngzXzVOejdwVnBwby1LRGRUdEYxUFlzcUdDQXJjcmJfb05HaWFvYkNvOGtLN2paam50bHpvMTNOakFnTzVKOHQ5M0V3U3dvNkRtZ0RiY1l1Z3dQSTIybnExOUxLd3lpZTVfZll0bkNXZXBuM1hoYWFLX0w2R0pZaUpzaDBOTDBhb3pmTVBkRTVQRC12X3FnbUgxLXZYdGVmcHhfaFU0aUZNZVMxNHhFUk5OblJyMmxYTUpDa2RFYTdISXNCR2swdHhaaGF0NUt4UDR3cWZTamRwcVFfQ19sa1RUek5fU0taUTYtMjlzTkdnLUVWb3oxMUZWc3Q2OEx2ZnlIY0V0eFp0ZUxacXpiWmh6MzZrVl83VmFGd0FqVnVkTGFQN2VzT3ZRcmlTQ2pLUE5XbVcyNWhudzIzejJBSnVURW00YWR1cmN6a3ZLWU1icTd2SnN0SVdJV09RIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJBZmJuQ3haQzZMd3h4MDFJV2MyZ3dsQ3k3Qmp0b05UNUY0WDY2NHBrUzRQeERNVXRsdmhWWkI3SXE0MGsyZ2hJQm55RHRPcW5iVjlPbUNiWGhyTFBaQUhBQjFzVFpBdHF6RFEzVTROUkhOU1V6MFVXWkNtTEdLcDNNWDRoazVIOURLbERHN0QwUlhZNHY4dHBCdVNNYjN4dnBTRGtQcHdYRlBXVU82VCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjI0NjIxOTgxfQ; fbsr_124024574287414=86D8femzH4_KFW4hd3Z6XFdowU6lG-uXsXRQDNl44VM.eyJ1c2VyX2lkIjoiMTAwMDA0Njc2MDc4Nzg5IiwiY29kZSI6IkFRQngzXzVOejdwVnBwby1LRGRUdEYxUFlzcUdDQXJjcmJfb05HaWFvYkNvOGtLN2paam50bHpvMTNOakFnTzVKOHQ5M0V3U3dvNkRtZ0RiY1l1Z3dQSTIybnExOUxLd3lpZTVfZll0bkNXZXBuM1hoYWFLX0w2R0pZaUpzaDBOTDBhb3pmTVBkRTVQRC12X3FnbUgxLXZYdGVmcHhfaFU0aUZNZVMxNHhFUk5OblJyMmxYTUpDa2RFYTdISXNCR2swdHhaaGF0NUt4UDR3cWZTamRwcVFfQ19sa1RUek5fU0taUTYtMjlzTkdnLUVWb3oxMUZWc3Q2OEx2ZnlIY0V0eFp0ZUxacXpiWmh6MzZrVl83VmFGd0FqVnVkTGFQN2VzT3ZRcmlTQ2pLUE5XbVcyNWhudzIzejJBSnVURW00YWR1cmN6a3ZLWU1icTd2SnN0SVdJV09RIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJBZmJuQ3haQzZMd3h4MDFJV2MyZ3dsQ3k3Qmp0b05UNUY0WDY2NHBrUzRQeERNVXRsdmhWWkI3SXE0MGsyZ2hJQm55RHRPcW5iVjlPbUNiWGhyTFBaQUhBQjFzVFpBdHF6RFEzVTROUkhOU1V6MFVXWkNtTEdLcDNNWDRoazVIOURLbERHN0QwUlhZNHY4dHBCdVNNYjN4dnBTRGtQcHdYRlBXVU82VCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjI0NjIxOTgxfQ; csrftoken=PpiPMEl0R2pAwThsw4NXynO6cVIXHZDo; ds_user_id=38316792800; sessionid=38316792800:rQj5Tr3g5zkg7b:4; rur=\"RVA\05438316792800\0541656158332:01f759cf624bef147397144805bb4c26f6c8b36a232e0f5738c570ee492f6b629f84f6e5\""
}
})
.then(({ data }) => {
const user = data.graphql.user
let result = {
author,
id: user.id,
biography: user.biography,
followers: user.edge_followed_by.count,
following: user.edge_follow.count,
fullName: user.full_name,
highlightCount: user.highlight_reel_count,
isBusinessAccount: user.is_business_account,
isRecentUser: user.is_joined_recently,
accountCategory: user.business_category_name,
linkedFacebookPage: user.connected_fb_page,
isPrivate: user.is_private,
isVerified: user.is_verified,
profilePicHD: user.profile_pic_url_hd,
username: user.username,
postsCount: user.edge_owner_to_timeline_media.count
}
resolve(result)
})
.catch(reject)
})
}

/**
 * TextPro Scraper
 * @function
 * @param {String} url - Your phootoxy url, example https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html.
 * @param {String[]} text - Text (required). example ["text", "text 2 if any"]
 */
async function textpro(url, text) {
if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url))
throw new Error("Enter a Valid URL");
const geturl = await fetch(url, {
method: "GET",
headers: {
"User-Agent": "GoogleBot",
},
});
const load_token = await geturl.text();
let cookies = geturl.headers.get("set-cookie").split(",").map((v) => cookie.parse(v)).reduce((a, c) => {
return { ...a, ...c };
}, {});
cookies = {
__cfduid: cookies.__cfduid,
PHPSESSID: cookies.PHPSESSID
};
cookies = Object.entries(cookies)
.map(([name, value]) => cookie.serialize(name, value))
.join("; ");
const $ = cheerio.load(load_token);
const token = $('input[name="token"]').attr("value");
const form = new FormData();
if (typeof text === "string") text = [text];
for (let texts of text) form.append("text[]", texts);
form.append("submit", "Go");
form.append("token", token);
form.append("build_server", "https://textpro.me");
form.append("build_server_id", 1);
const geturl2 = await fetch(url, {
method: "POST",
headers: {
Accept: "*/*",
"Accept-Language": "en-US,en;q=0.9",
"User-Agent": "GoogleBot",
Cookie: cookies,
...form.getHeaders(),
},
body: form.getBuffer(),
});
const atoken = await geturl2.text();
const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(atoken);
if (!token2) {
var status_err = new Object();
status_err.status = false
status_err.error = "Error! This token is not acceptable!"
return status_err;
}
const prosesimage = await post(
"https://textpro.me/effect/create-image",
JSON.parse(token2[1]),
cookies
);
const image_ret = await prosesimage.json();
return `https://textpro.me${image_ret.fullsize_image}`;
}

/**
 * Photooxy Scraper
 * @function
 * @param {String} url - Your phootoxy url, example https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html.
 * @param {String[]} text - Text (required). example ["text", "text 2 if any"]
 */
async function photooxy(url, text) {
if (!/^https:\/\/photooxy\.com\/.+\.html$/.test(url)) {
throw new Error("Enter a Valid URL");
}
let num = 0;
const form = new FormData();
if (typeof text === "string") text = [text];
for (let texts of text) {
num += 1;
form.append(`text_${num}`, texts);
}
form.append("login", "OK");
var procc = await fetch(url, {
method: "POST",
headers: {
Accept: "/",
"Accept-Language": "en-US,en;q=0.9",
"User-Agent": "GoogleBot",
...form.getHeaders(),
},
body: form.getBuffer(),
});
let html = await procc.text();
let $ = cheerio.load(html);
const img = $('a[class="btn btn-primary"]').attr("href");
return img;
}

// List Top Server Minecraft Indonesia
async function servermc(paged) {
if (paged) {
bebed = `/` + paged + `/`
} else if (!paged) {
bebed = `/`
}
return new Promise((resolve, reject) => {
axios.get(`https://minecraftpocket-servers.com/country/indonesia` + bebed).then( xzons => {
const $ = cheerio.load(xzons.data)

hasil = []

$("tr").each(function(c, d) {
ip = $(d).find("button.btn.btn-secondary.btn-sm").eq(1).text().trim().replace(':19132', '')
port = '19132'
versi = $(d).find("a.btn.btn-info.btn-sm").text()
player = $(d).find("td.d-none.d-md-table-cell > strong").eq(1).text().trim()
const Data = {
author,
ip: ip,
port: port,
versi: versi,
player: player
}
hasil.push(Data)
})
resolve(hasil)
}).catch(reject)
})
}

// Mcpedl Search
async function mcpedl(query) {
return new Promise((resolve, reject) => {
axios.get(`https://mcpedl.com/?s=${query}`).then(async xzons => {
const $ = cheerio.load(xzons.data)

hasil = []

$("div.post").each(function(c, d) {
  
name = $(d).find("h2.post__title").text().trim();
date = $(d).find("div.post__date").text().trim();
desc = $(d).find("p.post__text").text().trim();
category = $(d).find("div.post__category > a").text().trim();
link = $(d).find("a").attr('href')
link2 = `https://mcpedl.com${link}`
const Data = {
author,
name: name,
category: category,
date: date,
desc: desc,
link: link2
}
hasil.push(Data)

})
 resolve(hasil)
}).catch(reject)
});
}

module.exports = { aiovideodl, styletext, mediafire, ttdownloader, playstore, linkwa, igdl, igstory, igstalk, textpro, photooxy, servermc, mcpedl }